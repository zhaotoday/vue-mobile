import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Empty extends Vue {
  @Prop({
    type: String,
    default: "空空如也..."
  })
  tip;
}
