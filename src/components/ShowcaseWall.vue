<script setup lang="ts">
import { ref } from 'vue'
import { FnAlert, FnAvatarGroup, FnBadge, FnButton, FnCheckbox, FnCheckboxGroup, FnIcon, FnInput, FnProgress, FnRadio, FnRadioGroup, FnSelect, FnSlider, FnSwitch, FnTabs, FnTag, FnTextarea } from '@naspk/fnui/desktop'

const folder = ref('')
const createdFolder = ref('')
const notes = ref('')
const autoBackup = ref(true)
const notify = ref(false)
const speed = ref(60)
const transferPaused = ref(false)
const syncFolders = ref<(string | number | boolean)[]>(['photos', 'documents'])
const syncFrequency = ref('daily')
const sharePermission = ref('read')
const shareExpiry = ref('7')
const fileService = ref(true)
const recycleSelected = ref(false)
const recycleCleared = ref(false)
const tab = ref<string | number>('recent')
const items = [{ value: 'recent', label: '最近文件' }, { value: 'shared', label: '共享文件' }]
const files = [
  { icon: 'folder', name: '工作文档', detail: '128 个项目', color: 'tw:text-fn-primary' },
  { icon: 'file-image', name: '家庭相册', detail: '更新于今天', color: 'tw:text-fn-warning' },
  { icon: 'video', name: '影音收藏', detail: '更新于昨天', color: 'tw:text-fn-success' },
]
const frequencyOptions = [{ value: 'daily', label: '每天' }, { value: 'weekly', label: '每周' }, { value: 'manual', label: '手动' }]
const expiryOptions = [{ value: '1', label: '1 天' }, { value: '7', label: '7 天' }, { value: '30', label: '30 天' }]
const collaborators = [
  { value: 'lin', alt: '林岚', text: '林' },
  { value: 'chen', alt: '陈默', text: '陈' },
  { value: 'wang', alt: '王可', text: '王' },
  { value: 'zhao', alt: '赵一', text: '赵' },
]
function createFolder() {
  if (!folder.value.trim()) return
  createdFolder.value = folder.value.trim()
  folder.value = ''
}
</script>

