import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({
  props: {
    name: {
      type: String,
      default: ""
    }
  }
})
export default class Logo extends Vue {}
