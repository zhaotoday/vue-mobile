<template>
  <c-form>
    <c-form-item label="头像">
      <div class="c-form__input">
        <button
          class="b-avatar u-ab0 bg-g1"
          open-type="chooseAvatar"
          @chooseavatar="onChooseAvatar"
        >
          <image :src="avatarUrl || defaultAvatar" mode="aspectFill" />
        </button>
      </div>
      <div v-if="cForm.errors.avatarFileId" class="c-form__error u-pt10">
        {{ cForm.errors.avatarFileId }}
      </div>
    </c-form-item>
    <c-form-item label="昵称">
      <input
        class="c-form__input"
        type="nickname"
        placeholder="请输入昵称"
        v-model.trim="cForm.model.name"
        @input="validate(cForm, 'name')"
        @change="onNickNameChange"
      />
      <div v-if="cForm.errors.name" class="c-form__error">
        {{ cForm.errors.name }}
      </div>
    </c-form-item>
  </c-form>
</template>

<script src="./script.js"></script>

<style lang="scss" src="./style.scss"></style>
