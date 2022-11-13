<template>
  <div>
    <b-phone-number
      ref="phoneNumberRef"
      @ok="$emit('ok')"
      @show-user-info="showUserInfo"
    />
    <b-user-info ref="userInfoRef" @ok="$emit('ok')" />
  </div>
</template>

<script src="./script.js"></script>
