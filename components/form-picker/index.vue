<template>
  <div>
    <picker
      class="c-list__value"
      :range="enums.map((item) => item.label)"
      @change="$emit('change')"
    >
      <div v-if="value">
        {{ $helpers.getItem(range, "value", value)["label"] || "" }}
      </div>
      <div v-else class="t-placeholder">{{ placeholder }}</div>
    </picker>
    <div v-if="error" class="c-form__error">
      {{ error }}
    </div>
  </div>
</template>

<script src="./script.js"></script>
