# 面包屑 FnBreadcrumb

展示当前页面在层级结构中的位置。

## 使用说明

- Props：`items`（唯一的 `value`、`label`，可选 `disabled`）和必填的导航
  标签 `label`。最后一项标识当前页面。
- 事件：激活时触发 `navigate`，携带被激活项的值。当前项或禁用项无法激活。
  插槽：`item`，接收 `item` 和 `current`；ref 方法：无。
- 可选的 `maxItems`（至少为 2）会保留首尾项，并把中间项放入由 `moreText`
  标注的原生 details 展开控件中。选择隐藏的启用项会触发 `navigate` 并关闭
  该展开控件。不支持：自动路由、href 链接以及转换为移动端 Navbar。

## 设计参考

- [TDesign 面包屑 设计指南](https://tdesign.tencent.com/vue-next/components/breadcrumb?tab=design)
