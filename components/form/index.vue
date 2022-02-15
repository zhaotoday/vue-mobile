<template>
  <div :class="[$bem.box.$, customClass]">
    <ul class="c-form c-form--inbox has-label">
      <slot />
    </ul>
  </div>
</template>

<script src="./script.js"></script>
