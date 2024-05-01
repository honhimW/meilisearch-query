<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { refDebounced } from '@vueuse/core'
import IndexSwitcher from './IndexSwitcher.vue'
import MailList from './DocumentList.vue'
import MailDisplay from './DocumentDisplay.vue'
import Screen, { type Attribute, type ScreenProps } from './Screen.vue'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import type { MDocument } from '@/views/dashboard/examples/query/DocumentList.vue'
import MultiSearchPopover from '@/views/dashboard/examples/query/MultiSearchPopover.vue'
import MultiSearchPopover2 from '@/views/dashboard/examples/query/MultiSearchPopover2.vue'
import type { MultiSearchQuery, SearchParams } from 'meilisearch/src/types/types'
import { type Hit, type MultiSearchResult, type Settings } from 'meilisearch'
import { RotateCw } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import MonacoEditor from '@/views/dashboard/examples/query/MonacoEditor.vue'

interface Mail {
  id: string
  name: string
  email: string
  indexUid: string
  document: string
  doc: Record<string, any>
  date: string
  read: boolean
  labels: string[]
}

interface MailProps {
  defaultLayout?: number[]
  defaultCollapsed?: boolean
  screenCollapsedSize: number
}

interface IndexHolder {
  uid: string
  primaryKey: string | undefined
  count: string
  settings: Settings | undefined
}

const props = withDefaults(defineProps<MailProps>(), {
  defaultCollapsed: false,
  defaultLayout: () => [15, 85, 85]
})

onMounted(() => {
  refreshIndexes()
  console.log(indexes)
})

const refreshIndexes = () => {
  window.msClient?.getIndexes({
    offset: 0,
    limit: 2 << 16
  }).then(value => {
    indexes.value.length = 0
    value.results.forEach(index => {
      let primaryKey = index.primaryKey
      let item: IndexHolder = {
        uid: index.uid,
        primaryKey: primaryKey,
        count: '0',
        settings: undefined
      }
      indexes.value.push(item)
      index.getStats().then(stats => item.count = stats.numberOfDocuments.toString())
      index.getSettings().then(settings => item.settings = settings)
    })
  })
}

const indexes = ref<IndexHolder[]>([])

const isCollapsed = ref(props.defaultCollapsed)

const spreadDocument = ref(false)
const selectedIndex = ref<string | undefined>(indexes?.value[0]?.uid)

const searchValue = ref('')
const debouncedSearch = refDebounced(searchValue, 250)

const documentList = ref<MDocument[]>([])

const selectedDocument = ref<MDocument | undefined>(undefined)

const selectedDocumentData = computed(() => selectedDocument.value)

const results = ref<Array<Hit>>([])
const mergeResults = ref<Array<MDocument>>([])

const search = (query?: SearchParams | string, page = 0) => {
  let offset = 20 * page
  let limit = 20 * (page + 1)

  results.value.length = 0
  mergeResults.value.length = 0
  let queries: MultiSearchQuery[] = indexes.value
    .filter(value => value.uid === selectedIndex.value)
    .map(value => {
      if (typeof query == 'string') {
        return {
          indexUid: value.uid,
          q: query,
          attributesToHighlight: ['*'],
          facets: [],
          highlightPreTag: '<ais-highlight style="background-color: #ff5895; font-weight: bold">',
          highlightPostTag: '</ais-highlight>',
          limit: limit,
          offset: offset
        }
      } else {
        return {
          indexUid: value,
          ...query as SearchParams
        }
      }
    })
  window.msClient?.multiSearch({
    queries
  }).then(value => {
    let results = value.results
    renderList(results, mergeResults.value, page == 0)
    documentList.value = mergeResults.value
  })

}

interface IndexInfo {
  pk: string
  setting: Settings
}

const indexInfo: Record<string, string> = {}

const flattenObject = (obj: any, parentKey = '', result = {} as Record<string, any>) => {
  for (let key in obj) {
    let newKey = parentKey ? `${parentKey}.${key}` : `${key}`
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      flattenObject(obj[key], newKey, result)
    } else {
      result[newKey] = obj[key]
    }
  }
  return result
}

