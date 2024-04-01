<script lang="ts">
import QueryPopover from './MultiSearchPopover.vue';
import { DataTable, type ColumnDef } from '@/components/ui/data-table';

import { defineComponent } from 'vue'
import ResultTable from '@/views/dashboard/examples/query/ResultTable.vue'

export default defineComponent({
  components: { ResultTable, DataTable, QueryPopover }
})


</script>
<template>
  <div>
    <page-header title="Search"></page-header>
    <QueryPopover />
    <ResultTable />
  </div>

</template>
