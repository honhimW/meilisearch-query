<script setup lang="ts">
import type { SearchParams } from 'meilisearch/src/types/types'
import MonacoEditor from '@/views/dashboard/examples/query/MonacoEditor.vue'
import * as monaco from 'monaco-editor'
import { type CancellationToken, editor, languages } from 'monaco-editor'
import { onMounted, ref, watch } from 'vue'
import type { Options } from '@/views/dashboard/examples/query/monacoEditorType'
import { getQuery, updateQueries } from '@/stores/app'
import { useMagicKeys } from '@vueuse/core'
import CompletionItemKind = languages.CompletionItemKind
import IEditorOptions = editor.IEditorOptions
import { undefined } from 'zod'
import { allSuggestions, atSortAsc, atSortDesc, parseInput } from '@/views/dashboard/examples/query/suggestions'

const props = defineProps<{
  q: string
  dsl?: string
}>()
const emits = defineEmits<{
  (e: 'performSearch', payload?: SearchParams | string): void
}>()

const searchStr = ref<string>('')
const editorRef = ref<monaco.editor.IStandaloneCodeEditor>()

const keys = useMagicKeys({
  passive: false,
  onEventFired(e) {
    // e.preventDefault()
    if (e.ctrlKey && e.key === 'k') {
      e.preventDefault()
    }
    return false
  }
})
const ctrlK = keys['ctrl+k']

watch(ctrlK, (value, oldValue, onCleanup) => {
  if (value) {
    editorRef.value?.focus()
    // nav to search
  }
})

const customizeEditor = (editor: monaco.editor.IStandaloneCodeEditor) => {
  editorRef.value = editor
  editor.addCommand(monaco.KeyCode.Enter, () => {
    console.log(searchStr.value)
    updateQueries('q', o => searchStr.value)
    emits('performSearch', searchStr.value)
  })
  editor.addCommand(monaco.KeyMod.Alt | monaco.KeyCode.Slash, args => {
    editor.trigger('keyboard', 'editor.action.triggerSuggest', {})
  }, 'editorTextFocus && !editorReadonly')
}

const updateSearchStr = (str: string) => {
  searchStr.value = str
}

const options: IEditorOptions = {
  fontSize: 16,
  lineHeight: 36,
  fontFamily: 'sans-serif',
  wordWrap: 'off',
  lineNumbers: 'off',
  scrollbar: {
    vertical: 'hidden',
    horizontal: 'hidden'
  },
  cursorStyle: 'line',
  contextmenu: false,
  minimap: {
    enabled: false
  },
  readOnly: false,
  automaticLayout: true,
  foldingStrategy: 'indentation',
  renderLineHighlight: 'line',
  selectOnLineNumbers: false,
  scrollBeyondLastLine: false,
  overviewRulerBorder: false
}

onMounted(() => {
  let _q = getQuery('q')
  if (_q) {
    searchStr.value = _q
  }
  emits('performSearch', searchStr.value)
  configDSL()
  window.parseInput = parseInput
})

const configDSL = () => {
  let msDSL = 'msDSL'
  if (monaco.languages.getLanguages().findIndex(value => value.id === msDSL) != -1) {
    return
  }
  monaco.languages.register({ id: msDSL })

  let suggestionBase = {
    kind: monaco.languages.CompletionItemKind.Snippet,
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
  }

  monaco.languages.registerCompletionItemProvider(msDSL, {
    provideCompletionItems(model: monaco.editor.ITextModel, position: monaco.Position, context: monaco.languages.CompletionContext, token: CancellationToken): monaco.languages.ProviderResult<monaco.languages.CompletionList> {
      let contentBeforeCursor = model.getValueInRange({
        startColumn: 1,
        endColumn: position.column,
        startLineNumber: 1,
        endLineNumber: 1,
      })

      if (contentBeforeCursor == '') {
        return {
          suggestions: allSuggestions(position)
        }
      }

      let currentContent = contentBeforeCursor
      if (contentBeforeCursor.lastIndexOf(' ') != -1 || contentBeforeCursor.lastIndexOf('\t') != -1) {
        let breakTokenIndex = Math.max(contentBeforeCursor.lastIndexOf(' '), contentBeforeCursor.lastIndexOf('\t'))
        currentContent = contentBeforeCursor.substring(breakTokenIndex + 1, contentBeforeCursor.length)
      }
      return {
        suggestions: allSuggestions(position, currentContent)
      }
    }
  })
}

</script>

<template>

  <MonacoEditor
    :theme="'vs'"
    :model-value="searchStr"
    style="height: 40px"
    :options="options"
    language="msDSL"
    @editor-mounted="customizeEditor"
    @update:model-value="updateSearchStr"
  />
</template>