<script lang="ts" setup>
import { computed, defineComponent } from 'vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

defineComponent(Badge)

const props = defineProps<{
  row: Record<string, any>
}>()

const flatted = computed(() => {
  return flattenObject(props.row)
})

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
</script>

<template>
  <div class="flex max-h-[200px] items-center source dscTruncateByHeight">
    <template v-for="(value, key) in flatted" :key="key">
      <Badge
        class="mr-2"
        style="font-size: 0.85rem; font-weight: bold;"
      >
        {{ key + ':' }}
      </Badge>
      <span class="font-medium" style="padding-right: 7px">{{ value }}</span>
    </template>
  </div>
</template>

<style scoped>
.max-h-[200px] {
  max-height: 200px;
}
.items-center {
  align-items: center;
}
.source {
  margin-bottom: 0;
  line-height: 2em;
  word-break: break-word;
}
.dscTruncateByHeight {
  overflow: hidden;
  display: inline-block;
  max-height: 115px;
  //overflow-y: auto;
  //scrollbar-width: none;
}
span:hover {
  text-decoration: underline;
}
</style>
