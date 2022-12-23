<template>
  <div v-if="src" :class="customClass" :style="{ width, height }">
    <u-image
      :src="src"
      :mode="mode"
      :width="width"
      :height="height"
      :radius="radius"
      :fade="false"
    >
      <div
        slot="error"
        class="fs24 t-g6 u-tac"
        :style="{
          width,
          height,
          lineHeight: height,
          backgroundColor: '#f3f4f6',
        }"
      >
        {{ errorText }}
      </div>
      <div slot="loading" style="background-color: #f3f4f6"></div>
    </u-image>
  </div>
  <div
    v-else
    class="fs24 t-g6 u-tac"
    :class="customClass"
    :style="{
      width,
      height,
      lineHeight: height,
      backgroundColor: '#f3f4f6',
      borderRadius: radius,
    }"
  >
    {{ emptyText }}
  </div>
</template>

<script src="./script.js"></script>
