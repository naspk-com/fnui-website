<template>
  <div style="max-width: 460px; display: flex; flex-direction: column; gap: 12px">
    <FnAlert title="操作成功" tone="success">文件已移动到目标目录。</FnAlert>
    <FnAlert title="需要注意" tone="warning">剩余空间不足 10%，请及时清理。</FnAlert>
    <FnAlert title="同步失败" tone="danger">无法连接到远程存储，请检查网络。</FnAlert>
    <FnAlert title="提示" tone="primary">共享链接默认 7 天后失效。</FnAlert>
  </div>
</template>
