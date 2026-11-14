<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'

const form = ref<{ validate: () => Promise<boolean> }>()
const model = ref({ path: '' })
const rules = { path: [{ required: true, message: '请选择备份目录' }] }
onMounted(() => nextTick(() => { void form.value?.validate() }))
</script>

<template>
  <div style="max-width: 420px">
    <FnForm ref="form" :model="model" :rules="rules">
      <FnFormItem field="path" label="备份目录" help="选择已授权的目录作为备份目标。">
        <template #default="{ id, errorId }">
          <FnInput v-model="model.path" placeholder="例如：/vol2/Backup" :input-attrs="{ id, 'aria-describedby': errorId }" />
        </template>
      </FnFormItem>
    </FnForm>
  </div>
</template>
