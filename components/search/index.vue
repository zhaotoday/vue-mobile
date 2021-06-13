<template>
  <div
    class="c-search bg-white"
    :class="{ 'has-submit': showSubmit }"
    @click="navigateToLink"
  >
    <div class="c-search__input-wrap bg-gray2">
      <div v-if="link" class="c-search__input fs28">
        <span v-if="value">
          {{ value }}
        </span>
        <span v-else class="t-placeholder">
          {{ placeholder }}
        </span>
      </div>
      <input
        v-else
        class="c-search__input fs28"
        placeholder-class="t-placeholder"
        :placeholder="placeholder"
        confirm-type="search"
        :auto-focus="autoFocus"
        v-model="value"
        @focus="$emit('focus')"
        @confirm="confirm"
      />
    </div>
    <div class="c-search__submit fs28" @click="confirm">搜索</div>
  </div>
</template>

<script src="./script.js"></script>

<style lang="scss" src="./style.scss"></style>
