<script lang="ts" setup>
import { computed, defineComponent, h } from 'vue'
import { Badge } from '@/components/ui/badge'
import type { Attribute, ScreenProps } from '@/views/dashboard/examples/query/Screen.vue'
import { type ColumnDef, DataTable } from '@/components/ui/data-table'

const props = defineProps<{
  row: Record<string, any>
  attributes?: ScreenProps
}>()

const flatted = computed(() => {
  let _flattenObject = flattenObject(props.row)
  let iDatas: IData[] = []

  for (const flattenObjectKey in _flattenObject) {
    iDatas.push({
      key: flattenObjectKey,
      value: _flattenObject[flattenObjectKey],
    })
  }

  return iDatas
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

interface IData {
  key: string
  value: any
}

const InnerHTMLComponent = defineComponent({
  props: ['html'],
  render() {
    return h('div', { innerHTML: this.html });
  }
})

const columns: ColumnDef<IData>[] = [
  {
    accessorKey: 'key',
    header: 'KEY',
    enableSorting: false,
  },
  {
    accessorKey: 'value',
    header: 'VALUE',
    cell: ({ row }) => h('div', {
      class: 'flex items-center',
      style: 'width: 100%; height: 100%',
    }, [
      h(InnerHTMLComponent, {class: ' font-medium source', style: 'word-break: break-word;', html: row.original.value}),
    ]),
    enableSorting: false,
  },
];

</script>

<template>
  <div class="dscTruncateByHeight">
    <DataTable :columns="columns" :data="flatted"></DataTable>
  </div>
</template>

<style scoped>
.items-center {
  align-items: center;
}

.source {
  margin-bottom: 0;
  line-height: 2em;
  word-break: break-word;
}

.dscTruncateByHeight {
  overflow-y: scroll;
  overflow-x: clip;
  display: inline-block;
  height: 610px;
}
span:hover {
  text-decoration: underline;
}
</style>
