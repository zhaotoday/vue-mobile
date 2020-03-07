import { Vue, Component } from "vue-property-decorator";

@Component
export default class Share extends Vue {
  cOptions = {
    visible: false
  };

  cPoster = {
    visible: false,
    image: ""
  };

  cPainter = {
    palette: {
      background: `${
        this.$consts.STATIC_URL
      }/components/share/poster.jpg?_t=${new Date().getTime()}`,
      width: "840px",
      height: "1308px",
      borderRadius: "0",
      views: [
        {
          type: "image",
          url: "",
          css: {
            right: "45px",
            top: "45px",
            width: "180px",
            height: "180px",
            shadow: "0 0 22px #888888"
          }
        }
      ]
    }
  };

  async init() {
    this.cPainter.palette.views[0].url = `${
      this.$consts.API_URL
    }/wx/apis/wxa?func=getWXACodeUnLimit&shareOpenId=${this.$auth.getOpenId()}`;
  }

  showOptions() {
    this.cOptions.visible = true;
  }

  showPoster() {
    this.cOptions.visible = false;
    this.cPoster.visible = true;
  }

  handlePainterImageOk(e) {
    this.cPoster.image = e.detail.path;
  }

  async savePosterImage() {
    this.$wx.showToast({
      icon: "loading",
      title: "加载中..."
    });

    await this.$wx.saveImageToPhotosAlbum({
      filePath: this.cPoster.image
    });

    this.$wx.showToast({
      icon: "success",
      title: "保存成功"
    });
  }
}
