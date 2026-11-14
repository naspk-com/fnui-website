# 描述列表 FnDescriptions

以标签和值成对展示对象详情。

## 使用说明

- `FnDescriptions`：必填的 `items`，每项为 `{ label, value }` 字符串，另可选
  `title`。使用语义化描述列表。`value` 插槽接收 `{ item, index }` 以自定义值
  内容。
- 这些组件在两个平台上都是纯展示组件。无事件或暴露的 ref 方法；不提供编辑、
  虚拟化、自动排序、日期/数字本地化以及完整的 TDesign API。

## 设计参考

- [TDesign 描述列表 设计指南](https://tdesign.tencent.com/vue-next/components/descriptions?tab=design)
