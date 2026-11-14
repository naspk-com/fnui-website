# 评论 FnComment

展示作者、时间和内容组成的评论条目。

## 使用说明

- `FnComment`：Props 为 `author`（必填）、`datetime` 与 `content`；可选
  `avatar`、`content` 与 `actions` 插槽。它是语义化 article；调用方负责回复、
  日期、头像替代文本和所有操作。
- 这些组件在两个平台上都是纯展示组件。无事件或暴露的 ref 方法；不提供编辑、
  虚拟化、自动排序、日期/数字本地化以及完整的 TDesign API。

## 设计参考

- [TDesign 评论 设计指南](https://tdesign.tencent.com/vue-next/components/comment?tab=design)
