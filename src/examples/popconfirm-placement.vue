<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>

<template>
  <div>
    <FnPopconfirm v-model:visible="visible" title="撤销授权" placement="right" confirm-text="撤销" @confirm="visible = false">
      <template #trigger><FnButton variant="outline">撤销目录授权</FnButton></template>
      <p style="margin: 0; max-width: 220px">撤销后该目录将不再对应用可见。</p>
    </FnPopconfirm>
  </div>
</template>