<template>
  <div class="showcase-wall tw:columns-1 tw:gap-[16px] tw:p-[16px] tw:sm:columns-2 tw:sm:p-[24px] tw:lg:columns-3 tw:xl:columns-4">
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
      <FnProgress :percentage="40" label="存储空间" :show-value="false" />
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

    <article class="tw:mb-[16px] tw:inline-block tw:w-full tw:break-inside-avoid tw:rounded-[10px] tw:border tw:border-solid tw:border-fn-border tw:bg-fn-container tw:p-[20px]">
      <div class="tw:mb-[18px] tw:flex tw:items-start tw:justify-between tw:gap-[12px]">
        <div><h3 class="tw:m-0 tw:text-[15px] tw:font-semibold">存储池健康</h3><p class="tw:mt-[5px] tw:mb-0 tw:text-[13px] tw:text-fn-text-muted">磁盘与容量概览</p></div>
        <FnTag tone="success">运行正常</FnTag>
      </div>
      <div class="tw:flex tw:flex-col tw:gap-[16px]">
        <div>
          <div class="tw:mb-[7px] tw:flex tw:justify-between tw:gap-[8px] tw:text-[13px]"><span>存储空间 1</span><span class="tw:text-fn-text-muted">1.6 / 4 TB</span></div>
          <FnProgress :percentage="40" label="存储空间 1 使用率" :show-value="false" />
        </div>
        <div>
          <div class="tw:mb-[7px] tw:flex tw:justify-between tw:gap-[8px] tw:text-[13px]"><span>存储空间 2</span><span class="tw:text-fn-text-muted">2.8 / 4 TB</span></div>
          <FnProgress :percentage="70" label="存储空间 2 使用率" :show-value="false" />
        </div>
      </div>
      <p class="tw:mt-[16px] tw:mb-0 tw:text-[12px] tw:text-fn-text-muted">4 块硬盘在线，上次检查：今天 08:00</p>
    </article>

    <article class="tw:mb-[16px] tw:inline-block tw:w-full tw:break-inside-avoid tw:rounded-[10px] tw:border tw:border-solid tw:border-fn-border tw:bg-fn-container tw:p-[20px]">
      <div class="tw:mb-[18px] tw:flex tw:items-start tw:justify-between tw:gap-[12px]">
        <div><h3 class="tw:m-0 tw:text-[15px] tw:font-semibold">传输任务</h3><p class="tw:mt-[5px] tw:mb-0 tw:text-[13px] tw:text-fn-text-muted">下载到影音收藏</p></div>
        <FnTag :tone="transferPaused ? 'warning' : 'primary'">{{ transferPaused ? '已暂停' : '下载中' }}</FnTag>
      </div>
      <div class="tw:mb-[10px] tw:flex tw:items-center tw:gap-[10px]">
        <span class="tw:grid tw:h-[36px] tw:w-[36px] tw:shrink-0 tw:place-items-center tw:rounded-[8px] tw:bg-fn-primary-light tw:text-fn-primary"><FnIcon name="video" :size="18" /></span>
        <span class="tw:min-w-0"><span class="tw:block tw:truncate tw:text-[13px] tw:font-medium">旅行记录.mp4</span><span class="tw:block tw:pt-[3px] tw:text-[12px] tw:text-fn-text-muted">2.4 GB / 4 GB</span></span>
      </div>
      <FnProgress :percentage="60" label="旅行记录下载进度" />
      <div class="tw:mt-[12px] tw:flex tw:items-center tw:justify-between tw:gap-[8px]">
        <span role="status" class="tw:text-[12px] tw:text-fn-text-muted">{{ transferPaused ? '传输已暂停' : '模拟下载中' }}</span>
        <FnButton size="small" variant="text" @click="transferPaused = !transferPaused">{{ transferPaused ? '继续' : '暂停' }}</FnButton>
      </div>
    </article>

    <article class="tw:mb-[16px] tw:inline-block tw:w-full tw:break-inside-avoid tw:rounded-[10px] tw:border tw:border-solid tw:border-fn-border tw:bg-fn-container tw:p-[20px]">
      <div class="tw:mb-[16px] tw:flex tw:items-start tw:justify-between tw:gap-[12px]">
        <div><h3 class="tw:m-0 tw:text-[15px] tw:font-semibold">同步计划</h3><p class="tw:mt-[5px] tw:mb-0 tw:text-[13px] tw:text-fn-text-muted">选择要备份的内容</p></div>
        <FnIcon name="cloud-upload" :size="18" class="tw:text-fn-text-muted" />
      </div>
      <fieldset class="tw:m-0 tw:min-w-0 tw:border-0 tw:p-0">
        <legend class="tw:mb-[8px] tw:text-[13px] tw:font-medium">备份内容</legend>
        <FnCheckboxGroup v-model="syncFolders">
          <FnCheckbox value="photos">家庭相册</FnCheckbox>
          <FnCheckbox value="documents">工作文档</FnCheckbox>
          <FnCheckbox value="videos">影音收藏</FnCheckbox>
        </FnCheckboxGroup>
      </fieldset>
      <div class="tw:mt-[16px]">
        <FnSelect v-model="syncFrequency" label="同步频率" :options="frequencyOptions" />
      </div>
      <p role="status" class="tw:mt-[12px] tw:mb-0 tw:text-[12px] tw:text-fn-text-muted">已选择 {{ syncFolders.length }} 项，{{ frequencyOptions.find(item => item.value === syncFrequency)?.label }}同步</p>
    </article>

    <article class="tw:mb-[16px] tw:inline-block tw:w-full tw:break-inside-avoid tw:rounded-[10px] tw:border tw:border-solid tw:border-fn-border tw:bg-fn-container tw:p-[20px]">
      <div class="tw:mb-[16px] tw:flex tw:items-start tw:justify-between tw:gap-[12px]">
        <div><h3 class="tw:m-0 tw:text-[15px] tw:font-semibold">共享访问</h3><p class="tw:mt-[5px] tw:mb-0 tw:text-[13px] tw:text-fn-text-muted">家庭相册的访问权限</p></div>
        <FnTag tone="primary">共享中</FnTag>
      </div>
      <div class="tw:flex tw:items-center tw:justify-between tw:gap-[12px] tw:border-b tw:border-solid tw:border-fn-border tw:pb-[16px]">
        <span class="tw:text-[13px]">协作者</span>
        <FnAvatarGroup label="协作者" :max="3" :size="28" :items="collaborators" />
      </div>
      <fieldset class="tw:mt-[16px] tw:mb-0 tw:ml-0 tw:min-w-0 tw:border-0 tw:p-0">
        <legend class="tw:mb-[8px] tw:text-[13px] tw:font-medium">链接权限</legend>
        <FnRadioGroup v-model="sharePermission">
          <FnRadio value="read">仅查看</FnRadio>
          <FnRadio value="edit">可编辑</FnRadio>
        </FnRadioGroup>
      </fieldset>
      <div class="tw:mt-[14px]"><FnSelect v-model="shareExpiry" label="有效期" :options="expiryOptions" /></div>
      <p role="status" class="tw:mt-[12px] tw:mb-0 tw:text-[12px] tw:text-fn-text-muted">{{ sharePermission === 'read' ? '仅查看' : '可编辑' }}，{{ shareExpiry }} 天后失效</p>
    </article>

    <article class="tw:mb-[16px] tw:inline-block tw:w-full tw:break-inside-avoid tw:rounded-[10px] tw:border tw:border-solid tw:border-fn-border tw:bg-fn-container tw:p-[20px]">
      <div class="tw:mb-[16px] tw:flex tw:items-center tw:justify-between">
        <h3 class="tw:m-0 tw:text-[15px] tw:font-semibold">文件服务</h3>
        <FnBadge dot><FnIcon name="notification" :size="20" label="服务通知" class="tw:text-fn-text-muted" /></FnBadge>
      </div>
      <div class="tw:flex tw:items-center tw:justify-between tw:gap-[12px]">
        <div><span class="tw:block tw:text-[13px] tw:font-medium">SMB 文件共享</span><span class="tw:mt-[4px] tw:block tw:text-[12px] tw:text-fn-text-muted">供局域网设备访问</span></div>
        <FnSwitch v-model="fileService" :input-attrs="{ 'aria-label': 'SMB 文件共享' }" />
      </div>
      <div class="tw:mt-[16px]"><FnAlert :tone="fileService ? 'success' : 'warning'" :title="fileService ? '服务已开启' : '服务已关闭'">{{ fileService ? '局域网设备可以连接共享目录。' : '局域网设备暂时无法访问共享目录。' }}</FnAlert></div>
    </article>

    <article class="tw:mb-[16px] tw:inline-block tw:w-full tw:break-inside-avoid tw:rounded-[10px] tw:border tw:border-solid tw:border-fn-border tw:bg-fn-container tw:p-[20px]">
      <div class="tw:mb-[16px] tw:flex tw:items-center tw:justify-between tw:gap-[12px]"><h3 class="tw:m-0 tw:text-[15px] tw:font-semibold">回收站</h3><FnTag>{{ recycleCleared ? '已清理' : '待清理' }}</FnTag></div>
      <template v-if="!recycleCleared">
        <div class="tw:flex tw:items-center tw:gap-[10px] tw:rounded-[8px] tw:bg-fn-fill tw:p-[12px]">
          <FnCheckbox v-model="recycleSelected" label="选择旧备份" />
          <span class="tw:ml-auto tw:whitespace-nowrap tw:text-[12px] tw:text-fn-text-muted">1.2 GB</span>
        </div>
        <div class="tw:mt-[14px] tw:flex tw:items-center tw:justify-between tw:gap-[8px]">
          <span class="tw:text-[12px] tw:text-fn-text-muted">{{ recycleSelected ? '已选择 1 项' : '选择要清理的文件' }}</span>
          <FnButton size="small" variant="text" :disabled="!recycleSelected" @click="recycleCleared = true">模拟清理</FnButton>
        </div>
      </template>
      <FnAlert v-else title="演示文件已清理" tone="success">仅更新此处的预览状态。</FnAlert>
    </article>
  </div>
</template>

<style scoped>
.showcase-wall :deep(.fn-progress progress[value]) {
  appearance: none;
  height: 6px;
  border: 0;
  border-radius: 999px;
  overflow: hidden;
  background: var(--fn-border);
}
.showcase-wall :deep(.fn-progress progress[value]::-webkit-progress-bar) { background: var(--fn-border); }
.showcase-wall :deep(.fn-progress progress[value]::-webkit-progress-value) { background: var(--fn-progress-color); border-radius: 999px; }
.showcase-wall :deep(.fn-progress progress[value]::-moz-progress-bar) { background: var(--fn-progress-color); border-radius: 999px; }
</style>
