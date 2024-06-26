<script lang="ts" setup>
import { computed, defineComponent, h } from 'vue'
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
      value: _flattenObject[flattenObjectKey]
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
    return h('div', { innerHTML: this.html })
  }
})

const resolveMedia = (raw: string) => {
  let imgRegex = /^https?:\/\/.*\.(jpg|jpeg|png|gif|webp|svg|psd|bmp|tif)$/i
  let audioRegex = /^https:?\/\/.*\.(mp3|wav|wma|ogg|ape)$/i
  let videoRegex = /^https:?\/\/.*\.(mp4|avi|mkv|flv|wmv|mov)$/i
  let link = /^https:?\/\/.*/i

  let url = raw
  if (imgRegex.test(url)) {
    return h('img', { src: url, alt: 'Image', class: 'max-h-[240px]' })
  } else if (audioRegex.test(url)) {
    return h('audio', { controls: true, src: url })
  } else if (videoRegex.test(url)) {
    return h('video', { controls: true, src: url })
  } else if (link.test(url)) {
    return h('a', { href: url }, url)
  } else {
    return h(InnerHTMLComponent, { class: ' font-medium source', style: 'word-break: break-word;', html: raw })
  }
}

const columns: ColumnDef<IData>[] = [
  {
    accessorKey: 'key',
    header: 'KEY',
    enableSorting: false
  },
  {
    accessorKey: 'value',
    header: 'VALUE',
    cell: ({ row }) => h('div', {
      class: 'flex items-center',
      style: 'width: 100%; height: 100%'
    }, [
      resolveMedia(row.original.value)
    ]),
    enableSorting: false
  }
]

</script>

<template>
  <div class="dscTruncateByHeight">
    <DataTable :columns="columns" :data="flatted" />
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