const renderList = (results: Array<MultiSearchResult<Record<string, any>>>, mergeResults: Array<MDocument>, reset = false) => {
  let selected = screenAttributes.value.selected.map(_a => _a.title)
  if (reset) {
    screenKeys.value = []
    screenAttributes.value.selected.length = 0
    screenAttributes.value.unselected.length = 0
  }
  results.forEach(value => {
    let indexUid = value.indexUid
    let _hits = value.hits
    _hits.forEach(hit => {
      let _doc: Record<string, any> = hit._formatted as Record<string, any>
      _doc = flattenObject(_doc)
      for (let key in _doc) {
        let attribute: Attribute = {
          title: key,
          label: '0',
          icon: '',
          variant: 'ghost'
        }
        if (!screenKeys.value.includes(key)) {
          let pk = indexes.value.filter(_idx => _idx.uid === indexUid).map(_idx => _idx.primaryKey).at(0)
          if (pk === key) {
            attribute.variant = 'default'
          }
          screenKeys.value.push(key)
          if (selected.includes(key)) {
            screenAttributes.value.selected.push(attribute)
          } else {
            screenAttributes.value.unselected.push(attribute)
          }
        } else {
          let a: Attribute | undefined = screenAttributes.value.selected.filter(_a => _a.title === key).at(0)
          if (!a) {
            a = screenAttributes.value.unselected.filter(_a => _a.title === key).at(0)
          }
          if (a) {
            a.label = (Number(a.label) + 1).toString()
          }
        }
      }
      mergeResults.push({
        indexUid,
        id: indexInfo[indexUid],
        doc: _doc,
        hit,
        attributes: screenAttributes.value
      })
    })
  })

}

const screenKeys = ref<string[]>([])

const screenAttributes = ref<ScreenProps>({
  selected: [],
  unselected: []
})

function updateAttributes(props: ScreenProps) {
  screenAttributes.value = props
}

function onCollapse() {
  isCollapsed.value = true
}

function onExpand() {
  isCollapsed.value = false
}

const rotate = (event) => {
  event.target.classList.add('rotate-animation')
  setTimeout(() => {
    event.target.classList.remove('rotate-animation')
  }, 1000)
  refreshIndexes()
}

</script>

<template>
    <ResizablePanelGroup
      id="resize-panel-group-1"
      direction="horizontal"
      :class="cn(
        'h-full',
        'items-stretch',
        'max-h-[800px]',
      )"
    >
      <ResizablePanel
        id="resize-panel-1"
        :default-size="defaultLayout[0]"
        :collapsed-size="screenCollapsedSize"
        collapsible
        :min-size="15"
        :max-size="30"
        :class="cn(isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out')"
        @expand="onExpand"
        @collapse="onCollapse"
      >
        <div :class="cn('flex h-[52px] items-center justify-center', isCollapsed ? 'h-[52px]' : 'px-2')">
          <IndexSwitcher
            :is-collapsed="isCollapsed"
            :indexes="indexes"
            @update:index="payload => {selectedIndex = payload}" />
          <Button variant="ghost" size="icon" @click="rotate">
            <RotateCw class="size-4" />
            <span class="sr-only">PanelRightClose</span>
          </Button>
        </div>
        <Separator />
        <Screen
          :selected="screenAttributes.selected"
          :unselected="screenAttributes.unselected"
          @updateFields="updateAttributes"
        />
      </ResizablePanel>
      <ResizableHandle id="resize-handle-1" with-handle />
      <ResizablePanel id="resize-panel-2" :default-size="defaultLayout[1]" :min-size="30">
        <Tabs default-value="all">
          <div class="flex items-center px-4 py-2">
            <h1 class="text-xl font-bold">
              Result
            </h1>
            <TabsList class="ml-auto">
              <TabsTrigger value="all" class="text-zinc-600 dark:text-zinc-200">
                Struct
              </TabsTrigger>
              <TabsTrigger value="unread" class="text-zinc-600 dark:text-zinc-200">
                Plain
              </TabsTrigger>
            </TabsList>
          </div>
          <Separator />
          <div class="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <form>
              <div class="relative">

                <!--                <Search class="absolute left-2 top-2.5 size-4 text-muted-foreground" />-->
                <!--                <Input v-model="searchValue" placeholder="Search" class="pl-8"/>-->
                <MultiSearchPopover q="http" @performSearch="search" />
<!--                <MultiSearchPopover2 q="http" @performSearch="search" />-->
              </div>
            </form>
          </div>
          <Separator />
          <TabsContent value="all" class="m-0">
            <MailList v-model:selected-document="selectedDocument"
                      :documents="documentList"
                      @click-document="spreadDocument = true"
            />
          </TabsContent>
        </Tabs>
      </ResizablePanel>
      <ResizableHandle id="resiz-handle-2" with-handle />
      <ResizablePanel v-if="spreadDocument" id="resize-panel-3" :default-size="defaultLayout[2]">
        <MailDisplay :doc="selectedDocumentData" @close-display="spreadDocument = false" />
      </ResizablePanel>
    </ResizablePanelGroup>
</template>

<style scoped>
.refreshRotate {

}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.rotate-animation {
  animation: rotate 1s linear;
}
</style>