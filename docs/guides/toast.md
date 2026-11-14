# 轻提示 FnToast

在页面浮层短暂展示操作结果或提示，支持语气、位置与手动关闭。

## 使用说明

- 一般场景使用 `useFnToast()`；需要由页面状态完全控制时，使用 `FnToast`
  组件并绑定 `v-model:visible`。
- 组合式 API：`toast.show({ message, tone?, position?, duration?, closable?,
  closeLabel?, icon?, onClose? })` 返回 `{ update, destroy }`；
  `toast.info/success/warning/error(message, options?)` 为语气快捷方法；
  `toast.clear()` 清空全部提示。它们必须在 `FnProvider` 内使用。
- FnToast Props：受控的 `visible`、必填的 `message`、`tone`（默认 `info`）、
  `position`（`top`、`center`、`bottom`，默认 `top`）、以毫秒计的 `duration`
  （默认 3000，0 表示不自动关闭）、`closable`、`closeLabel` 与 `icon`。
  事件：自动或手动关闭时触发 `update:visible(false)` 与 `close`。
- 同一位置的多条提示会纵向堆叠；服务会在 `FnProvider` 卸载时清空。提示使用
  固定定位和 `z-index: 3100`。关闭按钮的默认文案为“关闭”，调用方应传入
  本地化文案。
- 不支持鼠标悬停暂停计时、队列限流与厂商特定的富文本内容；这些由调用方实现。

## 设计参考

- [TDesign 轻提示 设计指南](https://tdesign.tencent.com/vue-next/components/toast?tab=design)
