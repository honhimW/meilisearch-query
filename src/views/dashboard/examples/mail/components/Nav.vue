<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import { VueDraggableNext } from 'vue-draggable-next'
import { defineComponent, toRef } from 'vue'
import { Separator } from '@/components/ui/separator'

export interface Attribute {
  title: string
  label?: string
  icon: string
  variant: 'default' | 'ghost'
}

interface NavProps {
  selected: Attribute[]
  unselected: Attribute[]
}

const props = defineProps<NavProps>()
defineComponent(VueDraggableNext)

const selectedRef = toRef(props, 'selected')
const unselectedRef = toRef(props, 'unselected')

</script>

<template>
  <div
    class="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
  >
    <p
      class="uppercase text-xs font-light text-gray-400 mb-2 tracking-widest transition-all duration-300 delay-100"
    >
      {{ 'SELECTED' }}
    </p>
    <VueDraggableNext
      handle=".handle"
      group="fields"
      :options="{ draggable: '.draggable' }"
      class="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2"
    >
      <div
        v-if="selectedRef.length === 0 || true"
        :class="cn(
            buttonVariants({ variant: 'ghost', size: 'sm' }),
            'justify-start',
          )"
      >
        {{ 'PLAIN DOCUMENT' + selectedRef.length }}
      </div>
      <template v-for="(link, index) of selectedRef" class="draggable">
        <div
          :class="cn(
            buttonVariants({ variant: link.variant, size: 'sm' }),
            link.variant === 'default'
              && 'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
            'justify-start',
          )"
        >
          <Icon icon="lucide:menu" class="handle mr-2 size-4" />
          <!--          <Icon :icon="link.icon" class="mr-2 size-4" />-->
          {{ link.title }}
          <span
            v-if="link.label"
            :class="cn(
              'ml-auto',
              link.variant === 'default'
                && 'text-background dark:text-white',
            )"
          >
            {{ link.label }}
          </span>
        </div>
      </template>
    </VueDraggableNext>
      <Separator />
    <p
      class="uppercase text-xs font-light text-gray-400 mb-2 tracking-widest transition-all duration-300 delay-100"
    >
      {{ 'UNSELECTED' }}
    </p>
    <VueDraggableNext
      handle=".handle"
      group="fields"
      :options="{ draggable: '.draggable' }"
      class="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2"
    >
      <template v-for="(link, index) of unselectedRef" class="draggable">
        <div
          :class="cn(
            buttonVariants({ variant: link.variant, size: 'sm' }),
            link.variant === 'default'
              && 'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
            'justify-start',
          )"
        >
          <Icon icon="lucide:menu" class="handle mr-2 size-4" />
          <!--          <Icon :icon="link.icon" class="mr-2 size-4" />-->
          {{ link.title }}
          <span
            v-if="link.label"
            :class="cn(
              'ml-auto',
              link.variant === 'default'
                && 'text-background dark:text-white',
            )"
          >
            {{ link.label }}
          </span>
        </div>
      </template>
    </VueDraggableNext>
  </div>
</template>
