# 二维码 FnQRCode

将文本或链接编码为可扫描的二维码。

## 使用说明

- Props：必填的非空 `value`（最多 400 UTF-8 字节）、必填的无障碍标签
  `label`、`size`（80 到 600 的整数，默认 160），以及纠错级别 `level`
  （`L`、`M`、`Q`、`H`，默认 `M`）。
- 可选的 `color` 与 `background` 使用六位十六进制颜色。`logo` 是图片 URL；
  `logoSize` 必须为正数，且不超过 `size` 的四分之一。`status` 可为 `active`、
  `expired`、`loading` 或 `scanned`；过期状态会提供刷新按钮并触发 `refresh`。
- 暴露的 `toSvg()` 会在挂载后返回包含静默区的 SVG 标记；渲染前调用会抛错。
  Logo URL 仍是外部引用，导出的文件可能需要访问该资源。无插槽。厂商会渲染
  SVG，更改设置会重新生成二维码。
- 厂商在 setup 期间访问 `document`，因此 SSR 只渲染带标签的外层，客户端挂载后
  才生成 SVG。
- 不支持 canvas 和 PNG 导出。自定义颜色、Logo 和较低纠错级别可能降低扫码
  可靠性；请使用真实扫码器测试。除非应用明确允许，不要编码敏感信息。

## 设计参考

- [TDesign 二维码 设计指南](https://tdesign.tencent.com/vue-next/components/qr-code?tab=design)
