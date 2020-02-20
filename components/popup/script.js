import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({
  props: {
    visible: {
      type: Boolean,
      default: true
    }
  }
})
export default class Popup extends Vue {}
