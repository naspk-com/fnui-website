<script setup lang="ts">
import { ref } from 'vue'

const message = ref('')
function reply(label: string) {
  message.value = '已选择：' + label
}
</script>

<template>
  <div style="max-width: 440px">
    <FnComment author="陈默" datetime="昨天 22:10" content="备份策略已经更新，大家可以确认一下自己的目录。">
      <template #actions>
        <div style="display: flex; gap: 12px">
          <FnButton size="small" variant="text" @click="reply('回复')">回复</FnButton>
          <FnButton size="small" variant="text" @click="reply('引用')">引用</FnButton>
        </div>
      </template>
    </FnComment>
    <p role="status" style="font-size: 13px; color: var(--fn-text-secondary)">{{ message || '点击操作按钮查看反馈。' }}</p>
  </div>
</template>
