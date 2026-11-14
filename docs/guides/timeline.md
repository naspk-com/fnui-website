# 时间线 FnTimeline

按时间顺序展示事件与变更记录。

## 使用说明

- `FnTimeline`：必填的 `items`，每项为 `{ title, description?, datetime? }`。
  按传入顺序渲染有序列表；`item` 插槽接收 `{ item, index }`。日期按原样显示，
  不会被解析。
- 这些组件在两个平台上都是纯展示组件。无事件或暴露的 ref 方法；不提供编辑、
  虚拟化、自动排序、日期/数字本地化以及完整的 TDesign API。

## 设计参考

- [TDesign 时间线 设计指南](https://tdesign.tencent.com/vue-next/components/timeline?tab=design)
