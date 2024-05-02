<script setup lang="ts">
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { computed, onMounted, onUnmounted, onUpdated, ref, watchEffect } from 'vue'
import type { SearchParams } from 'meilisearch/src/types/types'
import { getQuery, updateQueries } from '@/stores/app'
import { Button } from '@/components/ui/button'

const props = defineProps<{
  q: string
  dsl?: string
}>()
const emits = defineEmits<{
  (e: 'performSearch', payload?: SearchParams | string): void
}>()

interface IOperator {
  property: string
  value: string
  title: string
  description: string
}

const SEARCH_FILTER: Record<string, {
  name: string,
  icon: string,
  ops: IOperator[]
}> = {
  symbol: {
    name: 'Symbol',
    icon: 'Search',
    ops: [
      {
        property: '',
        value: '=',
        title: 'Equal',
        description: '='
      },
      {
        property: '',
        value: 'IN',
        title: 'In',
        description: 'IN'
      }
    ]
  },
  filterableAttributes: {
    name: 'Filterable',
    icon: 'Filter',
    ops: [
      {
        property: 'id',
        value: '',
        title: 'id',
        description: 'string'
      },
      {
        property: 'deleted',
        value: '',
        title: 'deleted',
        description: 'boolean'
      },
    ]
  },
  sortableAttributes: {
    name: 'Sortable',
    icon: 'ArrowDownUp',
    ops: [
      {
        property: 'timestamp',
        value: '',
        title: 'timestamp',
        description: 'number'
      }
    ]
  }
}

const SORT_PATTERN = /@sort:[+-]?.*/i


const search = ref<string>(props.q)
const isFocused = ref<boolean>(false)
const activeIndex = ref<number>(-1)
const handleFocus = (e: FocusEvent & { isFocused: boolean }) => {
  activeIndex.value = -1
  isFocused.value = e.isFocused
  console.log(e)
}

const mappedCompletion = Object.entries(SEARCH_FILTER).flatMap(([key, value]) => {
  return value.ops.map((r) => ({
    ...r,
    section: value.name,
    key: `${key}-${r.value}`,
    icon: value.icon,
    description: `${r.description || r.title}`
  }))
})

const searchList = computed(() => {
  let q = search.value.toLowerCase()
  q.split(/\s+/)
  return mappedCompletion.filter((item) =>
    item.title.toLowerCase().includes(q) ||
    item.description.toLowerCase().includes(q) ||
    item.section.toLowerCase().includes(q)
  )
})

const insertText = (element: HTMLInputElement, text:string) => {
  let start = element.selectionStart;
  let end = element.selectionEnd;
  element.setRangeText(text, start as number, end as number, 'select');
  document.execCommand('insertText', false, text);
}

const onKeyDown = (e: KeyboardEvent) => {
  isFocused.value = true;
  if (['ArrowDown', 'ArrowUp', 'Enter', 'Tab'].includes(e.key)) {
    e.preventDefault()
    if (e.key === 'ArrowDown' && activeIndex.value < searchList.value.length - 1) {
      activeIndex.value++
    }
    if (e.key === 'ArrowUp' && activeIndex.value > 0) {
      activeIndex.value--
    }
    if (e.key === 'Tab') {
      if (activeIndex.value >= 0) {
        handleClick(searchList.value[activeIndex.value].value)
      } else {
        insertText(e.target as HTMLInputElement, '\t')
      }
      isFocused.value = false
    }
    if (e.key === 'Enter') {
      if (activeIndex.value >= 0) {
        handleClick(searchList.value[activeIndex.value].value)
      } else {
        emits('performSearch', search.value)
        updateQueries('q', o => search.value)
      }
      isFocused.value = false
    }
    if (e.key === 'Esc') {
      isFocused.value = false
    }
  }
}


const handleClick = (value: string) => {
  search.value = search.value.concat(value)
}

onMounted(() => {
  let _q = getQuery('q')
  if (_q) {
    search.value = _q
  }
  emits('performSearch', search.value)
})

onUnmounted(() => {
})

</script>

<template>
  <Popover :open="isFocused">
    <PopoverTrigger class="w-full">
      <Input
        v-model="search"
        placeholder="Search..."
        prepend-icon="Search"
        class="w-full global-search__input"
        @focus="handleFocus"
        @keydown="onKeyDown"
      ></Input>
    </PopoverTrigger>
    <PopoverContent class="mt-2 w-[500px] h-96 custom_scroll">
      <div class="py-4">
        <ul>
          <li
            v-for="(menu, i) in searchList"
            :key="menu.key" class="flex items-center mb-2 rounded-lg border p-2  justify-between"
            :class="[
              'cursor-pointer',
              i === activeIndex ? 'border-2 border-primary' : '',
            ]"
            @click="handleClick(menu.value)"
          >
            <div class="rounded-md w-4 h-4 flex items-center justify-center mr-2">
              <Icon :name="menu.icon"/>
            </div>
            <div class="border-x-[1px] border-gray-300 h-[18px] w-[1px] mx-1"></div>
            <div class="w-[450px] flex justify-between">
              <div class="text-sm">{{ menu.title }}</div>
              <div class="text-sm text-slate-500 items-end">{{ menu.description }}</div>
            </div>
          </li>
        </ul>
      </div>
    </PopoverContent>
  </Popover>
</template>
