# 折叠面板 FnCollapse

折叠和展开多组内容，减少页面占用。

## 使用说明

- Props：受控的 `modelValue` 数组（项值唯一）、`items`（唯一的 `value`、
  `label`，可选 `disabled`）以及 `accordion`。
- 事件：用户切换某一项后依次触发 `update:modelValue` 和 `change`。
- 插槽：`content`，接收 `item`；ref 方法：无。禁用的项无法切换。
  手风琴模式最多允许一个展开值。
- 可选的 `lazy` 会把每项内容延迟到首次成功展开时渲染，并在关闭后保留。
  移除某项会重置该项状态。可选的 `animated` 会在展开时播放过渡，同时让关闭的
  内容保持 inert 并对辅助技术隐藏；减少动态效果偏好会禁用过渡。两个平台都使用
  原生按钮和带标签的区域。不支持嵌套的受管面板。

## 设计参考

- [TDesign 折叠面板 设计指南](https://tdesign.tencent.com/vue-next/components/collapse?tab=design)
