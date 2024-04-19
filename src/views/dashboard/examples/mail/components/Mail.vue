<script lang="ts" setup>
import { Search } from 'lucide-vue-next'

import { computed, ref } from 'vue'
import { refDebounced } from '@vueuse/core'
import IndexSwitcher from './IndexSwitcher.vue'
import MailList from './MailList.vue'
import MailDisplay from './MailDisplay.vue'
import Screen, { type Attribute, type ScreenProps } from './Screen.vue'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import type { MDocument } from '@/views/dashboard/examples/mail/components/MailList.vue'

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
  indexes: {
    uid: string
    count: string
  }[]
  mails: Mail[]
  defaultLayout?: number[]
  defaultCollapsed?: boolean
  screenCollapsedSize: number
}

const props = withDefaults(defineProps<MailProps>(), {
  defaultCollapsed: false,
  defaultLayout: () => [265, 440, 655]
})

const isCollapsed = ref(props.defaultCollapsed)

const spreadDocument = ref(true)
const selectedIndex = ref<string | undefined>(props.indexes[0].uid)

const searchValue = ref('')
const debouncedSearch = refDebounced(searchValue, 250)

const filteredMailList = computed(() => {
  let output: Mail[] = []
  const searchValue = debouncedSearch.value?.trim()
  if (!searchValue) {
    output = props.mails
  } else {
    output = props.mails.filter((item) => {
      return item.name.includes(debouncedSearch.value)
        || item.email.includes(debouncedSearch.value)
        || item.name.includes(debouncedSearch.value)
        || item.indexUid.includes(debouncedSearch.value)
        || item.document.includes(debouncedSearch.value)
    })
  }

  return output
})

const documentList = computed(() => {
  let documents: MDocument[] = []
  documents.push(
    {
      indexUid: selectedIndex.value,
      id: '1',
      doc: {
        id: '1',
        log_level: 'DEBUG',
        profiles: ['dev', 'test']
      }
    }
  )
  return documents
})

const unreadMailList = computed(() => filteredMailList.value.filter(item => !item.read))

const selectedDocument = ref<MDocument | undefined>(undefined)

const selectedDocumentData = computed(() => selectedDocument.value)

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
        :max-size="15"
        :class="cn(isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out')"
        @expand="onExpand"
        @collapse="onCollapse"
      >
        <div :class="cn('flex h-[52px] items-center justify-center', isCollapsed ? 'h-[52px]' : 'px-2')">
          <IndexSwitcher
            :is-collapsed="isCollapsed"
            :indexes="indexes"
            @update:index="payload => {selectedIndex = payload}" />
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
                <Search class="absolute left-2 top-2.5 size-4 text-muted-foreground" />
                <Input v-model="searchValue" placeholder="Search" class="pl-8" />
              </div>
            </form>
          </div>
          <TabsContent value="all" class="m-0">
            <MailList v-model:selected-document="selectedDocument" :items="filteredMailList"
                      :documents="documentList" />
          </TabsContent>
          <TabsContent value="unread" class="m-0">
            <MailList v-model:selected-document="selectedDocument" :items="unreadMailList" :documents="documentList" />
          </TabsContent>
        </Tabs>
      </ResizablePanel>
      <ResizableHandle id="resiz-handle-2" with-handle />
      <ResizablePanel v-if="spreadDocument" id="resize-panel-3" :default-size="defaultLayout[2]">
        <MailDisplay :doc="selectedDocumentData" />
      </ResizablePanel>
    </ResizablePanelGroup>
  </TooltipProvider>
</template>
