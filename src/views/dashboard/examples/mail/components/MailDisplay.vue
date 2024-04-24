<script lang="ts" setup>
import { Archive, ArchiveX, Clock, Forward, PanelRightClose, MoreVertical, Reply, ReplyAll, Trash2 } from 'lucide-vue-next'
import { computed, onMounted, ref } from 'vue'
import addDays from 'date-fns/addDays'
import addHours from 'date-fns/addHours'
import format from 'date-fns/format'
import nextSaturday from 'date-fns/nextSaturday'
import type { Mail } from '../data/mails'
import { Calendar } from '@/components/ui/calendar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import type { MDocument } from '@/views/dashboard/examples/mail/components/MailList.vue'
import MonacoEditor from '@/views/dashboard/examples/mail/components/MonacoEditor.vue'
import { ThemeChangeEvent } from '@/stores/app'

interface MailDisplayProps {
  mail: Mail | undefined
  doc: MDocument | undefined
}

const props = defineProps<MailDisplayProps>()

const emits = defineEmits<{
  (e: 'close-display'): void
}>()

const mailFallbackName = computed(() => {
  return props.mail?.name
    .split(' ')
    .map(chunk => chunk[0])
    .join('')
})

onMounted(() => {
  window.addEventListener('themeChange', ev => {
    let theme = (ev as ThemeChangeEvent).theme
    monacoTheme.value = toMonacoTheme(theme)
    console.log(monacoTheme)
  })
  monacoTheme.value = toMonacoTheme(localStorage.getItem('themeMode') as string)
})

const toMonacoTheme = (themeMode: string) => {
  return themeMode === 'dark' ? 'shacdn-ui-dark' : 'shacdn-ui-light'
}

const monacoTheme = ref(toMonacoTheme(localStorage.getItem('themeMode') as string))

const today = new Date()
</script>

<template>
  <div class="flex h-full flex-col">
    <div class="flex items-center p-2">
      <div class="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="ghost" size="icon" :disabled="!doc">
              <Archive class="size-4" />
              <span class="sr-only">Archive</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Archive</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="ghost" size="icon" :disabled="!doc">
              <ArchiveX class="size-4" />
              <span class="sr-only">Move to junk</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Move to junk</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="ghost" size="icon" :disabled="!doc">
              <Trash2 class="size-4" />
              <span class="sr-only">Move to trash</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Move to trash</TooltipContent>
        </Tooltip>
        <Separator orientation="vertical" class="mx-1 h-6" />
        <Tooltip>
          <Popover>
            <PopoverTrigger as-child>
              <TooltipTrigger as-child>
                <Button variant="ghost" size="icon" :disabled="!doc">
                  <Clock class="size-4" />
                  <span class="sr-only">Snooze</span>
                </Button>
              </TooltipTrigger>
            </PopoverTrigger>
            <PopoverContent class="flex w-[535px] p-0">
              <div class="flex flex-col gap-2 border-r px-2 py-4">
                <div class="px-4 text-sm font-medium">
                  Snooze until
                </div>
                <div class="grid min-w-[250px] gap-1">
                  <Button
                    variant="ghost"
                    class="justify-start font-normal"
                  >
                    Later today
                    <span class="ml-auto text-muted-foreground">
                      {{ format(addHours(today, 4), 'E, h:m b') }}
                    </span>
                  </Button>
                  <Button
                    variant="ghost"
                    class="justify-start font-normal"
                  >
                    Tomorrow
                    <span class="ml-auto text-muted-foreground">
                      {{ format(addDays(today, 1), 'E, h:m b') }}
                    </span>
                  </Button>
                  <Button
                    variant="ghost"
                    class="justify-start font-normal"
                  >
                    This weekend
                    <span class="ml-auto text-muted-foreground">
                      {{ format(nextSaturday(today), 'E, h:m b') }}
                    </span>
                  </Button>
                  <Button
                    variant="ghost"
                    class="justify-start font-normal"
                  >
                    Next week
                    <span class="ml-auto text-muted-foreground">
                      {{ format(addDays(today, 7), 'E, h:m b') }}
                    </span>
                  </Button>
                </div>
              </div>
              <div class="p-2">
                <Calendar />
              </div>
            </PopoverContent>
          </Popover>
          <TooltipContent>Snooze</TooltipContent>
        </Tooltip>
      </div>
      <div class="ml-auto flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="ghost" size="icon" :disabled="!doc">
              <Reply class="size-4" />
              <span class="sr-only">Reply</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Reply</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="ghost" size="icon" :disabled="!doc">
              <ReplyAll class="size-4" />
              <span class="sr-only">Reply all</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Reply all</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="ghost" size="icon" :disabled="!doc">
              <Forward class="size-4" />
              <span class="sr-only">Forward</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Forward</TooltipContent>
        </Tooltip>
      </div>
      <Separator orientation="vertical" class="mx-2 h-6" />
      <Tooltip>
        <TooltipTrigger as-child>
          <Button variant="ghost" size="icon" @click="emits('close-display')">
            <PanelRightClose class="size-4" />
            <span class="sr-only">PanelRightClose</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>PanelRightClose</TooltipContent>
      </Tooltip>
      <Separator orientation="vertical" class="mx-2 h-6" />
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="ghost" size="icon" :disabled="!doc">
            <MoreVertical class="size-4" />
            <span class="sr-only">More</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Mark as unread</DropdownMenuItem>
          <DropdownMenuItem>Star thread</DropdownMenuItem>
          <DropdownMenuItem>Add label</DropdownMenuItem>
          <DropdownMenuItem>Mute thread</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    <Separator />
    <div v-if="doc" class="flex flex-1 flex-col">
      <div class="flex items-start p-4">
        <div class="flex items-start gap-4 text-sm">
          <!--          <Avatar>-->
          <!--            <AvatarFallback>-->
          <!--              {{ mailFallbackName }}-->
          <!--            </AvatarFallback>-->
          <!--          </Avatar>-->
          <div class="grid gap-1">
            <div class="font-semibold">
              {{ doc.indexUid }}
            </div>
            <div class="line-clamp-1 text-xs">
              {{ doc.id }}
            </div>
          </div>
        </div>
        <div v-if="doc.date" class="ml-auto text-xs text-muted-foreground">
          {{ format(new Date(doc.date), 'PPpp') }}
        </div>
      </div>
      <Separator />
      <MonacoEditor
        :theme="monacoTheme"
        :model-value="JSON.stringify(doc.hit, null, 2)"
        language="json"
        class="max-w-[100%]"
      />
      <!--      <div class="flex-1 whitespace-pre-wrap p-4 text-sm">-->
      <!--        {{ doc.doc }}-->
      <!--      </div>-->
      <Separator class="mt-auto" />
      <div class="p-4">
        <form>
          <div class="grid gap-4">
            <div class="flex items-center">
              <Label
                html-for="mute"
                class="flex items-center gap-2 text-xs font-normal"
              >
                <Switch id="editable" aria-label="Editable" />
                Editable
              </Label>
              <Button
                type="button"
                size="sm"
                class="ml-auto"
                :disabled="true"
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div v-else class="p-8 text-center text-muted-foreground">
      No message selected
    </div>
  </div>
</template>
