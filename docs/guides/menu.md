# 菜单 FnMenu

展示一组垂直排列的导航入口。

## 使用说明

- Props：`items`（唯一的 `value`、`label`，可选 `disabled`）、受控的
  `modelValue`（`string | number | null`），以及必填的导航标签 `label`。
- 事件：激活不同的启用项时依次触发 `update:modelValue` 和 `change`。
  父组件持有选中值并负责路由。
- 插槽：`item`，接收 `item` 和 `active`；ref 方法：无。
- Menu 与 SideBar 是语义化导航按钮的不同视觉排列，选中项带有
  `aria-current`。它们不会根据屏幕宽度自动改变语义。
- 不支持：嵌套菜单、链接、路由集成和自动溢出。请在插槽中提供装饰性或带标签
  的图标。

## 设计参考

- [TDesign 菜单 设计指南](https://tdesign.tencent.com/vue-next/components/menu?tab=design)
