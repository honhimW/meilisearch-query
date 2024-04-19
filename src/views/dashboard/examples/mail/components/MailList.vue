<script lang="ts" setup>
import { formatDistanceToNow } from 'date-fns'
import type { Mail } from '../data/mails'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

export interface MDocument {
  indexUid?: string
  id?: string
  doc: Record<string, any>
}

interface IndexSettings {
  uid: string
  idField: string
  selectedFields: string[]
}

interface MailListProps {
  items: Mail[]
}

defineProps<{
  documents: MDocument[]
  indexSettings: IndexSettings
}>()
const selectedDocument = defineModel<MDocument>('selectedDocument', { required: false })

function getBadgeVariantFromLabel(label: string) {
  if (['work'].includes(label.toLowerCase()))
    return 'default'

  if (['personal'].includes(label.toLowerCase()))
    return 'outline'

  return 'secondary'
}
</script>

<template>
  <ScrollArea class="h-screen flex">
    <div class="flex-1 flex flex-col gap-2 p-4 pt-0">
      <TransitionGroup name="list" appear>
        <button
          v-for="item of documents"
          :key="item.id"
          :class="cn(
            'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent',
            selectedDocument === item && 'bg-muted',
          )"
          @click="selectedDocument = item"
        >
          <div class="flex w-full flex-col gap-1">
            <div class="flex items-center">
              <div class="flex items-center gap-2">
                <div class="font-semibold">
                  {{ item.indexUid }}
                </div>
              </div>
            </div>

            <div class="text-xs font-medium">
              {{ item.id }}
            </div>
          </div>
          <div class="line-clamp-2 text-xs text-muted-foreground">
            {{ JSON.stringify(item.doc).substring(0, 300) }}
          </div>
<!--          <div class="flex items-center gap-2">-->
<!--            <Badge v-for="label of item.labels" :key="label" :variant="getBadgeVariantFromLabel(label)">-->
<!--              {{ label }}-->
<!--            </Badge>-->
<!--          </div>-->
        </button>
      </TransitionGroup>
    </div>
  </ScrollArea>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(15px);
}

.list-leave-active {
  position: absolute;
}
</style>
