# 导航栏 FnNavbar

移动端顶部导航栏，包含返回与操作区域。

## 使用说明

- `FnNavbar`：必填的 `title`、`showBack`（默认 true）、`backLabel`、
  `backDisabled`；`back` 仅表达意图，不会改变浏览器历史。可选 `title` 与
  `actions` 插槽；操作区必须自行提供标签。
- 这些是移动端入口组件，不暴露 ref 方法。它们不复制对应 TDesign 的完整 API。

## 设计参考

- [TDesign 导航栏 设计指南](https://tdesign.tencent.com/mobile-vue/components/navbar?tab=design)
