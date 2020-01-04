<template>
  <c-popup
    :visible="visible"
    @close="$emit('cancel')">
    <div slot="content">
      <div class="c-poster">
        <div class="c-close">
          <div
            class="c-close__trigger"
            @click="$emit('cancel')">
          </div>
        </div>
        <div class="c-poster__image bgc11">
          <img :src="image" />
        </div>
        <div
          class="c-button w260 h76 bg1 c11 fs30"
          @click="$emit('save')">
          <i class="c-icon c-icon--download"></i>
          保存图片
        </div>
      </div>
    </div>
  </c-popup>
</template>

<script src="./script.js"></script>
