<template>
  <li class="c-form__item" :class="customClass">
    <label>{{ label }}</label>
    <slot name="default" />
    <slot name="append" />
  </li>
</template>

<script src="./script.js"></script>
