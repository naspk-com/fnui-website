<script setup lang="ts">
import { useFnNotification } from '@naspk/fnui/core'

const notification = useFnNotification()
const placements = ['top-right', 'top-left', 'bottom-right', 'bottom-left'] as const
</script>

<template>
  <div style="display: flex; flex-wrap: wrap; gap: 12px">
    <FnButton
      v-for="placement in placements"
      :key="placement"
      variant="outline"
      @click="notification.info('位置提示', { message: placement, placement, duration: 4000 })"
    >
      {{ placement }}
    </FnButton>
  </div>
</template>
