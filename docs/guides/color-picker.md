# 颜色选择 FnColorPicker

选择纯色、带透明度颜色或渐变颜色。

## 使用说明

- Props：受控的 `modelValue`（`#rrggbb`，小写）、必填的 `label`、`disabled`
  与 `readonly`。
- 事件：原生输入变化时依次触发 `update:modelValue` 和 `change`。被拒绝的更新
  会在下一个 Vue tick 恢复显示值。
- 插槽与暴露的 ref 方法：无。`disabled` 与 `readonly` 阻止更改。浏览器或
  操作系统拥有选择器界面；两个平台都使用相同的原生颜色输入，其行为取决于
  浏览器。
- 可选的 `swatches` 是唯一的、小写 `#rrggbb` 值数组。带标签的按钮会请求将
  受控值改为第一个颜色。
- `mode="alpha"` 使用小写 `#rrggbbaa`；`mode="gradient"` 使用
  `linear-gradient(90deg, #rrggbbaa 0%, #rrggbbaa 100%)`，角度为 0 到 359
  的整数，并包含两个可编辑的颜色/透明度停靠点。值受控，被拒绝的更新会恢复。
  不支持其他渐变形状、其他格式、空值以及 TDesign 的完整选择器 API。

## 设计参考

- [TDesign 颜色选择 设计指南](https://tdesign.tencent.com/vue-next/components/color-picker?tab=design)
