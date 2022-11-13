<template>
  <u-modal
    :show="cModal.visible"
    :show-cancel-button="true"
    cancel-text="拒绝"
    confirm-text="保存"
    @cancel="onCancel"
    @confirm="submit"
  >
    <div class="c-user-info">
      <image
        class="c-user-info__logo"
        mode="aspectFill"
        src="~@/static/logo.png"
      />
      <h2 class="fs24 u-tac u-lh1 u-pt20">FAIE 小程序</h2>
      <p class="fs26 u-tac u-lh1 u-pt40 u-pb40">
        请补充你的个人信息（头像、昵称）
      </p>
      <b-form ref="formRef" />
    </div>
  </u-modal>
</template>

<script src="./script.js"></script>

<style lang="scss" src="./style.scss"></style>
