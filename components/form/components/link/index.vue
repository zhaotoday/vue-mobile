<template>
  <div @click="$emit('click')">
    <div v-if="label" class="c-form__input">
      {{ label }}
    </div>
    <div v-else class="c-form__input t-placeholder">{{ placeholder }}</div>
    <div v-if="error" class="c-form__error">
      {{ error }}
    </div>
  </div>
</template>

<script src="./script.js"></script>
