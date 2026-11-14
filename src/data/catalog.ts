export interface ComponentEntry {
  name: string
  slug: string
  title: string
  group: string
  mobileOnly: boolean
  description: string
}

const groups: [string, string][] = [
  ['基础', 'Button:按钮 Icon:图标 Typography:文字 Layout:布局 Page:页面'],
  ['输入', 'Input:输入框 Textarea:多行输入 InputNumber:数字输入 InputNumberExact:精确数字 Checkbox:复选框 CheckboxGroup:复选框组 Radio:单选框 RadioGroup:单选框组 Switch:开关 Select:选择器 Slider:滑块 Rate:评分 ColorPicker:颜色选择'],
  ['日期与时间', 'DatePicker:日期选择 TimePicker:时间选择 Calendar:日历'],
  ['数据展示', 'Table:表格 DataView:数据视图 Tree:树形控件 Cascader:级联选择 TreeSelect:树选择 Transfer:穿梭框 Tabs:标签页 Tag:标签 Badge:徽标 Avatar:头像 AvatarGroup:头像组 Image:图片 ImageViewer:图片预览 Card:卡片 Descriptions:描述列表 Statistic:统计数值 Timeline:时间线 Comment:评论 QRCode:二维码 Progress:进度条 Steps:步骤条 Collapse:折叠面板 Swiper:轮播'],
  ['反馈与弹层', 'Dialog:对话框 Drawer:抽屉 Popup:弹出层 Popover:气泡卡片 Popconfirm:气泡确认 Tooltip:文字提示 Alert:提示 Toast:轻提示 Notification:通知 Empty:空状态 Loading:加载 Skeleton:骨架屏 Guide:引导'],
  ['导航', 'Navigation:应用导航 Menu:菜单 TabBar:标签栏 SideBar:侧边导航 Breadcrumb:面包屑 Pagination:分页 Anchor:锚点 Sticky:吸顶'],
  ['表单与文件', 'Form:表单 FormItem:表单项 FileUpload:文件上传 ImageUpload:图片上传 FileBrowser:文件浏览 AuthorizedPathField:授权路径 AuthorizationPanel:授权面板 LoadMore:加载更多'],
  ['移动端', 'Segmented:分段控制 Navbar:导航栏 Fab:悬浮按钮 ActionSheet:动作面板 SwipeCell:滑动单元格 SwipeCellGroup:滑动单元格组 Indexes:索引列表'],
]

export const groupDescriptions: Record<string, string> = {
  基础: '搭建页面骨架的基础组件，统一排版、图标与按钮操作的表达方式。',
  输入: '收集用户输入的表单控件，覆盖文本、数字、选择、开关与评分等场景。',
  日期与时间: '选择日期、时间或日期范围，支持受控值与快捷选项。',
  数据展示: '呈现文件、目录和统计信息的组件，帮助用户快速浏览与理解数据。',
  反馈与弹层: '在页面上提供状态反馈、空状态和浮层操作，保持交互清晰可预期。',
  导航: '在应用内移动与定位的组件，包含菜单、面包屑、分页和锚点。',
  表单与文件: '组合表单校验与文件处理流程，覆盖上传、浏览和授权路径。',
  移动端: '为小屏交互设计的移动端组件，适配触控、滑动手势与窄屏布局。',
}

