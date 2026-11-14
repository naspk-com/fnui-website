<script setup lang="ts">
import { ref } from 'vue'

const active = ref('files')
const items = [
  { value: 'files', label: '文件' },
  { value: 'shared', label: '共享' },
  { value: 'trash', label: '回收站' },
]
const tabs = [
  { value: 'files', label: '文件', icon: 'folder-filled' },
  { value: 'shared', label: '共享', icon: 'share' },
  { value: 'trash', label: '回收站', icon: 'delete' },
]
</script>

<template>
  <FnLayout shell="standalone" class="layout-demo">
    <template #navigation>
      <FnMenu v-model="active" label="应用导航" :items="items" />
    </template>
    <template #bottomNavigation>
      <button v-for="tab in tabs" :key="tab.value" type="button" :aria-current="active === tab.value ? 'page' : undefined" @click="active = tab.value">
        <FnIcon :name="tab.icon" :size="22" />
        <span>{{ tab.label }}</span>
      </button>
    </template>
    <div class="layout-demo__page">
      <header class="layout-demo__header">
        <strong>文件</strong>
        <span>桌面端始终保留左侧导航；移动端自动切换为底部标签栏。</span>
      </header>
      <section class="layout-demo__card">
        <div class="layout-demo__status">
          <b>可用空间 1.2 TB</b>
          <span>共 4 个项目</span>
        </div>
        <div class="layout-demo__meter"><i style="width: 62%" /></div>
        <p>最近修改：项目资料、照片、使用说明.pdf</p>
      </section>
      <section class="layout-demo__card layout-demo__links">
        <div><FnIcon name="folder-filled" :size="20" /><span>我的文件</span><em>4</em></div>
        <div><FnIcon name="share" :size="20" /><span>共享</span><em>2</em></div>
        <div><FnIcon name="delete" :size="20" /><span>回收站</span><em>1</em></div>
      </section>
    </div>
  </FnLayout>
</template>

<style scoped>
.layout-demo { height: 100%; min-height: 0; }
.layout-demo__page { height: 100%; overflow: auto; padding: 20px; box-sizing: border-box; }
.layout-demo__header { display: flex; flex-direction: column; gap: 4px; margin-bottom: 16px; }
.layout-demo__header strong { font-size: 22px; line-height: 1.3; }
.layout-demo__header span { color: var(--fn-text-secondary); font-size: 12px; }
.layout-demo__card { padding: 16px; border-radius: 12px; background: var(--fn-fill); }
.layout-demo__card + .layout-demo__card { margin-top: 12px; }
.layout-demo__status { display: flex; align-items: center; justify-content: space-between; font-size: 13px; }
.layout-demo__status span { color: var(--fn-text-secondary); }
.layout-demo__meter { height: 6px; margin: 12px 0; border-radius: 3px; background: var(--fn-border); overflow: hidden; }
.layout-demo__meter i { display: block; height: 100%; border-radius: 3px; background: var(--fn-primary); }
.layout-demo__card p { margin: 0; color: var(--fn-text-secondary); font-size: 12px; }
.layout-demo__links { display: flex; flex-direction: column; gap: 4px; }
.layout-demo__links > div { display: flex; align-items: center; gap: 10px; min-height: 40px; font-size: 14px; }
.layout-demo__links em { margin-left: auto; color: var(--fn-text-secondary); font-style: normal; font-size: 12px; }
</style>
