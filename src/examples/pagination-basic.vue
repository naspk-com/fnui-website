<script setup lang="ts">
import { ref } from 'vue'

const page = ref(1)
</script>

<template>
  <div style="max-width: 520px">
    <FnPagination v-model:page="page" :total="128" :page-size="10" :page-size-options="[10, 20, 50]" show-jumper />
    <p>第 {{ page }} 页</p>
  </div>
</template>
