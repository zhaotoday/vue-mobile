<template>
  <div
    class="c-checkbox"
    :class="{ 'is-checked': checked }"
    @click.stop="$emit('change')"
  ></div>
</template>

<script src="./script.js"></script>
