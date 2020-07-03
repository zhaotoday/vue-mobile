<template>
  <i
    class="c-checkbox c-iconfont"
    :class="checked ? 'c-iconfont--checkbox-checked' : 'c-iconfont--checkbox'"
    @click.stop="$emit('change')"
  ></i>
</template>

<script src="./script.js"></script>
