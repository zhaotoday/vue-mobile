import { Component, Vue } from "vue-property-decorator";
import cities from "./cities";

@Component
export default class Index extends Vue {
  cities = cities;

  letters = [];

  cScroll = {
    intoView: ""
  };

  created() {
    this.letters = this.cities.cityGroups.map(item => item.initial);
  }

  scrollIntoView(item) {
    this.cScroll.intoView = item;
  }
}
