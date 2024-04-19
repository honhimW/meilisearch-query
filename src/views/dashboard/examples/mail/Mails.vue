<script lang="ts" setup>
import Mail from './components/Mail.vue'
import { accounts, mails } from './data/mails'

const indexes = [
  {
    uid: 'logback_133',
    count: '100'
  }
]
</script>

<template>
  <div class="hidden flex-col md:flex">
    <Mail
      :indexes="indexes"
      :mails="mails"
      :nav-collapsed-size="4"
    />
  </div>
</template>
