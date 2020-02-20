import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({
  props: {
    checked: {
      type: Boolean,
      default: false
    }
  }
})
export default class Checkbox extends Vue {}
