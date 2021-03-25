import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Popup extends Vue {
  @Prop({
    type: Boolean,
    default: true
  })
  visible;
}