const descriptions: Record<string, string> = {
  button: '触发操作或提交表单的按钮，支持多种语气、变体与加载状态。',
  icon: '使用内置图标集渲染可访问的 SVG 图标，并控制尺寸与颜色。',
  typography: '展示文本内容，支持省略、复制和就地编辑。',
  layout: '提供应用外壳与导航模式，在桌面侧边栏和移动端底部导航之间自动切换。',
  page: '组织页面标题、内容与状态区域的容器。',
  input: '输入单行文本，支持清除、禁用与不同校验状态。',
  textarea: '输入多行文本，适用于备注、说明等较长的内容。',
  'input-number': '输入受范围约束的数字，并提供步进控制。',
  'input-number-exact': '以高精度输入小数，避免浮点误差影响数值结果。',
  checkbox: '在一组选项中独立勾选一个或多个选项。',
  'checkbox-group': '管理一组复选框的选中值，统一处理禁用与只读状态。',
  radio: '在一组互斥选项中选择一个选项。',
  'radio-group': '管理一组单选框的选中值，并共享键盘导航行为。',
  switch: '在开启与关闭两种状态之间切换一项设置。',
  select: '从下拉列表中选择一项或多项，支持搜索筛选。',
  slider: '拖动滑块在连续区间内调整数值。',
  rate: '以星级表达评分，支持半星与清除。',
  'color-picker': '选择纯色、带透明度颜色或渐变颜色。',
  'date-picker': '选择日期或日期范围，支持快捷选项与禁用日期。',
  'time-picker': '选择时间或时间范围，支持秒级精度。',
  calendar: '按月浏览并选择日期，适合日程与文件时间筛选。',
  table: '以表格展示结构化数据，支持排序、选择、分页与树形展开。',
  'data-view': '在表格、列表与网格之间切换展示数据，共享排序与选择逻辑。',
  tree: '展示层级目录并支持勾选、级联与懒加载。',
  cascader: '逐级选择树形结构中的路径。',
  'tree-select': '在下拉弹层中浏览树形结构并选择节点。',
  transfer: '在两个列表之间移动项目，完成批量分配。',
  tabs: '在同一区域切换多组内容，保持上下文连续。',
  tag: '用简短标签标识状态、分类或筛选条件。',
  badge: '在图标或头像上叠加数量与红点提示。',
  avatar: '展示用户头像，加载失败时回退为文字。',
  'avatar-group': '并排展示多个头像，并在超出时显示剩余数量。',
  image: '展示图片，支持懒加载、加载失败回退与点击预览。',
  'image-viewer': '全屏查看图片，支持缩放、旋转、切换与手势操作。',
  card: '将相关内容和操作组织在一个可辨识的容器中。',
  descriptions: '以标签和值成对展示对象详情。',
  statistic: '突出展示单个统计数值及其单位。',
  timeline: '按时间顺序展示事件与变更记录。',
  comment: '展示作者、时间和内容组成的评论条目。',
  'qr-code': '将文本或链接编码为可扫描的二维码。',
  progress: '以进度条或环形图展示任务完成度。',
  steps: '展示流程的步骤与当前进度。',
  collapse: '折叠和展开多组内容，减少页面占用。',
  swiper: '在有限空间内轮播多张内容卡片。',
  dialog: '在页面中央弹出对话框，用于确认或补充信息。',
  drawer: '从屏幕边缘滑出面板，承载次级操作或详情。',
  popup: '从底部滑出的轻量弹层，适合移动端操作。',
  popover: '围绕触发元素展示气泡内容。',
  popconfirm: '在气泡中确认一项高风险操作。',
  tooltip: '悬停或聚焦时补充简短说明。',
  alert: '在页面内展示一条需要关注的状态信息。',
  toast: '在页面浮层短暂展示操作结果或提示，支持语气、位置与手动关闭。',
  notification: '在屏幕角落展示带标题、描述和操作的通知卡片，可选择停留时长。',
  empty: '在没有数据时说明当前状态并给出下一步操作。',
  loading: '在内容加载期间展示等待指示。',
  skeleton: '用占位骨架保持布局稳定，缓解加载跳动。',
  guide: '按步骤高亮界面元素，引导用户完成首次使用。',
  navigation: '组合应用导航项，在侧边栏与底部栏之间自适应。',
  menu: '展示一组垂直排列的导航入口。',
  'tab-bar': '在移动端底部切换应用的主要页面。',
  'side-bar': '在页面侧边提供分组导航。',
  breadcrumb: '展示当前页面在层级结构中的位置。',
  pagination: '在大量数据之间翻页，并调整每页条数。',
  anchor: '根据页面滚动定位到内容分区。',
  sticky: '让元素在滚动时保持吸顶可见。',
  form: '组织表单模型、校验规则与提交行为。',
  'form-item': '为单个字段提供标签、错误提示与无障碍关联。',
  'file-upload': '选择、拖放并上传文件，展示队列与失败重试。',
  'image-upload': '上传图片并预览缩略图。',
  'file-browser': '浏览目录与文件，并触发选择或导航操作。',
  'authorized-path-field': '选择经过授权的目录路径。',
  'authorization-panel': '集中管理应用可访问的目录授权。',
  'load-more': '滚动到底部或点击时继续加载更多内容。',
  segmented: '在移动端用分段控件切换互斥视图。',
  navbar: '移动端顶部导航栏，包含返回与操作区域。',
  fab: '悬浮在内容之上的主要操作入口。',
  'action-sheet': '从底部弹出的操作列表，支持分组与懒加载。',
  'swipe-cell': '左右滑动单元格以显示操作按钮。',
  'swipe-cell-group': '管理同一组滑动单元格，保证同时只展开一个。',
  indexes: '按字母或分组索引快速定位列表项。',
}

function slugify(value: string) {
  return value.replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2').replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

export const catalog: ComponentEntry[] = groups.flatMap(([group, values]) =>
  values.split(' ').map(value => {
    const [name, title] = value.split(':')
    const slug = slugify(name)
    return { name: `Fn${name}`, slug, title, group, mobileOnly: group === '移动端', description: descriptions[slug] ?? '' }
  }))
export const groupNames = groups.map(([group]) => group)

export function componentsInGroup(group: string) {
  return catalog.filter(item => item.group === group)
}
