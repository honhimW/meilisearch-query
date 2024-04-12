<script setup lang="ts">
import { DotsHorizontalIcon } from '@radix-icons/vue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { badgeVariants } from '@/components/ui/badge'

const props = defineProps<{
  document: any
}>()

function copy(id: string) {
  navigator.clipboard.writeText(id)
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="h-8 w-8 p-0">
        <span class="sr-only">Open menu</span>
        <DotsHorizontalIcon class="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem @click="copy(JSON.stringify(props.document))">
        Copy raw
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Copy id</DropdownMenuItem>
      <DropdownMenuItem>View around documents</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<!--<template>-->
<!--  <DropdownMenu>-->
<!--    <DropdownMenuTrigger as-child>-->
<!--      <Button variant="ghost" class="h-8 w-8 p-0">-->
<!--        <span class="sr-only">Open menu</span>-->
<!--        <DotsHorizontalIcon class="h-4 w-4" />-->
<!--      </Button>-->
<!--    </DropdownMenuTrigger>-->
<!--    <DropdownMenuContent align="end">-->
<!--      <DropdownMenuLabel>Actions</DropdownMenuLabel>-->
<!--      <DropdownMenuItem @click="copy(payment.id)">-->
<!--        Copy payment ID-->
<!--      </DropdownMenuItem>-->
<!--      <DropdownMenuSeparator />-->
<!--      <DropdownMenuItem>View customer</DropdownMenuItem>-->
<!--      <DropdownMenuItem>View payment details</DropdownMenuItem>-->
<!--    </DropdownMenuContent>-->
<!--  </DropdownMenu>-->
<!--</template>-->
