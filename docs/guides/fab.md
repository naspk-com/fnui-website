# 悬浮按钮 FnFab

悬浮在内容之上的主要操作入口。

## 使用说明

- `FnFab`：必填的无障碍标签 `label`、`disabled`，默认插槽提供视觉内容；
  点击时携带原生鼠标事件触发 `click`。它保持在正常文档流中；定位、安全区域和
  内容重叠由应用决定。
- 这些是移动端入口组件，不暴露 ref 方法。它们不复制对应 TDesign 的完整 API。

## 设计参考

- [TDesign 悬浮按钮 设计指南](https://tdesign.tencent.com/mobile-vue/components/fab?tab=design)
