<script setup lang="ts">
import { ref } from 'vue'
import { FnAlert, FnButton, FnIcon, FnInput, FnProgress, FnSlider, FnSwitch, FnTabs, FnTag, FnTextarea } from '@naspk/fnui/desktop'

const folder = ref('')
const createdFolder = ref('')
const notes = ref('')
const autoBackup = ref(true)
const notify = ref(false)
const speed = ref(60)
const tab = ref<string | number>('recent')
const items = [{ value: 'recent', label: '最近文件' }, { value: 'shared', label: '共享文件' }]
const files = [
  { icon: 'folder', name: '工作文档', detail: '128 个项目', color: 'tw:text-fn-primary' },
  { icon: 'file-image', name: '家庭相册', detail: '更新于今天', color: 'tw:text-fn-warning' },
  { icon: 'video', name: '影音收藏', detail: '更新于昨天', color: 'tw:text-fn-success' },
]
function createFolder() {
  if (!folder.value.trim()) return
  createdFolder.value = folder.value.trim()
  folder.value = ''
}
</script>

<template>
  <div class="tw:columns-1 tw:gap-[16px] tw:p-[16px] tw:sm:columns-2 tw:sm:p-[24px] tw:lg:columns-3 tw:xl:columns-4">
    <article class="tw:mb-[16px] tw:inline-block tw:w-full tw:break-inside-avoid tw:overflow-hidden tw:rounded-[10px] tw:border tw:border-solid tw:border-fn-border tw:bg-fn-container">
      <div class="tw:p-[20px]">
        <div class="tw:mb-[18px] tw:flex tw:items-start tw:justify-between">
          <div><h3 class="tw:m-0 tw:text-[15px] tw:font-semibold">快速查找</h3><p class="tw:mt-[5px] tw:mb-0 tw:text-[13px] tw:leading-[1.5] tw:text-fn-text-muted">访问常用的文件与目录</p></div>
          <FnIcon name="search" :size="17" class="tw:text-fn-text-muted" />
        </div>
        <div class="tw:flex tw:flex-col tw:gap-[2px]">
          <div v-for="file in files" :key="file.name" class="tw:flex tw:items-center tw:gap-[12px] tw:rounded-[7px] tw:py-[9px]">
            <span :class="['tw:grid tw:h-[36px] tw:w-[36px] tw:shrink-0 tw:place-items-center tw:rounded-[8px] tw:bg-fn-fill', file.color]"><FnIcon :name="file.icon" :size="18" /></span>
            <span class="tw:min-w-0 tw:flex-1"><span class="tw:block tw:text-[13px] tw:font-medium tw:leading-[1.5]">{{ file.name }}</span><span class="tw:block tw:text-[12px] tw:leading-[1.5] tw:text-fn-text-muted">{{ file.detail }}</span></span>
            <FnIcon name="chevron-right" :size="15" class="tw:text-fn-text-muted" />
          </div>
        </div>
      </div>
    </article>

    <article class="tw:mb-[16px] tw:inline-block tw:w-full tw:break-inside-avoid tw:rounded-[10px] tw:border tw:border-solid tw:border-fn-border tw:bg-fn-container tw:p-[20px]">
      <div class="tw:mb-[20px] tw:flex tw:items-start tw:justify-between">
        <div><p class="tw:m-0 tw:text-[13px] tw:text-fn-text-secondary">存储空间</p><p class="tw:mt-[8px] tw:mb-[4px] tw:text-[28px] tw:leading-none tw:font-semibold tw:tracking-[-0.03em]">1.6 <span class="tw:text-[14px] tw:font-normal tw:tracking-normal tw:text-fn-text-muted">TB</span></p></div>
        <span class="tw:grid tw:h-[34px] tw:w-[34px] tw:place-items-center tw:rounded-[8px] tw:bg-fn-primary-light tw:text-fn-primary"><FnIcon name="cloud" :size="18" /></span>
      </div>
      <FnProgress :percentage="40" label="存储空间" />
      <div class="tw:mt-[14px] tw:flex tw:justify-between tw:text-[12px] tw:text-fn-text-muted"><span>已使用 40%</span><span>共 4 TB</span></div>
    </article>

    <article class="tw:mb-[16px] tw:inline-block tw:w-full tw:break-inside-avoid tw:overflow-hidden tw:rounded-[10px] tw:border tw:border-solid tw:border-fn-border tw:bg-fn-container">
      <div class="tw:p-[20px]">
        <h3 class="tw:m-0 tw:text-[15px] tw:font-semibold">备份设置</h3>
        <p class="tw:mt-[5px] tw:mb-[20px] tw:text-[13px] tw:leading-[1.5] tw:text-fn-text-muted">让重要内容保持同步</p>
        <div class="tw:flex tw:flex-col tw:gap-[16px]">
          <div class="tw:flex tw:items-center tw:justify-between tw:gap-[12px]"><span class="tw:text-[13px]">自动备份</span><FnSwitch v-model="autoBackup" :input-attrs="{ 'aria-label': '自动备份' }" /></div>
          <div class="tw:flex tw:items-center tw:justify-between tw:gap-[12px]"><span class="tw:text-[13px]">完成后通知</span><FnSwitch v-model="notify" :input-attrs="{ 'aria-label': '完成后通知' }" /></div>
        </div>
      </div>
      <div class="tw:border-t tw:border-solid tw:border-fn-border tw:px-[20px] tw:py-[12px] tw:text-[12px] tw:text-fn-text-muted">设置仅用于展示，不会更改系统配置</div>
    </article>

    <article class="tw:mb-[16px] tw:inline-block tw:w-full tw:break-inside-avoid tw:rounded-[10px] tw:border tw:border-solid tw:border-fn-border tw:bg-fn-container tw:p-[20px]">
      <div class="tw:mb-[16px] tw:flex tw:items-center tw:justify-between"><h3 class="tw:m-0 tw:text-[15px] tw:font-semibold">新建文件夹</h3><FnIcon name="folder-open" :size="18" class="tw:text-fn-text-muted" /></div>
      <label for="showcase-folder" class="tw:mb-[7px] tw:block tw:text-[13px] tw:font-medium">文件夹名称</label>
      <div @keydown.enter="createFolder"><FnInput v-model="folder" clearable placeholder="输入名称" :input-attrs="{ id: 'showcase-folder' }" /></div>
      <div class="tw:mt-[16px] tw:flex tw:items-center tw:justify-between tw:gap-[8px]"><span role="status" class="tw:min-w-0 tw:truncate tw:text-[12px] tw:text-fn-text-muted">{{ createdFolder ? `已创建 ${createdFolder}` : '仅在此处预览' }}</span><FnButton size="small" tone="primary" @click="createFolder">创建</FnButton></div>
    </article>

    <article class="tw:mb-[16px] tw:inline-block tw:w-full tw:break-inside-avoid tw:rounded-[10px] tw:border tw:border-solid tw:border-fn-border tw:bg-fn-container tw:p-[20px]">
      <h3 class="tw:mt-0 tw:mb-[16px] tw:text-[15px] tw:font-semibold">文件视图</h3>
      <FnTabs v-model="tab" label="文件分类" :items="items">
        <template #panel="{ item }"><div class="tw:flex tw:items-center tw:gap-[12px] tw:pt-[16px]"><span class="tw:grid tw:h-[36px] tw:w-[36px] tw:place-items-center tw:rounded-[8px] tw:bg-fn-primary-light tw:text-fn-primary"><FnIcon name="folder" :size="18" /></span><span><span class="tw:block tw:text-[13px] tw:font-medium">{{ item.value === 'recent' ? '项目资料' : '家庭共享' }}</span><span class="tw:block tw:pt-[3px] tw:text-[12px] tw:text-fn-text-muted">{{ item.value === 'recent' ? '刚刚更新' : '与家人共享' }}</span></span></div></template>
      </FnTabs>
    </article>

    <article class="tw:mb-[16px] tw:inline-block tw:w-full tw:break-inside-avoid tw:rounded-[10px] tw:border tw:border-solid tw:border-fn-border tw:bg-fn-container tw:p-[20px]">
      <div class="tw:mb-[18px] tw:flex tw:items-start tw:justify-between"><div><h3 class="tw:m-0 tw:text-[15px] tw:font-semibold">传输限速</h3><p class="tw:mt-[5px] tw:mb-0 tw:text-[13px] tw:text-fn-text-muted">为后台任务分配带宽</p></div><FnIcon name="cloud-upload" :size="18" class="tw:text-fn-text-muted" /></div>
      <div class="tw:mb-[12px] tw:text-[20px] tw:font-semibold">{{ speed }} <span class="tw:text-[12px] tw:font-normal tw:text-fn-text-muted">MB/s</span></div>
      <FnSlider v-model="speed" label="上传速度限制" :min="0" :max="100" />
    </article>

    <article class="tw:mb-[16px] tw:inline-block tw:w-full tw:break-inside-avoid tw:rounded-[10px] tw:border tw:border-solid tw:border-fn-border tw:bg-fn-container tw:p-[20px]">
      <h3 class="tw:mt-0 tw:mb-[5px] tw:text-[15px] tw:font-semibold">共享备注</h3><p class="tw:mt-0 tw:mb-[16px] tw:text-[13px] tw:text-fn-text-muted">为协作者留下说明</p>
      <FnTextarea v-model="notes" placeholder="写下备注..." :input-attrs="{ 'aria-label': '共享备注' }" />
    </article>

    <article class="tw:mb-[16px] tw:inline-block tw:w-full tw:break-inside-avoid tw:rounded-[10px] tw:border tw:border-solid tw:border-fn-border tw:bg-fn-container tw:p-[20px]">
      <div class="tw:mb-[16px] tw:flex tw:items-center tw:justify-between"><h3 class="tw:m-0 tw:text-[15px] tw:font-semibold">后台任务</h3><FnTag tone="success">已完成</FnTag></div>
      <FnAlert title="备份已完成" tone="success">文件已同步至家庭空间。</FnAlert>
      <div class="tw:mt-[14px] tw:flex tw:items-center tw:gap-[6px] tw:text-[12px] tw:text-fn-text-muted"><FnIcon name="time" :size="14" /> 今天 10:28</div>
    </article>
  </div>
</template>
