<template>
  <div style="max-width: 420px">
    <FnTypography as="h3">备份策略说明</FnTypography>
    <FnTypography copy-text="/vol2/Backup/Photos">/vol2/Backup/Photos</FnTypography>
    <FnTypography :ellipsis="2">
      每天凌晨自动同步家庭相册到备份目录，保留最近 10 个版本的快照。空间不足时会优先清理最旧的快照，并在完成后发送通知。
    </FnTypography>
  </div>
</template>
