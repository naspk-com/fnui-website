# 通知 FnNotification

在屏幕角落展示带标题、描述和操作的通知卡片，可选择停留时长。

## 使用说明

- 一般场景使用 `useFnNotification()`；需要由页面状态完全控制时，使用
  `FnNotification` 组件并绑定 `v-model:visible`。
- 组合式 API：`notification.show({ title, message?, tone?, placement?, duration?,
  closable?, closeLabel?, actions?, onAction?, onClose? })` 返回
  `{ update, destroy }`；`notification.info/success/warning/error(title, options?)`
  为语气快捷方法；`notification.clear()` 清空全部通知。它们必须在
  `FnProvider` 内使用。
- FnNotification Props：受控的 `visible`、必填的 `title`、`message`、`tone`、
  `placement`（默认 `top-right`）、`duration`（默认 0）、`closable`
  （默认 true）、`closeLabel` 与 `actions`。事件：`update:visible`、`close`、
  `action`（携带被点击的操作项）。操作按钮只表达意图，不会自动关闭通知；
  父组件负责后续处理与可见性。
- 同一位置的多条通知会纵向堆叠；服务会在 `FnProvider` 卸载时清空。通知使用
  固定定位和 `z-index: 3100`。关闭按钮的默认文案为“关闭”，调用方应传入
  本地化文案。
- 不支持鼠标悬停暂停计时、队列限流与厂商特定的富文本内容；这些由调用方实现。

## 设计参考

- [TDesign 通知 设计指南](https://tdesign.tencent.com/vue-next/components/notification?tab=design)
