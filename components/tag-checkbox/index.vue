<template>
  <div class="c-tag-checkbox">
    <div
      v-for="item in items"
      :key="item.value"
      class="c-tag h40 br8 fs24"
      :class="
        !checkable || checkedValues.includes(item.value)
          ? 'bg--primary bd--primary bg--primary c--white'
          : 'bd--gray7 c--gray7'
      "
      @click="check(item)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script src="./script.js"></script>

<style lang="scss" src="./style.scss"></style>
