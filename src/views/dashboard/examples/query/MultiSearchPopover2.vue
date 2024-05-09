<script setup lang="ts">
import type { SearchParams } from 'meilisearch/src/types/types'
import MonacoEditor from '@/views/dashboard/examples/query/MonacoEditor.vue'
import * as monaco from 'monaco-editor'
import { type CancellationToken, editor } from 'monaco-editor'
import { computed, onMounted, ref, watch } from 'vue'
import { getQuery, updateQueries } from '@/stores/app'
import { useMagicKeys } from '@vueuse/core'
import toAST from '@/lib/parser'
import { allSuggestions } from '@/views/dashboard/examples/query/suggestions'
import { ContentContext } from '@/lib/MsDslParser'
import type { Filter } from 'meilisearch'
import { parse2SearchParam } from '@/views/dashboard/examples/query/dsl/MsDslTransformer'
import ITextModel = editor.ITextModel
import type { MsDslError } from '@/lib/MsDslErrorListener'

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
    updateQueries('q', o => searchStr.value)
    try {
      let searchParams = parse2SearchParam(searchStr.value)
      emits('performSearch', searchParams.sp)
    } catch (e) {
      emits('performSearch', searchStr.value)
    }
  })
  editor.addCommand(monaco.KeyMod.Alt | monaco.KeyCode.Slash, args => {
    editor.trigger('keyboard', 'editor.action.triggerSuggest', {})
  }, 'editorTextFocus && !editorReadonly')
  editor.addCommand(monaco.KeyMod.Alt | monaco.KeyMod.CtrlCmd | monaco.KeyCode.DownArrow, args => {
  })
  editor.addCommand(monaco.KeyMod.Alt | monaco.KeyMod.CtrlCmd | monaco.KeyCode.UpArrow, args => {
  })
  editor.addCommand(monaco.KeyMod.Alt | monaco.KeyCode.DownArrow, args => {
  })
  editor.addCommand(monaco.KeyMod.Alt | monaco.KeyCode.UpArrow, args => {
  })
  editor.addCommand(monaco.KeyMod.Shift | monaco.KeyCode.Enter, args => {
  })
  editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.Enter, args => {
  })
  editor.addCommand(monaco.KeyMod.Alt | monaco.KeyMod.Shift | monaco.KeyCode.DownArrow, args => {
  })
  editor.addCommand(monaco.KeyMod.Alt | monaco.KeyMod.Shift | monaco.KeyCode.UpArrow, args => {
  })

  editor.onDidChangeModelContent(e => {
    let { sp, le, pe } = parse2SearchParam(searchStr.value)

    let errors: MsDslError[] = []
    if (le.length > 0) {
      le.forEach((error) => errors.push(error))
    }
    if (pe.length > 0) {
      pe.forEach((error) => errors.push(error))
    }
    if (errors.length > 0) {
      console.log(errors)
      let markers: editor.IMarkerData[] = errors.map(e => ({
        message: e.message,
        startColumn: e.startColumn,
        endColumn: e.endColumn,
        startLineNumber: e.line,
        endLineNumber: e.line,
        severity: monaco.MarkerSeverity.Error
      }))
      monaco.editor.setModelMarkers(editor.getModel() as ITextModel, 'msDSL', markers)
    } else {
      monaco.editor.setModelMarkers(editor.getModel() as ITextModel, 'msDSL', [])
    }
  })
}

const updateSearchStr = (str: string) => {
  searchStr.value = str
}

const options: editor.IEditorOptions = {
  fontSize: 13,
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
})

const configDSL = () => {
  let msDSL = 'msDSL'
  if (monaco.languages.getLanguages().findIndex(value => value.id === msDSL) != -1) {
    return
  }
  monaco.languages.register({ id: msDSL })

  monaco.languages.setMonarchTokensProvider(msDSL, {
    ignoreCase: false,
    tokenizer: {
      filter: [

      ],
      sort: [

      ],
      on: [

      ],
      query: [

      ],
    },
  })

  monaco.languages.registerCompletionItemProvider(msDSL, {
    provideCompletionItems(model: monaco.editor.ITextModel, position: monaco.Position, context: monaco.languages.CompletionContext, token: CancellationToken): monaco.languages.ProviderResult<monaco.languages.CompletionList> {
      let contentBeforeCursor = model.getValueInRange({
        startColumn: 1,
        endColumn: position.column,
        startLineNumber: 1,
        endLineNumber: 1
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