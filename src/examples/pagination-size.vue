<script setup lang="ts">
import { ref } from 'vue'

const page = ref(1)
const pageSize = ref(20)
</script>

<template>
  <div style="max-width: 520px">
    <FnPagination v-model:page="page" v-model:page-size="pageSize" :total="256" :page-size-options="[10, 20, 50]" />
    <p style="font-size: 13px; color: var(--fn-text-secondary)">第 {{ page }} 页，每页 {{ pageSize }} 条</p>
  </div>
</template>
