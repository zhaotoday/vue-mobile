import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Dialog extends Vue {
  @Prop({
    type: Boolean,
    default: false
  })
  visible;

  @Prop({
    type: String,
    default: ""
  })
  title;

  @Prop({
    type: String,
    default: ""
  })
  content;

  @Prop({
    type: Boolean,
    default: true
  })
  showCancel;

  @Prop({
    type: Boolean,
    default: true
  })
  showConfirm;

  @Prop({
    type: String,
    default: "取消"
  })
  cancelText;

  @Prop({
    type: String,
    default: "确认"
  })
  confirmText;

  @Prop({
    type: String,
    default: ""
  })
  cancelStyle;

  @Prop({
    type: String,
    default: "c21"
  })
  confirmStyle;

  @Prop({
    type: Boolean,
    default: false
  })
  confirmDisabled;

  @Prop({
    type: String,
    default: "560"
  })
  width;

  handleConfirm() {
    !this.confirmDisabled && this.$emit("confirm");
  }
}
