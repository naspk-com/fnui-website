export interface Example {
  id: string
  title: string
  description: string
  source: string
}

const sources = import.meta.glob<string>('../examples/*.vue', { query: '?raw', import: 'default', eager: true })
const definitions: Record<string, { id: string; title: string; description: string }[]> = {
  button: [
    { id: 'button-basic', title: '基础用法', description: '使用主要按钮触发操作。' },
    { id: 'button-outline', title: '次要操作', description: '使用描边按钮降低操作的视觉层级。' },
    { id: 'button-disabled', title: '禁用状态', description: '使用 disabled 禁止操作。' },
    { id: 'button-loading', title: '加载状态', description: '操作进行时显示加载状态。' },
    { id: 'button-action', title: '处理操作', description: '通过点击事件响应用户操作。' },
    { id: 'button-size', title: '按钮尺寸', description: '小、中、大三种尺寸适配不同密度。' },
    { id: 'button-shape', title: '按钮形状', description: '支持矩形、圆角与圆形按钮。' },
    { id: 'button-icon', title: '带图标', description: '在按钮中组合图标与文字。' },
    { id: 'button-block', title: '通栏按钮', description: '使用 block 让按钮撑满容器宽度。' },
    { id: 'button-tones', title: '语义语气', description: '使用语气表达操作的性质与风险。' },
  ],
  input: [
    { id: 'input-basic', title: '输入与清除', description: '输入文本并使用清除按钮。' },
    { id: 'input-disabled', title: '禁用状态', description: '禁用输入框以阻止编辑。' },
    { id: 'input-password', title: '密码输入', description: '切换密码的显示与隐藏。' },
    { id: 'input-size', title: '输入框尺寸', description: '按场景选择不同的输入框尺寸。' },
    { id: 'input-status', title: '校验状态', description: '使用状态提示输入是否有效。' },
    { id: 'input-maxlength', title: '长度限制', description: '通过原生属性限制输入长度并展示计数。' },
  ],
  icon: [
    { id: 'icon-basic', title: '基础用法', description: '使用本地图标并设置尺寸。' },
    { id: 'icon-size-color', title: '尺寸与颜色', description: '调整图标大小与描边颜色。' },
    { id: 'icon-gallery', title: '图标集合', description: '浏览常用图标及其名称。' },
  ],
  textarea: [
    { id: 'textarea-basic', title: '基础用法', description: '输入多行文本。' },
    { id: 'textarea-maxlength', title: '长度限制', description: '限制输入长度并展示字符计数。' },
    { id: 'textarea-rows', title: '自定义行数', description: '通过原生 rows 调整文本域高度。' },
    { id: 'textarea-status', title: '错误状态', description: '使用错误状态说明输入问题。' },
  ],
  typography: [
    { id: 'typography-basic', title: '文本样式', description: '展示标题、可复制文本和多行省略。' },
    { id: 'typography-ellipsis', title: '单行与多行省略', description: '通过 ellipsis 限制显示行数。' },
    { id: 'typography-copy', title: '复制文本', description: '提供复制按钮复制路径或链接。' },
    { id: 'typography-editable', title: '就地编辑', description: '在文本位置完成标题的编辑与保存。' },
  ],
  checkbox: [
    { id: 'checkbox-basic', title: '基础用法', description: '使用复选框选择一项设置。' },
    { id: 'checkbox-disabled', title: '禁用状态', description: '禁用复选框以阻止修改。' },
    { id: 'checkbox-readonly', title: '只读状态', description: '只读复选框展示当前设置但不可更改。' },
  ],
  radio: [
    { id: 'radio-basic', title: '单选组', description: '从一组互斥选项中选择一项。' },
    { id: 'radio-disabled', title: '禁用选项', description: '禁用单个单选项而不影响其他选项。' },
    { id: 'radio-readonly', title: '只读状态', description: '只读单选项展示当前值。' },
  ],
  'input-number': [
    { id: 'input-number-basic', title: '基础用法', description: '设置数字的取值范围。' },
    { id: 'input-number-step', title: '自定义步长', description: '按小数步长增减并保留精度。' },
    { id: 'input-number-bounds', title: '范围限制', description: '通过 min 与 max 约束输入范围。' },
    { id: 'input-number-disabled', title: '禁用状态', description: '禁用数字输入框。' },
  ],
  'color-picker': [
    { id: 'color-picker-basic', title: '选取颜色', description: '从预设色板或取色器中选择颜色。' },
    { id: 'color-picker-swatches', title: '预设色板', description: '使用 swatches 提供常用颜色。' },
    { id: 'color-picker-alpha', title: '透明颜色', description: '选择带透明度的颜色值。' },
  ],
  'date-picker': [
    { id: 'date-picker-basic', title: '选择日期', description: '选择日期并使用快捷选项。' },
    { id: 'date-picker-range', title: '日期范围', description: '选择有效的起止日期范围。' },
    { id: 'date-picker-bounds', title: '可选范围', description: '通过 min 与 max 限制可选择日期。' },
    { id: 'date-picker-editable', title: '可编辑输入', description: '直接输入日期文本完成选择。' },
    { id: 'date-picker-disabled-value', title: '禁用部分日期', description: '通过 disabledValue 排除不可用日期。' },
  ],
  select: [
    { id: 'select-basic', title: '基础用法', description: '从选项中选择文件类型。' },
    { id: 'select-search', title: '搜索选项', description: '输入文字筛选候选项。' },
    { id: 'select-multiple', title: '多选', description: '选择多个文件类型。' },
    { id: 'select-disabled', title: '禁用状态', description: '禁用选择器阻止修改。' },
    { id: 'select-create', title: '创建选项', description: '搜索不到结果时创建新的选项。' },
    { id: 'select-remote', title: '远程搜索', description: '由父组件响应搜索并返回候选选项。' },
    { id: 'select-confirm', title: '确认提交', description: '使用确认模式批量提交多选结果。' },
  ],
  switch: [
    { id: 'switch-basic', title: '开关', description: '切换设置并读取当前状态。' },
    { id: 'switch-loading', title: '加载状态', description: '保存设置期间显示加载状态。' },
    { id: 'switch-disabled', title: '禁用状态', description: '禁用开关以阻止切换。' },
  ],
  slider: [
    { id: 'slider-basic', title: '基础用法', description: '拖动滑块调整数值。' },
    { id: 'slider-range', title: '范围选择', description: '同时调整区间的最小值与最大值。' },
    { id: 'slider-marks', title: '带刻度', description: '在轨道上标注关键刻度。' },
    { id: 'slider-vertical', title: '垂直方向', description: '使用垂直滑块适配音量等场景。' },
    { id: 'slider-disabled', title: '禁用状态', description: '禁用滑块阻止调整。' },
  ],
  rate: [
    { id: 'rate-basic', title: '基础用法', description: '选择评分，支持半星。' },
    { id: 'rate-clear', title: '允许清除', description: '再次点击已选星级清除评分。' },
    { id: 'rate-count', title: '自定义星级', description: '使用 10 星与半星表达更细的评分。' },
    { id: 'rate-disabled', title: '只读与禁用', description: '以只读或禁用状态展示评分。' },
  ],
  calendar: [
    { id: 'calendar-basic', title: '选择日期', description: '浏览月份并选择日期。' },
    { id: 'calendar-range', title: '日期范围', description: '在日历中选择起止日期。' },
    { id: 'calendar-multiple', title: '多选日期', description: '选择多个不连续的日期。' },
    { id: 'calendar-year', title: '年份视图', description: '从月份总览快速定位月份。' },
  ],
  avatar: [
    { id: 'avatar-basic', title: '文字头像', description: '使用文字作为头像内容。' },
    { id: 'avatar-image', title: '图片头像', description: '使用图片作为头像内容。' },
    { id: 'avatar-fallback', title: '加载失败回退', description: '图片不可用时回退为文字。' },
    { id: 'avatar-size', title: '头像尺寸', description: '按使用场景调整头像大小。' },
  ],
  'avatar-group': [
    { id: 'avatar-group-basic', title: '头像组', description: '并排展示成员，并在超出数量时折叠。' },
    { id: 'avatar-group-max', title: '限制展示数量', description: '通过 max 折叠超出的成员。' },
    { id: 'avatar-group-size', title: '统一尺寸', description: '为组内所有头像设置相同尺寸。' },
  ],
  alert: [
    { id: 'alert-basic', title: '基础用法', description: '展示一条状态提示。' },
    { id: 'alert-tones', title: '语义语气', description: '使用不同语气表达成功、警告与错误。' },
    { id: 'alert-closable', title: '可关闭', description: '关闭提示并支持重新显示。' },
  ],
  tag: [
    { id: 'tag-basic', title: '基础用法', description: '使用标签标识状态。' },
    { id: 'tag-closable', title: '可关闭', description: '关闭标签并响应事件。' },
    { id: 'tag-tones', title: '语义语气', description: '使用语气区分状态与分类。' },
    { id: 'tag-selectable', title: '可选择', description: '使用可选择标签作为筛选条件。' },
    { id: 'tag-disabled', title: '禁用状态', description: '展示不可操作的标签。' },
  ],
  badge: [
    { id: 'badge-basic', title: '数量与红点', description: '在图标上叠加数量或状态红点。' },
    { id: 'badge-dot', title: '红点提示', description: '使用红点提示有新内容。' },
    { id: 'badge-max', title: '封顶数字', description: '超过最大值时显示 max+。' },
  ],
  card: [
    { id: 'card-basic', title: '带操作卡片', description: '组合标题、内容和底部操作。' },
    { id: 'card-simple', title: '无标题卡片', description: '使用无标题卡片承载单一内容块。' },
    { id: 'card-actions', title: '多操作卡片', description: '在卡片底部放置多个操作按钮。' },
  ],
  progress: [
    { id: 'progress-basic', title: '基础用法', description: '使用百分比显示任务进度。' },
    { id: 'progress-striped', title: '条纹', description: '为进度条添加条纹。' },
    { id: 'progress-success', title: '完成状态', description: '使用成功状态表示任务完成。' },
    { id: 'progress-circle', title: '环形进度', description: '使用环形进度展示完成度。' },
    { id: 'progress-status', title: '状态进度', description: '区分进行中、警告、成功与失败。' },
    { id: 'progress-indeterminate', title: '不确定进度', description: '任务总量未知时展示等待动画。' },
  ],
  steps: [
    { id: 'steps-basic', title: '流程步骤', description: '展示当前步骤并允许点击切换。' },
    { id: 'steps-vertical', title: '垂直步骤', description: '垂直排列步骤，适合窄屏与长流程。' },
    { id: 'steps-status', title: '错误状态', description: '使用错误状态标记失败的步骤。' },
    { id: 'steps-clickable', title: '可点击步骤', description: '允许用户点击切换到其他步骤。' },
  ],
  collapse: [
    { id: 'collapse-basic', title: '折叠面板', description: '折叠多组设置内容。' },
    { id: 'collapse-accordion', title: '手风琴模式', description: '同一时间只展开一个面板。' },
    { id: 'collapse-disabled', title: '禁用面板', description: '禁用单个面板的展开操作。' },
    { id: 'collapse-animated', title: '动画与懒加载', description: '展开时播放动画并延迟渲染内容。' },
  ],
  descriptions: [
    { id: 'descriptions-basic', title: '描述列表', description: '以标签和值展示任务详情。' },
    { id: 'descriptions-title', title: '带标题', description: '为描述列表提供分组标题。' },
    { id: 'descriptions-custom', title: '自定义值', description: '通过插槽渲染标签等富内容。' },
  ],
  statistic: [
    { id: 'statistic-basic', title: '统计数值', description: '突出展示关键指标与单位。' },
    { id: 'statistic-unit', title: '带单位', description: '在数值后展示容量单位。' },
    { id: 'statistic-value', title: '多项指标', description: '并排展示多个统计指标。' },
  ],
  timeline: [
    { id: 'timeline-basic', title: '时间线', description: '按时间顺序展示操作记录。' },
    { id: 'timeline-custom', title: '自定义内容', description: '通过插槽渲染标题与描述。' },
    { id: 'timeline-status', title: '节点状态', description: '使用标签标注每个节点的执行结果。' },
  ],
  table: [
    { id: 'table-basic', title: '基础表格', description: '展示数据并支持行选择。' },
    { id: 'table-sort', title: '排序', description: '点击表头按列排序。' },
    { id: 'table-pagination', title: '分页', description: '在大量数据之间翻页。' },
    { id: 'table-expand', title: '树形展开', description: '展开行查看子级内容。' },
    { id: 'table-empty', title: '空数据', description: '没有数据时展示空状态说明。' },
  ],
  'data-view': [
    { id: 'data-view-basic', title: '数据视图', description: '展示可排序、可选择的数据表格。' },
    { id: 'data-view-list', title: '列表模式', description: '以列表形式展示同样的数据。' },
    { id: 'data-view-grid', title: '网格模式', description: '以网格形式展示数据项。' },
  ],
  tabs: [
    { id: 'tabs-basic', title: '切换标签', description: '使用受控值切换内容。' },
    { id: 'tabs-disabled', title: '禁用标签', description: '禁用单个标签页。' },
    { id: 'tabs-panel', title: '自定义面板', description: '在面板中渲染卡片等富内容。' },
    { id: 'tabs-many', title: '多个标签', description: '展示较多标签时的排列效果。' },
  ],
  dialog: [
    { id: 'dialog-basic', title: '确认操作', description: '在弹窗中确认用户操作。' },
    { id: 'dialog-sheet', title: '底部面板', description: '在移动端使用底部面板呈现操作。' },
    { id: 'dialog-fullscreen', title: '全屏对话框', description: '内容较多时使用全屏呈现。' },
    { id: 'dialog-loading', title: '异步确认', description: '确认操作提交期间显示加载状态。' },
  ],
  drawer: [
    { id: 'drawer-basic', title: '侧边抽屉', description: '从页面边缘滑出次级操作面板。' },
    { id: 'drawer-left', title: '左侧抽屉', description: '从左侧滑出详情面板。' },
    { id: 'drawer-bottom', title: '底部抽屉', description: '从底部滑出轻量操作面板。' },
    { id: 'drawer-size', title: '自定义尺寸', description: '通过 size 调整抽屉宽度。' },
  ],
  popup: [
    { id: 'popup-basic', title: '底部弹层', description: '从屏幕底部弹出轻量面板。' },
    { id: 'popup-top', title: '顶部弹层', description: '从屏幕顶部弹出提示面板。' },
    { id: 'popup-left', title: '左侧弹层', description: '从屏幕左侧弹出操作面板。' },
  ],
  popover: [
    { id: 'popover-basic', title: '气泡卡片', description: '围绕触发元素展示补充说明。' },
    { id: 'popover-hover', title: '悬停触发', description: '悬停时展开气泡内容。' },
    { id: 'popover-placement', title: '气泡位置', description: '在上方或右侧展示气泡。' },
  ],
  popconfirm: [
    { id: 'popconfirm-basic', title: '二次确认', description: '在气泡中确认高风险操作。' },
    { id: 'popconfirm-async', title: '异步确认', description: '等待服务端结果后再关闭。' },
    { id: 'popconfirm-placement', title: '气泡位置', description: '在触发元素右侧展示确认气泡。' },
  ],
  tooltip: [
    { id: 'tooltip-basic', title: '悬停提示', description: '悬停时显示简短说明。' },
    { id: 'tooltip-delay', title: '延迟显示', description: '设置打开与关闭的延迟时间。' },
    { id: 'tooltip-disabled', title: '禁用提示', description: '禁用后不再显示提示内容。' },
  ],
  guide: [
    { id: 'guide-basic', title: '分步引导', description: '按步骤介绍操作流程。' },
    { id: 'guide-overlay', title: '遮罩引导', description: '使用遮罩高亮目标区域。' },
    { id: 'guide-custom', title: '自定义步骤内容', description: '通过插槽渲染步骤标题与描述。' },
  ],
  toast: [
    { id: 'toast-basic', title: '基础用法', description: '通过 useFnToast 展示成功或错误提示。' },
    { id: 'toast-tone', title: '语义语气', description: '使用信息、成功、警告与错误语气。' },
    { id: 'toast-position', title: '显示位置', description: '在顶部、居中或底部展示提示。' },
    { id: 'toast-component', title: '组件形式', description: '使用受控的 FnToast 组件展示提示。' },
  ],
  notification: [
    { id: 'notification-basic', title: '基础用法', description: '通过 useFnNotification 发送通知卡片。' },
    { id: 'notification-tone', title: '显示位置', description: '在屏幕四个角落展示通知。' },
    { id: 'notification-actions', title: '操作按钮', description: '在通知中提供操作并响应用户选择。' },
    { id: 'notification-component', title: '组件形式', description: '使用受控的 FnNotification 组件。' },
  ],
  empty: [
    { id: 'empty-basic', title: '空状态', description: '说明当前状态并提供下一步操作。' },
    { id: 'empty-custom', title: '自定义插图', description: '使用插槽替换空状态插图。' },
    { id: 'empty-description', title: '带说明', description: '补充说明帮助用户理解空状态。' },
  ],
  loading: [
    { id: 'loading-basic', title: '加载中', description: '在内容加载期间展示等待指示。' },
    { id: 'loading-size', title: '不同尺寸', description: '按场景选择加载指示大小。' },
    { id: 'loading-plain', title: '独立使用', description: '在不包裹内容时独立展示加载状态。' },
  ],
  skeleton: [
    { id: 'skeleton-basic', title: '骨架屏', description: '用占位骨架保持布局稳定。' },
    { id: 'skeleton-avatar', title: '头像骨架', description: '为头像与昵称提供占位。' },
    { id: 'skeleton-text', title: '文本骨架', description: '为单行文本提供占位。' },
    { id: 'skeleton-animation', title: '动画效果', description: '切换骨架屏的动画方式。' },
  ],
  menu: [
    { id: 'menu-basic', title: '垂直菜单', description: '展示一组可切换的导航入口。' },
    { id: 'menu-disabled', title: '禁用菜单项', description: '禁用暂不可用的入口。' },
    { id: 'menu-item-slot', title: '自定义菜单项', description: '通过插槽渲染图标与状态。' },
  ],
  breadcrumb: [
    { id: 'breadcrumb-basic', title: '路径导航', description: '展示当前目录在层级中的位置。' },
    { id: 'breadcrumb-max', title: '折叠中间路径', description: '路径过长时折叠中间层级。' },
    { id: 'breadcrumb-disabled', title: '禁用路径', description: '禁用不可进入的路径。' },
  ],
  pagination: [
    { id: 'pagination-basic', title: '翻页', description: '在分页数据之间切换并调整每页条数。' },
    { id: 'pagination-size', title: '每页条数', description: '独立控制每页展示条数。' },
    { id: 'pagination-disabled', title: '禁用状态', description: '禁用分页组件。' },
  ],
  form: [
    { id: 'form-basic', title: '表单校验', description: '组合字段、校验规则和提交反馈。' },
    { id: 'form-async', title: '异步校验', description: '在校验函数中执行异步检查。' },
    { id: 'form-reset', title: '校验与重置', description: '校验表单并恢复初始值。' },
  ],
  tree: [
    { id: 'tree-basic', title: '级联选择', description: '选择目录及其子目录。' },
    { id: 'tree-search', title: '搜索节点', description: '输入关键字筛选树节点。' },
    { id: 'tree-multiple', title: '多选', description: '独立勾选多个节点。' },
    { id: 'tree-draggable', title: '拖拽排序', description: '拖动节点调整层级与顺序。' },
  ],
  segmented: [
    { id: 'segmented-basic', title: '分段控制', description: '在移动端切换互斥视图。' },
    { id: 'segmented-disabled', title: '禁用选项', description: '禁用单个分段选项。' },
    { id: 'segmented-slot', title: '自定义内容', description: '在分段选项中组合图标。' },
  ],
  navbar: [
    { id: 'navbar-basic', title: '顶部导航栏', description: '包含返回按钮和右侧操作。' },
    { id: 'navbar-no-back', title: '隐藏返回', description: '隐藏返回按钮并保留右侧操作。' },
    { id: 'navbar-title', title: '自定义标题', description: '通过插槽自定义标题内容。' },
  ],
  fab: [
    { id: 'fab-basic', title: '悬浮操作', description: '在内容上方提供主要操作入口。' },
    { id: 'fab-icon', title: '图标按钮', description: '使用图标作为悬浮按钮内容。' },
    { id: 'fab-disabled', title: '禁用状态', description: '在不可用时禁用悬浮按钮。' },
  ],
  'swipe-cell': [
    { id: 'swipe-cell-basic', title: '滑动操作', description: '滑动单元格显示共享与删除操作。' },
    { id: 'swipe-cell-left', title: '左右两侧操作', description: '左右滑动显示不同的操作。' },
    { id: 'swipe-cell-width', title: '自定义操作宽度', description: '通过 actionWidth 调整按钮宽度。' },
  ],
  layout: [
    { id: 'layout-basic', title: '侧边导航布局', description: '桌面固定侧边导航，移动端切换为底部标签栏。' },
    { id: 'layout-plain', title: '无导航布局', description: '适用于登录页与引导页等场景。' },
    { id: 'layout-sidebar', title: '固定侧边栏', description: '桌面端固定侧边导航。' },
  ],
  page: [
    { id: 'page-basic', title: '页面结构', description: '组织页面标题、内容与状态区域。' },
    { id: 'page-scroll-content', title: '内容区滚动', description: '让内容区独立滚动，标题保持可见。' },
    { id: 'page-padding-none', title: '自定义留白', description: '接管页面内边距，让背景铺满。' },
  ],
  'input-number-exact': [
    { id: 'input-number-exact-basic', title: '精确小数', description: '使用字符串保存高精度小数。' },
    { id: 'input-number-exact-step', title: '高精度步进', description: '按 0.0001 步长调整精确小数。' },
    { id: 'input-number-exact-bounds', title: '范围限制', description: '使用字符串边界约束高精度数值。' },
  ],
  'checkbox-group': [
    { id: 'checkbox-group-basic', title: '复选框组', description: '统一管理一组复选框的选中值。' },
    { id: 'checkbox-group-disabled', title: '禁用状态', description: '禁用整组复选框。' },
    { id: 'checkbox-group-all', title: '全选与半选', description: '使用全选控制整组选项。' },
  ],
  'radio-group': [
    { id: 'radio-group-basic', title: '单选框组', description: '在一组互斥选项中选择一项。' },
    { id: 'radio-group-disabled', title: '禁用状态', description: '禁用整组单选框。' },
    { id: 'radio-group-readonly', title: '只读状态', description: '只读展示当前选中的选项。' },
  ],
  'time-picker': [
    { id: 'time-picker-basic', title: '选择时间', description: '选择时间并读取结果。' },
    { id: 'time-picker-seconds', title: '秒级精度', description: '开启秒级时间选择。' },
    { id: 'time-picker-range', title: '时间范围', description: '选择有效的起止时间。' },
    { id: 'time-picker-shortcuts', title: '快捷选项', description: '使用常用时间作为快捷选择。' },
  ],
  cascader: [
    { id: 'cascader-basic', title: '逐级选择', description: '按层级选择目录路径。' },
    { id: 'cascader-searchable', title: '搜索路径', description: '搜索并直接定位目标目录。' },
    { id: 'cascader-multiple', title: '多选与级联', description: '批量勾选目录并联动子级。' },
    { id: 'cascader-clearable', title: '清除选择', description: '一键清除已选择的目录。' },
  ],
  'tree-select': [
    { id: 'tree-select-basic', title: '树形选择', description: '在下拉层中搜索并选择树节点。' },
    { id: 'tree-select-search', title: '搜索节点', description: '在下拉层中搜索目录并选择。' },
    { id: 'tree-select-multiple', title: '多选', description: '一次授权多个目录。' },
  ],
  transfer: [
    { id: 'transfer-basic', title: '穿梭选择', description: '在可选目录与已授权目录之间移动项目。' },
    { id: 'transfer-sortable', title: '排序', description: '按名称重新排列列表项。' },
    { id: 'transfer-disabled', title: '禁用状态', description: '禁用穿梭框阻止修改。' },
  ],
  image: [
    { id: 'image-basic', title: '图片预览', description: '展示图片并在点击后放大预览。' },
    { id: 'image-fallback', title: '加载失败回退', description: '图片不可用时展示备用图片。' },
    { id: 'image-no-preview', title: '仅展示', description: '关闭点击预览，只展示图片。' },
  ],
  'image-viewer': [
    { id: 'image-viewer-basic', title: '查看相册', description: '全屏浏览多张图片并切换。' },
    { id: 'image-viewer-gallery', title: '缩略图与滑动', description: '使用缩略图切换并支持滑动。' },
    { id: 'image-viewer-swipe', title: '手势滑动', description: '在 100% 缩放下左右滑动切换图片。' },
  ],
  comment: [
    { id: 'comment-basic', title: '评论列表', description: '展示作者、时间、内容与操作。' },
    { id: 'comment-plain', title: '纯文本评论', description: '不带头像的简洁评论。' },
    { id: 'comment-actions', title: '带操作', description: '在评论下方放置回复与引用操作。' },
  ],
  'qr-code': [
    { id: 'qr-code-basic', title: '生成二维码', description: '将共享链接编码为二维码。' },
    { id: 'qr-code-styled', title: '自定义样式', description: '调整二维码尺寸、容错级别与颜色。' },
    { id: 'qr-code-expired', title: '过期状态', description: '链接过期后刷新二维码。' },
  ],
  swiper: [
    { id: 'swiper-basic', title: '轮播内容', description: '在有限空间内切换多张卡片。' },
    { id: 'swiper-autoplay', title: '自动播放', description: '按固定间隔自动切换内容。' },
    { id: 'swiper-fade', title: '淡入淡出', description: '使用淡入淡出过渡切换内容。' },
    { id: 'swiper-loop', title: '循环播放', description: '在最后一页之后回到第一页。' },
  ],
  'side-bar': [
    { id: 'side-bar-basic', title: '侧边导航', description: '在页面侧边提供分区入口。' },
    { id: 'side-bar-disabled', title: '禁用入口', description: '禁用暂不可用的导航入口。' },
    { id: 'side-bar-item-slot', title: '自定义入口', description: '在入口中展示数量等附加信息。' },
  ],
  anchor: [
    { id: 'anchor-basic', title: '页面锚点', description: '跳转到页面中的内容分区。' },
    { id: 'anchor-multi', title: '多个锚点', description: '为一组内容分区提供导航。' },
    { id: 'anchor-wrap', title: '多项排列', description: '展示较多锚点时的自动换行效果。' },
  ],
  sticky: [
    { id: 'sticky-basic', title: '滚动吸顶', description: '滚动时让标题保持在顶部。' },
    { id: 'sticky-offset', title: '自定义偏移', description: '通过 offset 设置距顶部的距离。' },
    { id: 'sticky-nested', title: '多层吸顶', description: '让年份与月份标题依次吸顶。' },
  ],
  'form-item': [
    { id: 'form-item-basic', title: '字段与错误', description: '为单个字段提供标签、说明和错误提示。' },
    { id: 'form-item-validator', title: '自定义校验', description: '使用校验函数返回自定义错误信息。' },
    { id: 'form-item-no-label', title: '无标签字段', description: '省略标签，仅保留输入与错误提示。' },
  ],
  'file-upload': [
    { id: 'file-upload-basic', title: '上传队列', description: '选择文件并展示上传状态。' },
    { id: 'file-upload-single', title: '单文件上传', description: '限制一次只上传一个文件。' },
    { id: 'file-upload-limit', title: '数量与大小限制', description: '限制文件数量、类型与大小。' },
  ],
  'image-upload': [
    { id: 'image-upload-basic', title: '图片上传', description: '上传图片并预览缩略图。' },
    { id: 'image-upload-multiple', title: '多图上传', description: '一次选择并上传多张图片。' },
    { id: 'image-upload-drop', title: '拖放上传', description: '拖放图片到区域完成选择。' },
  ],
  'file-browser': [
    { id: 'file-browser-basic', title: '文件浏览', description: '浏览目录、文件与当前路径。' },
    { id: 'file-browser-grid', title: '网格视图', description: '使用网格模式浏览文件。' },
    { id: 'file-browser-loading', title: '加载状态', description: '加载目录内容时展示等待状态。' },
  ],
  'authorized-path-field': [
    { id: 'authorized-path-field-basic', title: '授权路径', description: '选择或清除已授权的目录。' },
    { id: 'authorized-path-selected', title: '已选路径', description: '展示已授权的目录路径。' },
    { id: 'authorized-path-disabled', title: '禁用状态', description: '禁用路径选择与清除操作。' },
  ],
  'authorization-panel': [
    { id: 'authorization-panel-basic', title: '授权列表', description: '查看并移除目录授权。' },
    { id: 'authorization-panel-empty', title: '空授权', description: '没有授权目录时展示空状态。' },
    { id: 'authorization-panel-disabled', title: '禁用状态', description: '以只读方式展示授权列表。' },
  ],
  'load-more': [
    { id: 'load-more-basic', title: '加载更多', description: '分批加载内容并在结束时提示。' },
    { id: 'load-more-auto', title: '自动加载', description: '滚动接近底部时自动加载。' },
    { id: 'load-more-error', title: '加载失败', description: '加载失败后提供重试入口。' },
  ],
  'tab-bar': [
    { id: 'tab-bar-text', title: '纯文本标签栏', description: '仅使用文字区分入口，适合入口含义明确的场景。' },
    { id: 'tab-bar-basic', title: '图标加文字标签栏', description: '图标辅助文字，帮助用户更快识别入口。' },
    { id: 'tab-bar-icon-only', title: '纯图标标签栏', description: '仅展示图标，配合 ariaLabel 保留可访问名称。' },
    { id: 'tab-bar-sub', title: '双层级标签栏', description: '为主入口提供二级标签，切换主入口时同步展示。' },
    { id: 'tab-bar-badge', title: '带徽标标签栏', description: '用数量、红点或文字提示入口的状态变化。' },
    { id: 'tab-bar-round', title: '悬浮胶囊标签栏', description: '使用 round 形态让标签栏悬浮于页面之上。' },
    { id: 'tab-bar-custom', title: '自定义样式', description: '通过 CSS 变量覆盖背景、文字与选中态颜色。' },
  ],
  navigation: [
    { id: 'navigation-basic', title: '应用导航', description: '在侧边栏与底部导航之间自适应。' },
    { id: 'navigation-bottom', title: '底部更多入口', description: '超过上限的入口收进更多面板。' },
    { id: 'navigation-many', title: '侧边多入口', description: '侧边栏展示全部导航入口。' },
  ],
  'action-sheet': [
    { id: 'action-sheet-basic', title: '动作面板', description: '从底部弹出操作列表。' },
    { id: 'action-sheet-children', title: '分组操作', description: '进入子级查看分组操作。' },
    { id: 'action-sheet-lazy', title: '异步加载操作', description: '展开时异步加载更多操作。' },
  ],
  'swipe-cell-group': [
    { id: 'swipe-cell-group-basic', title: '滑动单元格组', description: '同一组内只展开一个单元格。' },
    { id: 'swipe-cell-group-multi', title: '多行单元格', description: '组内多个单元格互斥展开。' },
    { id: 'swipe-cell-group-disabled', title: '禁用单元格', description: '组内禁用的单元格无法滑动。' },
  ],
  indexes: [
    { id: 'indexes-basic', title: '索引列表', description: '按索引快速定位列表分组。' },
    { id: 'indexes-track', title: '跟踪当前分组', description: '滚动时同步高亮当前索引。' },
    { id: 'indexes-unsorted', title: '原始顺序', description: '不排序时按传入顺序展示分组。' },
  ],
}

export function examplesFor(slug: string): Example[] {
  return (definitions[slug] ?? []).map(example => ({
    ...example,
    source: sources[`../examples/${example.id}.vue`] ?? '',
  }))
}
