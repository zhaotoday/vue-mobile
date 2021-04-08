<template>
  <picker
    class="c-list__value"
    mode="multiSelector"
    :range="range"
    :value="values"
    range-key="name"
    @change="onChange"
    @columnchange="onColumnChange"
  >
    <div v-if="!names" class="c37">{{ placeholder }}</div>
    <div v-else>{{ names }}</div>
  </picker>
</template>

<script src="./script.js"></script>
