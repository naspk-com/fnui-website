<script setup lang="ts">
import { ref } from 'vue'

const message = ref('')
</script>

<template>
  <div style="width: 100%">
    <FnNavbar title="家庭相册" @back="message = '已返回上一页'">
      <template #actions>
        <FnIcon name="more" :size="20" />
      </template>
    </FnNavbar>
    <p role="status">{{ message || '点击左上角返回。' }}</p>
  </div>
</template>
