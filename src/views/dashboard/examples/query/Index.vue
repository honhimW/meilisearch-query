<script lang="ts">
import QueryPopover from './MultiSearchPopover.vue'
import { type ColumnDef } from './data-table'

import { defineComponent, inject, watch } from 'vue'

import data from '@/assets/tasks.json'
import { ref, h } from 'vue'
import { Checkbox } from '@/components/ui/checkbox'
import DataTableHeader from '@/components/ui/data-table/DataTableHeader.vue'
import type { Column } from '@tanstack/vue-table'
import { Badge } from '@/components/ui/badge'
import { type Hit, Meilisearch, type MultiSearchResult } from 'meilisearch'
import { type MultiSearchQuery, type SearchParams } from 'meilisearch/src/types/types'
import DemoDataTable from './data-table/DataTable.vue'
import DropdownAction from './data-table/DataTableColumn.vue'

export default defineComponent({
  name: 'Search Bar',
  components: { DemoDataTable, QueryPopover },
  props: {
  },
  inject: ['msClient'],
  mounted() {
    this.search()
  },
  data(vm) {
    let columns: ColumnDef<IData>[] = []
    let results: Array<Hit> = []
    let mergeResults: Array<IData> = []
    return {
      columns,
      results,
      mergeResults,
      q: '',
      indexes: ['logback_133']
    }
  },
  methods: {
    search(query?: SearchParams | string) {
      console.log(query)
      // this.columns = []
      // this.results = []
      // this.mergeResults = []
      this.columns.length = 0
      this.results.length = 0
      this.mergeResults.length = 0
      let queries: MultiSearchQuery[] = this.indexes.map(value => {
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
      (this.msClient as Meilisearch)?.multiSearch({
        queries
      }).then(value => {
        let results = value.results
        renderColumn(results, this.columns, this.results, this.mergeResults)
      })
    }
  }
})

const renderColumn = (results: Array<MultiSearchResult<Record<string, any>>>, columns: ColumnDef<IData>[], hits: Array<Hit>, mergeResults: Array<IData>) => {
  columns.push(
    // {
    //   accessorKey: 'id',
    //   header: 'Id',
    //   enableSorting: false,
    // },
    // {
    //   accessorKey: 'timestamp',
    //   header: 'Timestamp',
    //   enableSorting: false,
    // },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        return h('div', {
          document: row.original.doc,
          class: ['flex'],
          style: 'align-items: center; justify-content: flex-start;'
        }, h(DropdownAction, {
          document: row.original.doc,
        }))
      },
    },
    {
      accessorKey: 'document',
      header: ({ column }) => h(DataTableHeader, {
        column: column as Column<IData>,
        title: 'Document',
        'onUpdate:sort': (val) => {
          console.log(val)
        },
      }),
      cell: ({ row }) => {
        let doc = row.original.doc
        let flatted: Record<string, any> = flattenObject(doc)
        let children = []
        let i = 0
        for (let flattedKey in flatted) {
          let key = h(Badge, {
            variant: 'outline',
            class: 'mr-2',
            style: 'font-size: 0.85rem; font-weight: bold; inline-block'
          }, () => flattedKey + ':')
          let val = h('span', { class: 'font-medium', style: 'inline-block', innerHTML: ' ' + flatted[flattedKey] + ' '})
          children.push(key)
          children.push(val)
        }
        return h('div', {
          class: ['max-w-[100%] max-h-[200px] items-center source dscTruncateByHeight'],
        }, children)
      }
    },
  )
  results.forEach(value => {
    let _hits = value.hits
    _hits.forEach(hit => {
      let formatted = hit._formatted
      if (formatted !== undefined) {
        hits.push(formatted)
      }
    })
  })
  let _temp: Array<IData> = hits.map(value => ({
    document: JSON.stringify(value),
    doc: value
  }))
  _temp.forEach(value => mergeResults.push(value))
}

interface IData {
  document: string
  doc: object
}

const flattenObject = (obj: any, parentKey = '', result = {} as Record<string, any>) => {
  for (let key in obj) {
    let newKey = parentKey ? `${parentKey}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      flattenObject(obj[key], newKey, result);
    } else {
      result[newKey] = obj[key];
    }
  }
  return result;
}

</script>
<template>
  <div>
    <page-header title="Search"></page-header>
    <QueryPopover :q="q" @performSearch="search"/>
    <DemoDataTable :columns="columns" :data="mergeResults"></DemoDataTable>
  </div>

</template>

<style lang="scss">
.source {
  margin-bottom: 0;
  line-height: 2em;
  word-break: break-word;
  text-overflow: ellipsis;
}
.dscTruncateByHeight {
  overflow: hidden;
  display: inline-block;
  max-height: 115px;
}
</style>