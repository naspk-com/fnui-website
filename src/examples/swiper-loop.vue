<script setup lang="ts">
import { ref } from 'vue'

const index = ref(4)
</script>

<template>
  <div style="max-width: 420px">
    <FnSwiper v-model="index" :count="5" label="循环轮播" loop>
      <template #default="{ index: current }">
        <div style="height: 150px; border-radius: 12px; display: flex; align-items: center; justify-content: center; background: var(--fn-fill); font-size: 16px">
          第 {{ current + 1 }} 张
        </div>
      </template>
    </FnSwiper>
  </div>
</template>
