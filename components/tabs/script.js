import { Component, Vue, Prop, Emit } from "vue-property-decorator";

@Component
export default class Tabs extends Vue {
  @Prop({
    type: Array,
    default: () => []
  })
  tabs;

  @Prop({
    type: Number,
    default: 0
  })
  index;

  @Emit()
  change(index) {
    return index;
  }
}
