<script setup lang="ts">
import { ref } from 'vue'

const index = ref(0)
</script>

<template>
  <div style="max-width: 420px">
    <FnSwiper v-model="index" :count="3" label="推荐内容" autoplay :interval="3000" loop>
      <template #default="{ index: current }">
        <div style="height: 150px; border-radius: 12px; display: flex; align-items: center; justify-content: center; background: var(--fn-fill); font-size: 16px">
          推荐内容 {{ current + 1 }}
        </div>
      </template>
    </FnSwiper>
  </div>
</template>
