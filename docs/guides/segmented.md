# 分段控制 FnSegmented

在移动端用分段控件切换互斥视图。

## 使用说明

- `FnSegmented`：受控的 `modelValue`（`string | 有限数值 | null`）、`items`
  （`{ value, label, disabled? }`，值唯一）、必填的 `label` 与 `disabled`。
  选择不同的启用项会依次触发 `update:modelValue` 和 `change`；父组件可以拒绝。
  `item` 插槽接收 `{ item, active }`。使用带标签的按钮组。方向键、Home 与
  End 会聚焦启用按钮并请求选择；父组件可以拒绝。它不管理面板，也不使用
  radio-group 语义。
- 这些是移动端入口组件，不暴露 ref 方法。它们不复制对应 TDesign 的完整 API。

## 设计参考

- [TDesign 分段控制 设计指南](https://tdesign.tencent.com/mobile-vue/components/segmented?tab=design)
