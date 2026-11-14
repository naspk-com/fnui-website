<script setup lang="ts">
import { ref } from 'vue'

const form = ref<{ validate: () => Promise<boolean>; resetFields: () => void }>()
const model = ref({ name: '家庭相册备份', path: '/vol1/Photos' })
const rules = {
  name: [{ required: true, message: '请输入任务名称' }],
  path: [{ required: true, message: '请输入目录路径' }],
}
</script>

<template>
  <div style="max-width: 420px">
    <FnForm ref="form" :model="model" :rules="rules">
      <FnFormItem field="name" label="任务名称">
        <template #default="{ id, errorId }">
          <FnInput v-model="model.name" :input-attrs="{ id, 'aria-describedby': errorId }" />
        </template>
      </FnFormItem>
      <FnFormItem field="path" label="目录路径">
        <template #default="{ id, errorId }">
          <FnInput v-model="model.path" :input-attrs="{ id, 'aria-describedby': errorId }" />
        </template>
      </FnFormItem>
    </FnForm>
    <div style="display: flex; gap: 8px">
      <FnButton size="small" tone="primary" @click="form?.validate()">校验</FnButton>
      <FnButton size="small" variant="outline" @click="form?.resetFields()">重置</FnButton>
    </div>
  </div>
</template>
