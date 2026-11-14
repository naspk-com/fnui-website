<script setup lang="ts">
import { ref } from 'vue'

const description = ref('')
</script>

<template>
  <div style="max-width: 420px">
    <FnTextarea v-model="description" placeholder="补充备份说明" :input-attrs="{ maxlength: 100, rows: 4 }" />
    <p style="margin: 8px 0 0; font-size: 12px; color: var(--fn-text-secondary)">{{ description.length }} / 100</p>
  </div>
</template>
