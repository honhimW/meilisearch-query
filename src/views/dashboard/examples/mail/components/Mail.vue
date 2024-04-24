<script lang="ts" setup>
import { computed, inject, onMounted, ref } from 'vue'
import { refDebounced } from '@vueuse/core'
import IndexSwitcher from './IndexSwitcher.vue'
import MailList from './MailList.vue'
import MailDisplay from './MailDisplay.vue'
import Screen, { type Attribute, type ScreenProps } from './Screen.vue'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import type { MDocument } from '@/views/dashboard/examples/mail/components/MailList.vue'
import MultiSearchPopover from '@/views/dashboard/examples/mail/components/MultiSearchPopover.vue'
import type { MultiSearchQuery, SearchParams } from 'meilisearch/src/types/types'
import { type Hit, Meilisearch, type MultiSearchResult, type Settings } from 'meilisearch'
import { RotateCw } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

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
  mails: Mail[]
  defaultLayout?: number[]
  defaultCollapsed?: boolean
  screenCollapsedSize: number
}

interface IndexHolder {
  uid: string
  primaryKey: string
  count: string
  settings: Settings
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
  msClient?.getIndexes({
    offset: 0,
    limit: 2 << 16
  }).then(value => {
    indexes.value.length = 0
    value.results.forEach(index => {
      let primaryKey = index.primaryKey
      let item = {
        uid: index.uid,
        primaryKey,
        count: 0,
      }
      indexes.value.push(item)
      index.getStats().then(stats => item.count = stats.numberOfDocuments)
      index.getSettings().then(settings => item.settings = settings)
    })
  })
}

const indexes = ref<IndexHolder[]>([
  {
    uid: 'logback_133',
    primaryKey: 'id',
    count: '100',
    settings: undefined
  }
])

const isCollapsed = ref(props.defaultCollapsed)

const spreadDocument = ref(false)
const selectedIndex = ref<string | undefined>(indexes.value[0].uid)

const searchValue = ref('')
const debouncedSearch = refDebounced(searchValue, 250)

const documentList = ref([])

const selectedDocument = ref<MDocument | undefined>(undefined)

const selectedDocumentData = computed(() => selectedDocument.value)

const msClient = inject<Meilisearch>('msClient')

const results = ref<Array<Hit>>([])
const mergeResults = ref<Array<MDocument>>([])

const search = (query?: SearchParams | string) => {
  results.value.length = 0
  mergeResults.value.length = 0
  indexes.value.length = 1
  let queries: MultiSearchQuery[] = indexes.value.map(value => {
    if (typeof query == 'string') {
      return {
        indexUid: value.uid,
        q: query,
        attributesToHighlight: ['*'],
        facets: [],
        highlightPreTag: '<ais-highlight style="background-color: #ff5895; font-weight: bold">',
        highlightPostTag: '</ais-highlight>',
        limit: 20,
        offset: 0,
      }
    } else {
      return {
        indexUid: value,
        ...query as SearchParams,
      }
    }
  });
  msClient?.multiSearch({
    queries
  }).then(value => {
    let results = value.results
    renderList(results, mergeResults.value)
    console.log(mergeResults)
    documentList.value = mergeResults.value
  })

}

interface IndexInfo {
  pk: string
  setting: Settings
}

const indexInfo: Record<string, string> = {};

const renderList = (results: Array<MultiSearchResult<Record<string, any>>>, mergeResults: Array<MDocument>) => {
  results.forEach(value => {
    let indexUid = value.indexUid
    let _hits = value.hits
    _hits.forEach(hit => {
      mergeResults.push({
        indexUid,
        id: indexInfo[indexUid],
        doc: hit._formatted,
        hit
      })
    })
  })
}

const screenAttributes = ref<ScreenProps>({
  selected: [],
  unselected: [
    {
      title: 'id',
      label: '1',
      icon: '',
      variant: 'default'
    },
    {
      title: 'timestamp',
      label: '0',
      icon: '',
      variant: 'ghost'
    },
    {
      title: 'log_level',
      label: '1',
      icon: '',
      variant: 'ghost'
    },
    {
      title: 'class_name',
      label: '1',
      icon: '',
      variant: 'ghost'
    }
  ]
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
  event.target.classList.add('rotate-animation');
  setTimeout(() => {
    event.target.classList.remove('rotate-animation');
  }, 1000);
}

</script>

<template>
  <TooltipProvider :delay-duration="0">
    <ResizablePanelGroup
      id="resize-panel-group-1"
      direction="horizontal"
      class="h-full max-h-[800px] items-stretch"
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
            <RotateCw class="size-4"/>
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
                <MultiSearchPopover q="http" @performSearch="search"/>
              </div>
            </form>
          </div>

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
        <MailDisplay :doc="selectedDocumentData" @close-display="spreadDocument = false"/>
      </ResizablePanel>
    </ResizablePanelGroup>
  </TooltipProvider>
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