import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Poster extends Vue {
  @Prop({
    type: Boolean,
    default: false
  })
  visible;

  @Prop({
    type: String,
    default: ""
  })
  image;
}
