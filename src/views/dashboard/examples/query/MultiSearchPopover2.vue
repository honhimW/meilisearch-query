<script setup lang="ts">
import type { SearchParams } from 'meilisearch/src/types/types'
import MonacoEditor from '@/views/dashboard/examples/query/MonacoEditor.vue'
import { Input } from '@/components/ui/input'
import { Popover, PopoverTrigger } from '@/components/ui/popover'

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
</script>

<template>
  <Popover :open="isFocused">
    <PopoverTrigger class="w-full">
      <Input
        id="globalSearchInput"
        v-model="search"
        placeholder="Search..."
        prepend-icon="Search"
        class="w-full global-search__input"
        @focus="handleFocus"
        @blur="handleFocus"
        @input="handleInput"
        @keydown="onKeyDown"
        ref="cursor"
      ></Input>
    </PopoverTrigger>
  </Popover>
</template>
