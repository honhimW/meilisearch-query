<script setup lang="ts">
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { computed, ref, onMounted, onUnmounted, inject } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'
import type { Meilisearch } from 'meilisearch'
import type { ColumnDef } from '@tanstack/vue-table'
import type { SearchParams } from 'meilisearch/src/types/types'

const props = defineProps<{
  q: string
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

const SEARCH_FILTER: Record<string, { name: string, ops: IOperator[] }> = {
  symbol: {
    name: 'Symbol',
    ops: [
      {
        property: '',
        value: '=',
        title: 'Equal',
        icon: 'Search',
        description: '='
      },
      {
        property: '',
        value: 'IN',
        title: 'In',
        icon: 'Search',
        description: 'IN'
      }
    ]
  },
  filterableAttributes: {
    name: 'Filterable',
    ops: [
      {
        property: 'id',
        value: '',
        title: 'id',
        icon: 'Search',
        description: 'id'
      }
    ]
  },
  sortableAttributes: {
    name: 'Sortable',
    ops: [
      {
        property: 'id',
        value: '',
        title: 'id',
        icon: 'Search',
        description: 'id'
      }
    ]
  }
}


const msClient = inject<Meilisearch>('msClient')

// const search = ref<string>('');
const search = ref<string>(props.q)
const cursor = ref<string>('hello')
const isFocused = ref<boolean>(false)
const activeIndex = ref<number>(-1)
const handleFocus = (e: FocusEvent & { isFocused: boolean }) => {
  activeIndex.value = -1
  isFocused.value = e.isFocused
}

const handleInput = (e: InputEvent) => {
  e.data
  let target = e.target
}

const mappedMenu = Object.entries(SEARCH_FILTER).flatMap(([key, value]) => {
  return value.ops.map((r) => ({
    ...r,
    section: value.name,
    key: `${key}-${r.value}`,
    description: `${value.name}: ${r.description || r.title}`
  }))
})

const searchList = computed(() => {
  let q = search.value.toLowerCase()
  q.split(/\s+/)
  return mappedMenu.filter((item) =>
    item.title.toLowerCase().includes(q) ||
    item.description.toLowerCase().includes(q) ||
    item.section.toLowerCase().includes(q)
  )
})

const onKeyDown = (e: KeyboardEvent) => {
  if (['ArrowDown', 'ArrowUp', 'Enter'].includes(e.key)) {
    e.preventDefault()
    if (e.key === 'ArrowDown' && activeIndex.value < searchList.value.length - 1) {
      activeIndex.value++
    }
    if (e.key === 'ArrowUp' && activeIndex.value > 0) {
      activeIndex.value--
    }
    if (e.key === 'Enter') {
      const current = searchList.value[activeIndex.value]
      isFocused.value = false
      // todo: apply search
      emits('performSearch', search.value)
    }
  }
}


const handleClick = (value: string) => {
  search.value = search.value.concat(value)
}

const handleGlobalSearchTrigger = (e: KeyboardEvent) => {
  const input = document.getElementById('globalSearchInput')?.children[1] as HTMLInputElement
  if ((e.shiftKey && e.metaKey && e.key === 'g') || (e.shiftKey && e.ctrlKey && e.key === 'g')) {
    e.preventDefault()
    input.focus()
  }
  if (e.key === 'Escape') {
    input.blur()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleGlobalSearchTrigger)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleGlobalSearchTrigger)
})
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
    <PopoverContent class="mt-2 w-[500px] h-96 custom_scroll">
      <div class="py-4">
        <h4 class="font-semibold mb-2 text-lg">Searchable attributes</h4>
        <ul>
          <li
            v-for="(menu, i) in searchList"
            :key="menu.key" class="flex items-center mb-2 rounded-lg border p-2"
            :class="[
              'cursor-pointer',
              i === activeIndex ? 'border-2 border-primary' : '',
            ]"
            @click="handleClick(menu.value)"
          >
            <div class="rounded-md bg-violet-100 dark:bg-muted w-12 h-12 flex items-center justify-center mr-4">
              <span class="text-violet-500 dark:text-foreground flex items-center"><Icon :name="menu.icon" /></span>
            </div>
            <div>
              <p class="font-medium">{{ menu.title }}</p>
              <p class="text-sm text-slate-500">{{ menu.description }}</p>
            </div>
          </li>
        </ul>
      </div>
      <Separator />
      <div class="py-4">
        <h4 class="font-semibold mb-2 text-lg">Filterable attributes</h4>
        <p class="text-muted">Or your custom search result here</p>
      </div>
      <Separator />
      <div class="py-4">
        <h4 class="font-semibold mb-2 text-lg">Sortable attributes</h4>
        <p class="text-muted">Or your custom search result here</p>
      </div>
    </PopoverContent>
  </Popover>
</template>
