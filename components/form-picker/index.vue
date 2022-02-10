<template>
  <div>
    <picker
      :range="enums.map((item) => item.label)"
      @change="onChange"
    >
      <div
        v-if="enums.find((item) => item.value === value)"
        class="c-form__input"
      >
        {{ $helpers.getItem(enums, "value", value)["label"] || "" }}
      </div>
      <div v-else class="c-form__input t-placeholder">{{ placeholder }}</div>
    </picker>
    <div v-if="error" class="c-form__error">
      {{ error }}
    </div>
  </div>
</template>

<script src="./script.js"></script>
