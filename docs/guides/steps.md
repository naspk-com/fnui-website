# 步骤条 FnSteps

展示流程的步骤与当前进度。

## 使用说明

- Props：`items`（唯一的 `value` 与 `label`）、`current`（从 0 开始的索引）、
  `clickable`、`disabled` 与 `orientation`（`horizontal` 或 `vertical`）。
  超出 items 范围的 current 会被拒绝。
- 可点击时，选择不同步骤会依次触发 `update:current` 和 `change`；父组件持有
  `current`。ref 方法：无。插槽：`item`，接收 `item`、`index` 与 `state`
  （`complete`、`current`、`upcoming` 或 `error`）。
- 某项可选的 `status` 会覆盖其视觉状态；`current` 仍决定 `aria-current`。
  两个平台都使用语义化有序列表。不支持步骤内的进度展示。

## 设计参考

- [TDesign 步骤条 设计指南](https://tdesign.tencent.com/vue-next/components/steps?tab=design)
