<script setup lang="ts">
import type { SearchParams } from 'meilisearch/src/types/types'
import MonacoEditor from '@/views/dashboard/examples/query/MonacoEditor.vue'
import { Input } from '@/components/ui/input'
import { Popover, PopoverTrigger } from '@/components/ui/popover'
import * as monaco from 'monaco-editor'
import { ref } from 'vue'

const props = defineProps<{
  q: string
  dsl: string
}>()
const emits = defineEmits<{
  (e: 'performSearch', payload?: SearchParams | string): void
}>()

interface IOperator {
  property: string
  value: string
  title: string
  icon: string
  description: string
}

const searchStr = ref<string>(props.q)

const blockEnter = (editor: monaco.editor.IStandaloneCodeEditor) => {
  editor.addCommand(monaco.KeyCode.Enter, () => {
    console.log(searchStr.value)
    emits('performSearch', searchStr.value)
  })
}

</script>

<template>
  <MonacoEditor
    :theme="'vs'"
    :model-value="searchStr"
    class="w-4/5"
    style="height: 40px"
    :options="{
      fontSize: 16,
      lineHeight: 36,
      wordWrap: 'off',
      lineNumbers: 'off',
      readOnly: false,
      contextmenu: false,
      minimap: {
          enabled: false,
        },
      automaticLayout: false,
      cursorStyle: 'line',
      scrollbar: {
        vertical: 'hidden',
        horizontal: 'hidden'
      },
    }"
    @editor-mounted="blockEnter"
  />
</template>