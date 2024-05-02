<script setup lang="ts">
import type { SearchParams } from 'meilisearch/src/types/types'
import MonacoEditor from '@/views/dashboard/examples/query/MonacoEditor.vue'
import * as monaco from 'monaco-editor'
import { onMounted, ref } from 'vue'
import type { Options } from '@/views/dashboard/examples/query/monacoEditorType'
import { getQuery, updateQueries } from '@/stores/app'
import type { Position } from 'shiki'
import type { CancellationToken } from 'monaco-editor'

const props = defineProps<{
  q: string
  dsl?: string
}>()
const emits = defineEmits<{
  (e: 'performSearch', payload?: SearchParams | string): void
}>()

const searchStr = ref<string>('')

const blockEnter = (editor: monaco.editor.IStandaloneCodeEditor) => {
  editor.addCommand(monaco.KeyCode.Enter, () => {
    console.log(searchStr.value)
    updateQueries('q', o => searchStr.value)
    emits('performSearch', searchStr.value)
  })
}

const updateSearchStr = (str: string) => {
  searchStr.value = str
}

const options: Options = {
  fontSize: 16,
  lineHeight: 36,
  wordWrap: 'off',
  lineNumbers: 'off',
  scrollbar: {
    vertical: 'hidden',
    horizontal: 'hidden'
  },
  cursorStyle: 'line',
  contextmenu: false,
  minimap: {
    enabled: false,
  },
  readOnly: false,
  automaticLayout: true,
  foldingStrategy: 'indentation',
  renderLineHighlight: 'line',
  selectOnLineNumbers: false,
  scrollBeyondLastLine: false,
  overviewRulerBorder: false,
}

onMounted(() => {
  let _q = getQuery('q')
  if (_q) {
    searchStr.value = _q
  }
  emits('performSearch', searchStr.value)

  monaco.languages.registerCompletionItemProvider('msDSL', {
    provideCompletionItems(model: monaco.editor.ITextModel, position: Position, context: monaco.languages.CompletionContext, token: CancellationToken): monaco.languages.ProviderResult<monaco.languages.CompletionList> {
    }
  })

  monaco.languages.registerInlineCompletionsProvider('msDSL', {
    freeInlineCompletions(completions: monaco.languages.InlineCompletions): void {
    },
    handleItemDidShow(completions: monaco.languages.InlineCompletions, item: monaco.languages.InlineCompletions["items"][number], updatedInsertText: string): void {
    },
    handlePartialAccept(completions: monaco.languages.InlineCompletions, item: monaco.languages.InlineCompletions["items"][number], acceptedCharacters: number): void {
    },
    provideInlineCompletions(model: editor.ITextModel, position: Position, context: monaco.languages.InlineCompletionContext, token: CancellationToken): monaco.languages.ProviderResult<monaco.languages.InlineCompletions> {
      // 这里可以返回你的自定义代码片段
      return {
        suggestions: [
          {
            label: 'mySnippet',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: '这是我的自定义代码片段',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: '这是我的自定义代码片段'
          }
        ]
      }
    }
  })

})

</script>

<template>

  <MonacoEditor
    :theme="'vs'"
    :model-value="searchStr"
    style="height: 40px"
    :options="options"
    language=""
    @editor-mounted="blockEnter"
    @update:model-value="updateSearchStr"
  />
</template>