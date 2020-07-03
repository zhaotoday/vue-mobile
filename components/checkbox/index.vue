<template>
  <i
    class="c-checkbox c-iconfont"
    :class="
      checked
        ? ['c-iconfont--checkbox-checked', checkedClass]
        : ['c-iconfont--checkbox', normalClass]
    "
    @click.stop="$emit('change')"
  ></i>
</template>

<script src="./script.js"></script>
