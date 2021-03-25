import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class CImage extends Vue {
  @Prop(String)
  src;

  get html() {
    return `<img src="${this.src}" />`;
  }
}
