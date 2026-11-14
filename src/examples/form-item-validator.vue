<script setup lang="ts">
import { ref } from 'vue'

const form = ref<{ validate: () => Promise<boolean> }>()
const model = ref({ port: '' })
const rules = {
  port: [{ validate: (value: unknown) => /^[0-9]+$/.test(String(value ?? '')) || '端口必须是数字' }],
}
</script>

<template>
  <div style="max-width: 420px">
    <FnForm ref="form" :model="model" :rules="rules">
      <FnFormItem field="port" label="服务端口">
        <template #default="{ id, errorId }">
          <FnInput v-model="model.port" placeholder="例如 5666" :input-attrs="{ id, 'aria-describedby': errorId }" />
        </template>
      </FnFormItem>
    </FnForm>
    <FnButton size="small" @click="form?.validate()">校验端口</FnButton>
  </div>
</template>
