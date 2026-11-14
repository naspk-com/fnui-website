# 进度条 FnProgress

以进度条或环形图展示任务完成度。

## 使用说明

- Props：`percentage`（0 到 100 的有限数值）、`label`、`showValue`、`variant`
  （`line` 或 `circle`）、`status`（`normal`、`success`、`warning`、`error`）、
  `striped`（仅线形）以及 `indeterminate`。不确定模式会省略原生 progress
  数值和数字说明。
- 事件、插槽与 ref 方法：无。0 和 100 都是有效值。
- 环形模式保留原生 progress 元素以提供无障碍语义；其动画遵循减少动态效果
  的系统偏好。

## 设计参考

- [TDesign 进度条 设计指南](https://tdesign.tencent.com/vue-next/components/progress?tab=design)
