# 穿梭框 FnTransfer

在两个列表之间移动项目，完成批量分配。

## 使用说明

- `FnTransfer`：受控的 `modelValue` 是唯一字符串键数组，`items` 是
  `{ value, label, disabled? }` 数组，键唯一；`sourceLabel` 与 `targetLabel`
  为必填。每个启用项的按钮会立即请求移动该项，并依次触发
  `update:modelValue` 和 `change`。父组件可以拒绝请求；未知的已选键会保留。
  `disabled` 阻止所有移动。可选的 `searchable` 与 `sortable` 会为每个列表
  启用独立的本地标签过滤以及原始/升序/降序展示排序。过滤忽略大小写并去除
  首尾空白；排序不会修改 items 或选中值。`searchPlaceholder`、`sortLabel`
  与 `emptyText` 自定义本地化标签。可选的 `bulk` 会添加操作，移动当前可见的
  全部启用项；未知键和禁用项保持不变，源列表新增项按原始 items 顺序排列。
  `moveAllText` 与 `removeAllText` 自定义标签。可选的
  `virtual: { height, rowHeight, overscan? }` 限制每个列表渲染的项数；
  `rowHeight` 必须至少 44 像素，overscan 为非负整数。批量操作仍作用于所有
  过滤后的启用项。离屏控件会被卸载，因此键盘与辅助技术行为需要进一步设备
  测试。无插槽或暴露的 ref 方法；不支持自定义重排和异步加载。
- 这些是原生共享实现，不是完整的 TDesign API。

## 设计参考

- [TDesign 穿梭框 设计指南](https://tdesign.tencent.com/vue-next/components/transfer?tab=design)
