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
  defaultLayout: () => [265, 440, 655]
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

const documentList = computed(() => {
  let documents: MDocument[] = []
  documents.push(
    {
      indexUid: selectedIndex.value,
      id: '1',
      doc: {
        id: '1',
        log_level: 'DEBUG',
        profiles: ['dev', 'test'],
        metadata: 'MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDVMocYuY0pUVoXKLeYXUmcMVmeXhBeqcrp0v0dusspAq5xZlGbff+D1/d5u4avkKbaybs0nS1jj1p5T005tmEEocjIze7MN86kTv4XVj4iysEKoZUA9760ka51bwxV4HuBrEKGYHbQSMwgTAbCO75swp2gJPn3VSbSpDbO/Srgw0y/QxuiBXF7wX3ZFsw9tSbQgm3UkcZqKdHEFoSeTy5hWf4Iz78Gn83Zwn0814Fv37YW1qHDe3akQhXv7K10xxxYenw0'
      }
    },
    {
      indexUid: selectedIndex.value,
      id: '2',
      doc: {
        id: '2',
        log_level: 'DEBUG',
        profiles: ['dev', 'test'],
        metadata: 'MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCMN1A1k9Dqid5oDSwfX+Rj3JMJR5T+VURZAf0QpV/PNoD1+wD3JM3XEiifSPMVFXtwouBKQmCwx3+FyXlYHhLY+IppH/RyGiMwVCBgpsOCnUBvOjF2lSwMpLY0mitrmTwR9f/FEzzhAeKkLChl7Ezhfx2CEMPl8nzmV1pH0JLm8Re+VIpq9ojPD7jM6qmAjxV17mBrn4FedlqIdnHfvnQ0gBEksjE1yx3+k6XiO/0fULGqOQzDzu7VsUX1ktqLnpP83rhTdxoPHaAoIzy441kb2ynxjFV2bhBtmo+257ggO6Z7XyhpRwAoUd8+IOyEYsd973z8u9Jr/1Ep+fZN8ngdAgMBAAECggEAHxFOc2CaJK2Bmvp4MUd0+m9wINk8eRH5f+NB6ENMNER2VIpWD2yXMzUxzQFD4wMMg8uC+NE2TVUWu1UFzvFy6aJAQMS0y+dgrp+lQOUSYslm8n4pYYXx6adBO+yA/GlKdwxTrJ3zmkNprUifdt3htwEMT7pZPYT6CauHNGxRcFvdDHs0v7PZk1gPmtOK1uOWt8Wa6g8rWX4e3BUFoFe4y1ippZA/wrCrRH+AiLOYQDnEB5AvvzCU0wyhPcWRGdnbgbnHkbD/o6EjZHeuQ5uDmftPA8wUsaSkB9bBkBZkUqtUbIXneqyVCazkYvnKFNXlGP7o2dtfPuB7XTJjxLnB4QKBgQDEboXJLaysR1EPUsrndroKHFBfyXCWGTrzg0jdI2iaPW1+EHqqb5axug8IxMybDHFn34zZI4Fk5G6NRp15Nc3aWxk94cG2xYAdUxfsFS3HlPlcb3VZ7W//Oa1YFR+54o5uv5qa40ntjv7zeo4LaGcK/PK0LvukPawtwnRoAqEiOQKBgQC2vKGDXGly6FySVNEwRNlDxrQmnRq+VqRPaRrdC8k3pdhBfCnAgytYKrrcDJi1M10EsgFG3wF3eRtL4kOfb+Pq4Px6QnN7f+ae7FTn5Y9TeryfNfsee2BgNd6haZ0uXmdC+9iCcRirCbJL1IfFiwztKeEXRwDhHg6yHzoVfm81BQKBgA1AO2wv1ZcllHVJK4DjxHcMI+viReMKPqzQrWili9fjzvATIoM+1daVa5A23mqTM09DiFfZilAJDOAg5FyZ4ZIaVSCUiyHOPu87fMCjSRxOk2fF6Q+w8b4w4N2xRxueCee0qzRJouIQpGg+WzivyUu3dpPrG3Sf6G6J0Jp3mvEZAoGAF+G9JgLM0TSm7ITjNfC5iE8OukEr/pYqMSqmVR82M+ybv6svdbZu0r3638lRp9THolZ1LkL02R1dwOQYPF0OJ2Mx+/R1TT2g8UInsorg2WMgBZqzb/9l0A0aRHQeE7JIwotRd3K6a5f/0kM7X0jV7qTbgwRHjCQ2fXbxS1/TvtUCgYABPnJiHVhqRfvAoZm+q46Ghm2Z3HSVJH+ErPLV2fFZG9rMw9GzRYVkkyXlvBqdSRhhZmXBxiKWwj8vD63w+piQOgrxtv+Bz4LZLVtn3BeyC8JZHNbsJB+F7RtLF8iQqgTKkSqHDLP/The4wiGoQyRNd4rcR3JmP0RcY8If3W7sIA=='
      }
    },
    {
      indexUid: selectedIndex.value,
      id: '2',
      doc: {
        id: '2',
        log_level: 'DEBUG',
        profiles: ['dev', 'test'],
        metadata: 'MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCMN1A1k9Dqid5oDSwfX+Rj3JMJR5T+VURZAf0QpV/PNoD1+wD3JM3XEiifSPMVFXtwouBKQmCwx3+FyXlYHhLY+IppH/RyGiMwVCBgpsOCnUBvOjF2lSwMpLY0mitrmTwR9f/FEzzhAeKkLChl7Ezhfx2CEMPl8nzmV1pH0JLm8Re+VIpq9ojPD7jM6qmAjxV17mBrn4FedlqIdnHfvnQ0gBEksjE1yx3+k6XiO/0fULGqOQzDzu7VsUX1ktqLnpP83rhTdxoPHaAoIzy441kb2ynxjFV2bhBtmo+257ggO6Z7XyhpRwAoUd8+IOyEYsd973z8u9Jr/1Ep+fZN8ngdAgMBAAECggEAHxFOc2CaJK2Bmvp4MUd0+m9wINk8eRH5f+NB6ENMNER2VIpWD2yXMzUxzQFD4wMMg8uC+NE2TVUWu1UFzvFy6aJAQMS0y+dgrp+lQOUSYslm8n4pYYXx6adBO+yA/GlKdwxTrJ3zmkNprUifdt3htwEMT7pZPYT6CauHNGxRcFvdDHs0v7PZk1gPmtOK1uOWt8Wa6g8rWX4e3BUFoFe4y1ippZA/wrCrRH+AiLOYQDnEB5AvvzCU0wyhPcWRGdnbgbnHkbD/o6EjZHeuQ5uDmftPA8wUsaSkB9bBkBZkUqtUbIXneqyVCazkYvnKFNXlGP7o2dtfPuB7XTJjxLnB4QKBgQDEboXJLaysR1EPUsrndroKHFBfyXCWGTrzg0jdI2iaPW1+EHqqb5axug8IxMybDHFn34zZI4Fk5G6NRp15Nc3aWxk94cG2xYAdUxfsFS3HlPlcb3VZ7W//Oa1YFR+54o5uv5qa40ntjv7zeo4LaGcK/PK0LvukPawtwnRoAqEiOQKBgQC2vKGDXGly6FySVNEwRNlDxrQmnRq+VqRPaRrdC8k3pdhBfCnAgytYKrrcDJi1M10EsgFG3wF3eRtL4kOfb+Pq4Px6QnN7f+ae7FTn5Y9TeryfNfsee2BgNd6haZ0uXmdC+9iCcRirCbJL1IfFiwztKeEXRwDhHg6yHzoVfm81BQKBgA1AO2wv1ZcllHVJK4DjxHcMI+viReMKPqzQrWili9fjzvATIoM+1daVa5A23mqTM09DiFfZilAJDOAg5FyZ4ZIaVSCUiyHOPu87fMCjSRxOk2fF6Q+w8b4w4N2xRxueCee0qzRJouIQpGg+WzivyUu3dpPrG3Sf6G6J0Jp3mvEZAoGAF+G9JgLM0TSm7ITjNfC5iE8OukEr/pYqMSqmVR82M+ybv6svdbZu0r3638lRp9THolZ1LkL02R1dwOQYPF0OJ2Mx+/R1TT2g8UInsorg2WMgBZqzb/9l0A0aRHQeE7JIwotRd3K6a5f/0kM7X0jV7qTbgwRHjCQ2fXbxS1/TvtUCgYABPnJiHVhqRfvAoZm+q46Ghm2Z3HSVJH+ErPLV2fFZG9rMw9GzRYVkkyXlvBqdSRhhZmXBxiKWwj8vD63w+piQOgrxtv+Bz4LZLVtn3BeyC8JZHNbsJB+F7RtLF8iQqgTKkSqHDLP/The4wiGoQyRNd4rcR3JmP0RcY8If3W7sIA=='
      }
    },
    {
      indexUid: selectedIndex.value,
      id: '2',
      doc: {
        id: '2',
        log_level: 'DEBUG',
        profiles: ['dev', 'test'],
        metadata: 'MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCMN1A1k9Dqid5oDSwfX+Rj3JMJR5T+VURZAf0QpV/PNoD1+wD3JM3XEiifSPMVFXtwouBKQmCwx3+FyXlYHhLY+IppH/RyGiMwVCBgpsOCnUBvOjF2lSwMpLY0mitrmTwR9f/FEzzhAeKkLChl7Ezhfx2CEMPl8nzmV1pH0JLm8Re+VIpq9ojPD7jM6qmAjxV17mBrn4FedlqIdnHfvnQ0gBEksjE1yx3+k6XiO/0fULGqOQzDzu7VsUX1ktqLnpP83rhTdxoPHaAoIzy441kb2ynxjFV2bhBtmo+257ggO6Z7XyhpRwAoUd8+IOyEYsd973z8u9Jr/1Ep+fZN8ngdAgMBAAECggEAHxFOc2CaJK2Bmvp4MUd0+m9wINk8eRH5f+NB6ENMNER2VIpWD2yXMzUxzQFD4wMMg8uC+NE2TVUWu1UFzvFy6aJAQMS0y+dgrp+lQOUSYslm8n4pYYXx6adBO+yA/GlKdwxTrJ3zmkNprUifdt3htwEMT7pZPYT6CauHNGxRcFvdDHs0v7PZk1gPmtOK1uOWt8Wa6g8rWX4e3BUFoFe4y1ippZA/wrCrRH+AiLOYQDnEB5AvvzCU0wyhPcWRGdnbgbnHkbD/o6EjZHeuQ5uDmftPA8wUsaSkB9bBkBZkUqtUbIXneqyVCazkYvnKFNXlGP7o2dtfPuB7XTJjxLnB4QKBgQDEboXJLaysR1EPUsrndroKHFBfyXCWGTrzg0jdI2iaPW1+EHqqb5axug8IxMybDHFn34zZI4Fk5G6NRp15Nc3aWxk94cG2xYAdUxfsFS3HlPlcb3VZ7W//Oa1YFR+54o5uv5qa40ntjv7zeo4LaGcK/PK0LvukPawtwnRoAqEiOQKBgQC2vKGDXGly6FySVNEwRNlDxrQmnRq+VqRPaRrdC8k3pdhBfCnAgytYKrrcDJi1M10EsgFG3wF3eRtL4kOfb+Pq4Px6QnN7f+ae7FTn5Y9TeryfNfsee2BgNd6haZ0uXmdC+9iCcRirCbJL1IfFiwztKeEXRwDhHg6yHzoVfm81BQKBgA1AO2wv1ZcllHVJK4DjxHcMI+viReMKPqzQrWili9fjzvATIoM+1daVa5A23mqTM09DiFfZilAJDOAg5FyZ4ZIaVSCUiyHOPu87fMCjSRxOk2fF6Q+w8b4w4N2xRxueCee0qzRJouIQpGg+WzivyUu3dpPrG3Sf6G6J0Jp3mvEZAoGAF+G9JgLM0TSm7ITjNfC5iE8OukEr/pYqMSqmVR82M+ybv6svdbZu0r3638lRp9THolZ1LkL02R1dwOQYPF0OJ2Mx+/R1TT2g8UInsorg2WMgBZqzb/9l0A0aRHQeE7JIwotRd3K6a5f/0kM7X0jV7qTbgwRHjCQ2fXbxS1/TvtUCgYABPnJiHVhqRfvAoZm+q46Ghm2Z3HSVJH+ErPLV2fFZG9rMw9GzRYVkkyXlvBqdSRhhZmXBxiKWwj8vD63w+piQOgrxtv+Bz4LZLVtn3BeyC8JZHNbsJB+F7RtLF8iQqgTKkSqHDLP/The4wiGoQyRNd4rcR3JmP0RcY8If3W7sIA=='
      }
    },
    {
      indexUid: selectedIndex.value,
      id: '2',
      doc: {
        id: '2',
        log_level: 'DEBUG',
        profiles: ['dev', 'test'],
        metadata: 'MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCMN1A1k9Dqid5oDSwfX+Rj3JMJR5T+VURZAf0QpV/PNoD1+wD3JM3XEiifSPMVFXtwouBKQmCwx3+FyXlYHhLY+IppH/RyGiMwVCBgpsOCnUBvOjF2lSwMpLY0mitrmTwR9f/FEzzhAeKkLChl7Ezhfx2CEMPl8nzmV1pH0JLm8Re+VIpq9ojPD7jM6qmAjxV17mBrn4FedlqIdnHfvnQ0gBEksjE1yx3+k6XiO/0fULGqOQzDzu7VsUX1ktqLnpP83rhTdxoPHaAoIzy441kb2ynxjFV2bhBtmo+257ggO6Z7XyhpRwAoUd8+IOyEYsd973z8u9Jr/1Ep+fZN8ngdAgMBAAECggEAHxFOc2CaJK2Bmvp4MUd0+m9wINk8eRH5f+NB6ENMNER2VIpWD2yXMzUxzQFD4wMMg8uC+NE2TVUWu1UFzvFy6aJAQMS0y+dgrp+lQOUSYslm8n4pYYXx6adBO+yA/GlKdwxTrJ3zmkNprUifdt3htwEMT7pZPYT6CauHNGxRcFvdDHs0v7PZk1gPmtOK1uOWt8Wa6g8rWX4e3BUFoFe4y1ippZA/wrCrRH+AiLOYQDnEB5AvvzCU0wyhPcWRGdnbgbnHkbD/o6EjZHeuQ5uDmftPA8wUsaSkB9bBkBZkUqtUbIXneqyVCazkYvnKFNXlGP7o2dtfPuB7XTJjxLnB4QKBgQDEboXJLaysR1EPUsrndroKHFBfyXCWGTrzg0jdI2iaPW1+EHqqb5axug8IxMybDHFn34zZI4Fk5G6NRp15Nc3aWxk94cG2xYAdUxfsFS3HlPlcb3VZ7W//Oa1YFR+54o5uv5qa40ntjv7zeo4LaGcK/PK0LvukPawtwnRoAqEiOQKBgQC2vKGDXGly6FySVNEwRNlDxrQmnRq+VqRPaRrdC8k3pdhBfCnAgytYKrrcDJi1M10EsgFG3wF3eRtL4kOfb+Pq4Px6QnN7f+ae7FTn5Y9TeryfNfsee2BgNd6haZ0uXmdC+9iCcRirCbJL1IfFiwztKeEXRwDhHg6yHzoVfm81BQKBgA1AO2wv1ZcllHVJK4DjxHcMI+viReMKPqzQrWili9fjzvATIoM+1daVa5A23mqTM09DiFfZilAJDOAg5FyZ4ZIaVSCUiyHOPu87fMCjSRxOk2fF6Q+w8b4w4N2xRxueCee0qzRJouIQpGg+WzivyUu3dpPrG3Sf6G6J0Jp3mvEZAoGAF+G9JgLM0TSm7ITjNfC5iE8OukEr/pYqMSqmVR82M+ybv6svdbZu0r3638lRp9THolZ1LkL02R1dwOQYPF0OJ2Mx+/R1TT2g8UInsorg2WMgBZqzb/9l0A0aRHQeE7JIwotRd3K6a5f/0kM7X0jV7qTbgwRHjCQ2fXbxS1/TvtUCgYABPnJiHVhqRfvAoZm+q46Ghm2Z3HSVJH+ErPLV2fFZG9rMw9GzRYVkkyXlvBqdSRhhZmXBxiKWwj8vD63w+piQOgrxtv+Bz4LZLVtn3BeyC8JZHNbsJB+F7RtLF8iQqgTKkSqHDLP/The4wiGoQyRNd4rcR3JmP0RcY8If3W7sIA=='
      }
    },
    {
      indexUid: selectedIndex.value,
      id: '2',
      doc: {
        id: '2',
        log_level: 'DEBUG',
        profiles: ['dev', 'test'],
        metadata: 'MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCMN1A1k9Dqid5oDSwfX+Rj3JMJR5T+VURZAf0QpV/PNoD1+wD3JM3XEiifSPMVFXtwouBKQmCwx3+FyXlYHhLY+IppH/RyGiMwVCBgpsOCnUBvOjF2lSwMpLY0mitrmTwR9f/FEzzhAeKkLChl7Ezhfx2CEMPl8nzmV1pH0JLm8Re+VIpq9ojPD7jM6qmAjxV17mBrn4FedlqIdnHfvnQ0gBEksjE1yx3+k6XiO/0fULGqOQzDzu7VsUX1ktqLnpP83rhTdxoPHaAoIzy441kb2ynxjFV2bhBtmo+257ggO6Z7XyhpRwAoUd8+IOyEYsd973z8u9Jr/1Ep+fZN8ngdAgMBAAECggEAHxFOc2CaJK2Bmvp4MUd0+m9wINk8eRH5f+NB6ENMNER2VIpWD2yXMzUxzQFD4wMMg8uC+NE2TVUWu1UFzvFy6aJAQMS0y+dgrp+lQOUSYslm8n4pYYXx6adBO+yA/GlKdwxTrJ3zmkNprUifdt3htwEMT7pZPYT6CauHNGxRcFvdDHs0v7PZk1gPmtOK1uOWt8Wa6g8rWX4e3BUFoFe4y1ippZA/wrCrRH+AiLOYQDnEB5AvvzCU0wyhPcWRGdnbgbnHkbD/o6EjZHeuQ5uDmftPA8wUsaSkB9bBkBZkUqtUbIXneqyVCazkYvnKFNXlGP7o2dtfPuB7XTJjxLnB4QKBgQDEboXJLaysR1EPUsrndroKHFBfyXCWGTrzg0jdI2iaPW1+EHqqb5axug8IxMybDHFn34zZI4Fk5G6NRp15Nc3aWxk94cG2xYAdUxfsFS3HlPlcb3VZ7W//Oa1YFR+54o5uv5qa40ntjv7zeo4LaGcK/PK0LvukPawtwnRoAqEiOQKBgQC2vKGDXGly6FySVNEwRNlDxrQmnRq+VqRPaRrdC8k3pdhBfCnAgytYKrrcDJi1M10EsgFG3wF3eRtL4kOfb+Pq4Px6QnN7f+ae7FTn5Y9TeryfNfsee2BgNd6haZ0uXmdC+9iCcRirCbJL1IfFiwztKeEXRwDhHg6yHzoVfm81BQKBgA1AO2wv1ZcllHVJK4DjxHcMI+viReMKPqzQrWili9fjzvATIoM+1daVa5A23mqTM09DiFfZilAJDOAg5FyZ4ZIaVSCUiyHOPu87fMCjSRxOk2fF6Q+w8b4w4N2xRxueCee0qzRJouIQpGg+WzivyUu3dpPrG3Sf6G6J0Jp3mvEZAoGAF+G9JgLM0TSm7ITjNfC5iE8OukEr/pYqMSqmVR82M+ybv6svdbZu0r3638lRp9THolZ1LkL02R1dwOQYPF0OJ2Mx+/R1TT2g8UInsorg2WMgBZqzb/9l0A0aRHQeE7JIwotRd3K6a5f/0kM7X0jV7qTbgwRHjCQ2fXbxS1/TvtUCgYABPnJiHVhqRfvAoZm+q46Ghm2Z3HSVJH+ErPLV2fFZG9rMw9GzRYVkkyXlvBqdSRhhZmXBxiKWwj8vD63w+piQOgrxtv+Bz4LZLVtn3BeyC8JZHNbsJB+F7RtLF8iQqgTKkSqHDLP/The4wiGoQyRNd4rcR3JmP0RcY8If3W7sIA=='
      }
    },
    {
      indexUid: selectedIndex.value,
      id: '2',
      doc: {
        id: '2',
        log_level: 'DEBUG',
        profiles: ['dev', 'test'],
        metadata: 'MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCMN1A1k9Dqid5oDSwfX+Rj3JMJR5T+VURZAf0QpV/PNoD1+wD3JM3XEiifSPMVFXtwouBKQmCwx3+FyXlYHhLY+IppH/RyGiMwVCBgpsOCnUBvOjF2lSwMpLY0mitrmTwR9f/FEzzhAeKkLChl7Ezhfx2CEMPl8nzmV1pH0JLm8Re+VIpq9ojPD7jM6qmAjxV17mBrn4FedlqIdnHfvnQ0gBEksjE1yx3+k6XiO/0fULGqOQzDzu7VsUX1ktqLnpP83rhTdxoPHaAoIzy441kb2ynxjFV2bhBtmo+257ggO6Z7XyhpRwAoUd8+IOyEYsd973z8u9Jr/1Ep+fZN8ngdAgMBAAECggEAHxFOc2CaJK2Bmvp4MUd0+m9wINk8eRH5f+NB6ENMNER2VIpWD2yXMzUxzQFD4wMMg8uC+NE2TVUWu1UFzvFy6aJAQMS0y+dgrp+lQOUSYslm8n4pYYXx6adBO+yA/GlKdwxTrJ3zmkNprUifdt3htwEMT7pZPYT6CauHNGxRcFvdDHs0v7PZk1gPmtOK1uOWt8Wa6g8rWX4e3BUFoFe4y1ippZA/wrCrRH+AiLOYQDnEB5AvvzCU0wyhPcWRGdnbgbnHkbD/o6EjZHeuQ5uDmftPA8wUsaSkB9bBkBZkUqtUbIXneqyVCazkYvnKFNXlGP7o2dtfPuB7XTJjxLnB4QKBgQDEboXJLaysR1EPUsrndroKHFBfyXCWGTrzg0jdI2iaPW1+EHqqb5axug8IxMybDHFn34zZI4Fk5G6NRp15Nc3aWxk94cG2xYAdUxfsFS3HlPlcb3VZ7W//Oa1YFR+54o5uv5qa40ntjv7zeo4LaGcK/PK0LvukPawtwnRoAqEiOQKBgQC2vKGDXGly6FySVNEwRNlDxrQmnRq+VqRPaRrdC8k3pdhBfCnAgytYKrrcDJi1M10EsgFG3wF3eRtL4kOfb+Pq4Px6QnN7f+ae7FTn5Y9TeryfNfsee2BgNd6haZ0uXmdC+9iCcRirCbJL1IfFiwztKeEXRwDhHg6yHzoVfm81BQKBgA1AO2wv1ZcllHVJK4DjxHcMI+viReMKPqzQrWili9fjzvATIoM+1daVa5A23mqTM09DiFfZilAJDOAg5FyZ4ZIaVSCUiyHOPu87fMCjSRxOk2fF6Q+w8b4w4N2xRxueCee0qzRJouIQpGg+WzivyUu3dpPrG3Sf6G6J0Jp3mvEZAoGAF+G9JgLM0TSm7ITjNfC5iE8OukEr/pYqMSqmVR82M+ybv6svdbZu0r3638lRp9THolZ1LkL02R1dwOQYPF0OJ2Mx+/R1TT2g8UInsorg2WMgBZqzb/9l0A0aRHQeE7JIwotRd3K6a5f/0kM7X0jV7qTbgwRHjCQ2fXbxS1/TvtUCgYABPnJiHVhqRfvAoZm+q46Ghm2Z3HSVJH+ErPLV2fFZG9rMw9GzRYVkkyXlvBqdSRhhZmXBxiKWwj8vD63w+piQOgrxtv+Bz4LZLVtn3BeyC8JZHNbsJB+F7RtLF8iQqgTKkSqHDLP/The4wiGoQyRNd4rcR3JmP0RcY8If3W7sIA=='
      }
    },
  )
  return documents
})

const selectedDocument = ref<MDocument | undefined>(undefined)

const selectedDocumentData = computed(() => selectedDocument.value)

const msClient = inject<Meilisearch>('msClient')

const results = ref<Array<Hit>>([])
const mergeResults = ref<Array<MDocument>>([])

const search = (query?: SearchParams | string) => {
  results.value.length = 0
  mergeResults.value.length = 0
  let queries: MultiSearchQuery[] = indexes.map(value => {
    if (typeof query == 'string') {
      return {
        indexUid: value,
        q: query,
        attributesToHighlight: ['*'],
        facets: [],
        highlightPreTag: '<ais-highlight style="background-color: #ff5895">',
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
  })
  indexes.forEach(value => {
    msClient?.index('').fetchPrimaryKey().then(pk => indexInfo[value] = pk)
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