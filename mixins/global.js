import { Vue, Component } from "vue-property-decorator";
import { mapActions, mapState } from "vuex";

@Component({
  computed: mapState(["user"]),
  methods: {
    ...mapActions({
      resetState: "resetState"
    })
  }
})
export default class GlobalMixin extends Vue {
  data() {
    return {
      $consts: this.$consts,
      loaded: false,
      query: {}
    };
  }

  onShow() {
    if (this.$auth.loggedIn()) {
      this.$store.dispatch("setUser", {
        user: this.$auth.get()["user"]
      });
    }
  }

  navigateTo(url) {
    this.$wx.navigateTo({ url });
  }

  switchTab(url) {
    this.$wx.switchTab({ url });
  }

  redirectTo(url) {
    this.$wx.redirectTo({ url });
  }

  reLaunch(url) {
    this.$wx.reLaunch({ url });
  }

  navigateBack(delta = 1) {
    this.$wx.navigateBack({ delta });
  }

  loggedIn() {
    return new Promise(async (resolve, reject) => {
      if (!this.$auth.loggedIn()) {
        await this.$wx.navigateTo({
          url: this.$consts.LOGIN_PAGE
        });
        reject();
      } else {
        const user = this.$auth.get()["user"];
        resolve({ user });
      }
    });
  }

  infoModified() {
    return new Promise(async (resolve, reject) => {
      if (!this.$auth.infoModified()) {
        await this.$wx.navigateTo({
          url: this.$consts.INFO_PAGE
        });
        reject();
      } else {
        const user = this.$auth.get()["user"];
        resolve({ user });
      }
    });
  }

  phoneNumberBound() {
    return new Promise(async (resolve, reject) => {
      if (!this.$auth.phoneNumberBound()) {
        await this.$wx.navigateTo({
          url: this.$consts.PHONE_NUMBER_PAGE
        });
        reject();
      } else {
        const user = this.$auth.get()["user"];
        resolve({ user });
      }
    });
  }

  wrapHTML(html) {
    return html.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
  }

  filterList(list, key) {
    return {
      ...list,
      items: list.items.filter(item => !!item[key])
    };
  }

  getFileURL({ id }) {
    return `${this.$consts.API_URL}/public/files/${id}`;
  }

  getImageURL({ id, width, height }) {
    let sizeParams = "";

    if (width && height) {
      sizeParams = `?imageView2/1/w/${width}/h/${height}/q/100`;
    } else if (width) {
      sizeParams = `?imageView2/2/w/${width}/q/100`;
    } else if (height) {
      sizeParams = `?imageView2/2/h/${height}/q/100`;
    }

    return `${this.$consts.CDN_URL}/${id}${sizeParams}`;
  }

  page(array, size) {
    const length = array.length;
    const newArray = [];
    const i = Math.ceil(length / size);

    let j = 0;

    while (j < i) {
      const spare = length - j * size >= size ? size : length - j * size;
      const temp = array.slice(j * size, j * size + spare);

      newArray.push(temp);
      j++;
    }

    return newArray;
  }
}
