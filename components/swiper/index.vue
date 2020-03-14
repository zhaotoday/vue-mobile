<template>
  <div class="c-swiper">
    <swiper
      class="c-swiper__swiper"
      :circular="true"
      :autoplay="autoplay"
      :interval="interval"
      @change="handleChange"
      :style="style"
    >
      <swiper-item
        v-for="(item, index) in items"
        :key="index"
        :style="style"
      >
        <img
          class="c-swiper__image"
          mode="aspectFill"
          :src="item.image"
          :style="style"
          @click="navigateTo(item.url)"
        />
      </swiper-item>
    </swiper>
    <div class="cc-indicator">
      <span
        v-for="(item, index) in items.length"
        :key="index"
        class="cc-indicator__item"
        :class="{ 'is-active': index === current }"
      >
      </span>
    </div>
  </div>
</template>

<script src="./script.js"></script>
