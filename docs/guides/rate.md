# 评分 FnRate

以星级表达评分，支持半星与清除。

## 使用说明

- Props：受控的 `modelValue`、`count`（1 到 20）、`disabled`、`readonly`、
  `allowHalf`、`allowClear`，以及用于无障碍访问的 `label`。值范围为 0 到
  `count`，步长为整数；启用 `allowHalf` 时支持半星。
- 事件：产生新评分时依次触发 `update:modelValue` 和 `change`。
- `icon` 插槽接收 `{ value, active, half }`；其内容是装饰性的，不能包含
  可交互子元素。ref 方法：无。`disabled` 与 `readonly` 阻止变更。
- `allowClear` 会在再次激活已选单选项时请求归零。两个平台都使用原生单选按钮。
  不支持 tooltip。

## 设计参考

- [TDesign 评分 设计指南](https://tdesign.tencent.com/vue-next/components/rate?tab=design)
