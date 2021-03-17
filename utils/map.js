import wx from "./wxb";

const url = "https://restapi.amap.com/v3";

export default {
  key: "",
  initialize({ key = "" } = {}) {
    this.key = key;
    return this;
  },
  getAddressByLatLng({ lat, lng }) {
    return wx.request({
      url: `${url}/geocode/regeo`,
      data: {
        key: this.key,
        output: "json",
        location: `${lng},${lat}`,
        radius: 1000,
        extensions: "addressComponent"
      }
    });
  }
};
