# 滑块 FnSlider

拖动滑块在连续区间内调整数值。

## 使用说明

- Props：受控的数值 `modelValue`、`min`、`max`、`step`、`disabled`，以及用于
  无障碍访问的 `label`。值、边界必须为有限数值，`min < max`、`step > 0`，
  且值必须位于边界内。
- 事件：用户输入时依次触发 `update:modelValue` 和 `change`。
- 插槽与 ref 方法：无。`disabled` 阻止输入；父组件持有值并可以拒绝变更。
- 可选的 `range` 使用受控的 `rangeValue`（`[lower, upper]`），两个端点必须是
  边界内有序的有限数值。两个分别标注的原生 range 控件会依次触发
  `update:rangeValue` 和 `range-change`；任一端点会被限制在另一端之内。
  `lowerText` 与 `upperText` 覆盖本地化端点标签。范围模式下 `modelValue`
  不生效。
- 可选的 `marks` 是边界内唯一的 `{ value, label }` 项，提供原生 datalist 刻度
  以及可见标签；调用方应避免标签过近而重叠。
- 可选的 `orientation="vertical"` 使用垂直原生 range 输入，并在旁边定位刻度。
  `showValue` 通过原生 title 显示数值。原生 change 事件会以当前接受的控制值
  触发 `change-end` 或 `range-change-end`；不保证这些事件仅对应指针拖拽结束。

## 设计参考

- [TDesign 滑块 设计指南](https://tdesign.tencent.com/vue-next/components/slider?tab=design)
