<script setup lang="ts">
import { ref } from 'vue'

const note = ref('旅行照片')
</script>

<template>
  <div style="max-width: 360px">
    <FnInput v-model="note" placeholder="输入备注" :input-attrs="{ maxlength: 20 }" />
    <p style="margin: 8px 0 0; font-size: 12px; color: var(--fn-text-secondary)">{{ note.length }} / 20</p>
  </div>
</template>
