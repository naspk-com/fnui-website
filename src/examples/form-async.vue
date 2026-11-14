<script setup lang="ts">
import { ref } from 'vue'

const form = ref<{ validate: () => Promise<boolean> }>()
const model = ref({ name: '' })
const checking = ref(false)
const rules = {
  name: [{
    validate: async (value: unknown) => {
      checking.value = true
      await new Promise(resolve => setTimeout(resolve, 500))
      checking.value = false
      return String(value ?? '').length >= 3 || '名称至少需要 3 个字符'
    },
  }],
}
async function submit() {
  const valid = await form.value?.validate()
  if (valid) model.value.name = model.value.name.trim()
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
    </FnForm>
    <FnButton size="small" tone="primary" :loading="checking" @click="submit">{{ checking ? '校验中' : '保存' }}</FnButton>
  </div>
</template>
