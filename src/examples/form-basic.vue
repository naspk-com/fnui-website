<script setup lang="ts">
import { ref } from 'vue'

const form = ref<{ validate: () => Promise<boolean> }>()
const model = ref({ name: '', path: '' })
const rules = {
  name: [{ required: true, message: '请输入任务名称' }],
  path: [{ required: true, message: '请选择备份目录' }],
}
const status = ref('')

async function submit() {
  status.value = await form.value?.validate() ? '校验通过，任务已保存。' : '请先补全必填项。'
}
</script>

<template>
  <div style="max-width: 420px">
    <FnForm ref="form" :model="model" :rules="rules">
      <FnFormItem field="name" label="任务名称">
        <template #default="{ id, errorId }">
          <FnInput v-model="model.name" placeholder="例如：家庭相册备份" :input-attrs="{ id, 'aria-describedby': errorId }" />
        </template>
      </FnFormItem>
      <FnFormItem field="path" label="备份目录">
        <template #default="{ id, errorId }">
          <FnInput v-model="model.path" placeholder="例如：/vol2/Backup" :input-attrs="{ id, 'aria-describedby': errorId }" />
        </template>
      </FnFormItem>
    </FnForm>
    <FnButton size="small" tone="primary" @click="submit">保存任务</FnButton>
    <p role="status">{{ status }}</p>
  </div>
</template>
