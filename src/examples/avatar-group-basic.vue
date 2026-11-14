<template>
  <div style="max-width: 420px">
    <FnAvatarGroup
      label="协作者"
      :max="3"
      :size="36"
      :items="[
        { value: 'lin', alt: '林岚', text: '林' },
        { value: 'chen', alt: '陈默', text: '陈' },
        { value: 'wang', alt: '王可', text: '王' },
        { value: 'zhao', alt: '赵一', text: '赵' },
        { value: 'liu', alt: '刘星', text: '刘' },
      ]"
    />
    <p>已为 5 位成员开放访问。</p>
  </div>
</template>
