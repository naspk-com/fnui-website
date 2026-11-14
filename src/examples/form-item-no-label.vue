<script setup lang="ts">
import { ref } from 'vue'

const form = ref<{ validate: () => Promise<boolean> }>()
const model = ref({ keyword: '' })
const rules = { keyword: [{ required: true, message: '请输入关键字' }] }
</script>

<template>
  <div style="max-width: 420px">
    <FnForm ref="form" :model="model" :rules="rules">
      <FnFormItem field="keyword">
        <template #default="{ id, errorId }">
          <FnInput v-model="model.keyword" placeholder="搜索文件" :input-attrs="{ id, 'aria-describedby': errorId }" />
        </template>
      </FnFormItem>
    </FnForm>
    <FnButton size="small" @click="form?.validate()">搜索</FnButton>
  </div>
</template>
