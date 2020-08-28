import { Component, Vue } from "vue-property-decorator";
import { mapActions, mapState } from "vuex";
import helpers from "jt-helpers";

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

  async _getUrl(options) {
    let url = "";
    let requiresAuth = false;

    if (typeof options === "string") {
      url = options;
    } else {
      url = options.url || "";
      requiresAuth = options.requiresAuth || false;
    }

    if (requiresAuth) await this.loggedIn();

    return url;
  }

  async navigateTo(options) {
    const url = await this._getUrl(options);

    if (url.indexOf("https://") !== -1 || url.indexOf("http://") !== -1) {
      // #ifdef APP-PLUS
      plus.runtime.openWeb(url);
      // #endif
      // #ifdef H5
      window.location.href = url;
      // #endif
    } else {
      this.$wx.navigateTo({ url });
    }
  }

  async switchTab(options) {
    const url = await this._getUrl(options);
    this.$wx.switchTab({ url });
  }

  async redirectTo(options) {
    const url = await this._getUrl(options);
    this.$wx.redirectTo({ url });
  }

  async reLaunch(options) {
    const url = await this._getUrl(options);
    this.$wx.reLaunch({ url });
  }

  navigateBack(delta = 1) {
    this.$wx.navigateBack({ delta });
  }

  loggedIn() {
    return new Promise(async (resolve, reject) => {
      if (!this.$auth.loggedIn()) {
        await this.$wx.navigateTo({
          url: this.$consts.LoginPage
        });
        reject();
      } else {
        const user = this.$auth.get()["user"];
        resolve({ user });
      }
    });
  }

  infoModified(from = "") {
    return new Promise(async (resolve, reject) => {
      if (!this.$auth.infoModified()) {
        await this.$wx.navigateTo({
          url: `${this.$consts.InfoPage}?from=${from}`
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
          url: this.$consts.PhoneNumberPage
        });
        reject();
      } else {
        const user = this.$auth.get()["user"];
        resolve({ user });
      }
    });
  }

  wrapHtml(html = "") {
    return html
      .replace(/\<img/gi, '<img style="max-width:100%;height:auto" ')
      .replace(
        new RegExp(`src="${this.$consts.ApiUrl}\/public\/files\/(\d+)"`, "gi"),
        `src="${this.$consts.CdnUrl}/$2?imageView2/0/w/750/q/100"`
      );
  }

  filterList(list, key) {
    return {
      ...list,
      items: list.items.filter(item => !!item[key])
    };
  }

  getFileUrl({ id }) {
    return `${this.$consts.ApiUrl}/public/files/${id}`;
  }

  getImageUrl({ id, width, height }) {
    let sizeParams = "";

    if (width && height) {
      sizeParams = `?imageView2/1/w/${width}/h/${height}/q/100`;
    } else if (width) {
      sizeParams = `?imageView2/2/w/${width}/q/100`;
    } else if (height) {
      sizeParams = `?imageView2/2/h/${height}/q/100`;
    }

    return `${this.$consts.CdnUrl}/${id}${sizeParams}`;
  }

  getItem(items, key, val) {
    return helpers.getItem(items, key, val);
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
