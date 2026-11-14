# 头像组 FnAvatarGroup

并排展示多个头像，并在超出时显示剩余数量。

## 使用说明

- FnAvatarGroup：必填的 `items`，每项包含唯一的 `value` 和 `alt`，以及组的
  `label`。`max` 限制可见头像数量，剩余数量会被汇总；`remainingLabel`
  自定义其无障碍标签。`size` 应用于所有头像。每项可以指定 `src` 和回退
  文本 `text`。
- 这些组件在两个平台上共享 fnUI 原生标记。调用方提供的文本和图片替代内容
  不会自动翻译。

## 设计参考

- [TDesign 头像组 设计指南](https://tdesign.tencent.com/vue-next/components/avatar-group?tab=design)
