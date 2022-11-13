<template>
  <u-modal
    :show="cModal.visible"
    :show-cancel-button="true"
    :show-confirm-button="false"
    cancel-text="拒绝"
    @cancel="onCancel"
  >
    <div class="c-phone-number">
      <image
        class="c-phone-number__logo"
        mode="aspectFill"
        src="~@/static/logo.png"
      />
      <h2 class="fs24 u-tac u-lh1 u-pt20">FAIE 小程序</h2>
      <p class="fs26 u-tac u-lh1 u-pt40 u-pb10">
        为了更好地为你提供服务，请完成手机号绑定。
      </p>
      <u-button
        custom-class="u-mt20"
        type="primary"
        open-type="getPhoneNumber"
        @getphonenumber="onGetPhoneNumber"
      >
        绑定微信手机号
      </u-button>
    </div>
  </u-modal>
</template>

<script src="./script.js"></script>

<style lang="scss" src="./style.scss"></style>
