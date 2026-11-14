# 应用导航 FnNavigation

组合应用导航项，在侧边栏与底部栏之间自适应。

## 使用说明

- 两个平台入口都导出 `FnNavigation`。Props：与 `FnMenu` 形状一致的 `items`、
  受控的 `modelValue`、必填的 `label`、`mode`（`sidebar` 或 `bottom`），以及
  正整数 `maxVisible`（默认 4）。侧边栏展示全部项。底部模式展示前
  `maxVisible` 项，并在还有更多项时显示“更多”按钮；更多按钮不计入该限制。
  `moreText` 与 `closeLabel` 覆盖本地化默认文案。
- 选择不同的启用项时依次触发 `update:modelValue` 和 `change`。父组件负责选中
  与路由，并可以拒绝请求。`item` 插槽接收 `{ item, active }`，且不能包含
  可交互元素。选择溢出项或更改外部选中值会关闭“更多”。
- “更多”使用 fnUI 底部抽屉及其浮层栈、Escape 处理和焦点恢复。当前项位于抽屉
  中时，“更多”按钮会高亮。它可以提供给任一 `FnLayout` 导航插槽；应用需为
  每个插槽选择匹配的模式。
- items 可以包含递归的 `children`、`href` 或 `to`。分支使用原生展开控件；
  `href` 叶子是普通链接。将 Vue Router 的 `RouterLink` 作为 `linkComponent`
  传入，可把 `to` 叶子渲染为路由链接。`autoOverflow` 使用 ResizeObserver
  测量项与“更多”的固有宽度，并以 `minItemWidth` 作为下限。item 插槽也会
  渲染在惰性测量容器中，因此它不能有副作用或重复 ID。不支持重新排序和
  以编程方式控制“更多”。仍需完成设备与辅助技术验收。

## 设计参考

- [TDesign 组件设计规范](https://tdesign.tencent.com/vue-next/components/overview)
