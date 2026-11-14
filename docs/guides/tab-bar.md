# 标签栏 FnTabBar

在移动端底部切换应用的主要页面。

## 使用说明

- Props：`items`（唯一的 `value`、`label`，可选 `disabled`）、受控的
  `modelValue`（`string | number | null`），以及必填的导航标签 `label`。
- 事件：激活不同的启用项时依次触发 `update:modelValue` 和 `change`。
  父组件持有选中值并负责路由。
- 插槽：`item`，接收 `item` 和 `active`；ref 方法：无。
- FnTabBar 还支持项上的 `icon`（fnUI 图标名）、`ariaLabel`、`badge`
  （`count`、`dot`、`max`）和 `subTabBar`，以及 `theme`（`normal` 或
  `tag`）、`shape`（`normal` 或 `round`）、`split`、`bordered`、`fixed`、
  `safeAreaInsetBottom` 和 `zIndex`。`fixed` 默认为 true，因此内联使用时应
  传入 `fixed: false`。颜色可通过 `--fn-tab-bar-*` CSS 变量覆盖。
- 桌面入口把 FnTabBar 渲染为居中的内联标签栏，忽略 `fixed`、
  `safeAreaInsetBottom` 与 `zIndex`；移动入口保持可固定在底部的形态。两端共享
  相同的 props、事件和插槽。
- 当前激活项声明了 `subTabBar` 时，会在标签栏下方渲染二级行，并触发
  `sub-change` 事件返回选中的值。默认选中第一个子项。
- 不支持：嵌套菜单、链接、路由集成和自动溢出。请在插槽中提供装饰性或带标签
  的图标。

## 设计参考

- [TDesign 标签栏 设计指南](https://tdesign.tencent.com/mobile-vue/components/tab-bar?tab=design)
