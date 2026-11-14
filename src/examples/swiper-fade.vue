<script setup lang="ts">
import { ref } from 'vue'

const index = ref(0)
const colors = ['#dbeafe', '#fef3c7', '#d1fae5']
</script>

<template>
  <div style="max-width: 420px">
    <FnSwiper v-model="index" :count="3" label="淡入淡出轮播" animation="fade">
      <template #default="{ index: current }">
        <div :style="{ height: '150px', borderRadius: '12px', background: colors[current] }" />
      </template>
    </FnSwiper>
  </div>
</template>
