# 树形控件 FnTree

展示层级目录并支持勾选、级联与懒加载。

## 使用说明

- Props：`items` 使用相同的节点形状；受控的 `modelValue` 为单个键或 null；
  `label` 为导航区域提供标签；`expandText` 与 `collapseText` 为展开控件提供
  标签。
- 事件：选择不同的启用节点时依次触发 `update:modelValue` 和 `change`。
  分支展开是本地状态，不会改变选中值。
- 无插槽或 ref 方法。禁用节点无法选择或展开。父组件可以拒绝变更。使用嵌套
  列表和原生展开按钮，而不是 ARIA tree。方向键在可见的启用选择控件之间移动，
  并展开、收起或进入父节点；Home 与 End 移到第一个或最后一个可见启用控件。
- 可选的 `searchable` 会在本地过滤标签，并以扁平列表展示匹配路径，不暴露
  禁用节点的后代。`searchPlaceholder` 与 `emptyText` 覆盖本地化默认文案。
  清除搜索会恢复之前的展开状态。
- 可选的 `virtual: { height, rowHeight, overscan? }` 限制展开行和搜索结果的
  渲染数量；height 必须为正数，rowHeight 至少 44 像素，overscan 为非负整数。
  方向键、Home 与 End 导航可以跨窗口移动。离屏节点会被卸载；虚拟列表是扁平的，
  仍需浏览器与辅助技术测试。
- 可选的 `multiple` 使用原生复选框和独立的受控 `checkedValues`，依次触发
  `update:checkedValues` 和 `check-change`。值必须是唯一的字符串或有限数值；
  未知键会保留。勾选不级联。被拒绝的更新会恢复复选框状态。
- 懒加载、错误、缓存失效和仅搜索已加载节点的行为遵循上面的选择器契约。
  更改 items 或 loader 也会清除展开状态。
- 可选的 `expandedValues` 控制展开并依次触发 `update:expandedValues` 和
  `expand-change`。省略时使用本地展开；未知值会保留。初始展开的懒加载节点
  不会自动加载；用户必须收起再展开，或由调用方提供其子节点。
- 可选的 `cascade` 与 `multiple` 一起使用时，会选择或取消已加载的启用后代，
  并根据其启用子节点推导祖先的勾选与不确定状态。禁用子树和未知键保持不变。
  勾选的懒加载节点加载后，启用后代会被纳入受控勾选请求；父组件可以拒绝该
  请求。
- `draggable` 启用原生指针拖放，并触发 `move`，携带
  `{ source, target, position }`（`before`、`inside` 或 `after`）。调用方负责
  数据变更。禁用目标、拖到自身以及拖到后代上会被拒绝。暂不支持键盘和触摸拖拽
  替代方式以及虚拟滚动。

## 设计参考

- [TDesign 树形控件 设计指南](https://tdesign.tencent.com/vue-next/components/tree?tab=design)
