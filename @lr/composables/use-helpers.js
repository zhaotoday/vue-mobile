import helpers from "jt-helpers";
import { useConsts } from "@/composables/use-consts";

export const useHelpers = () => {
  const { API_URL, CDN_URL } = useConsts();

  return {
    ...helpers,
    getFileUrl({ id }) {
      return `${API_URL}/public/files/${id}`;
    },
    getImageUrl({ id, width, height }) {
      const params = (() => {
        switch (true) {
          case !!width && !!height:
            return `?imageView2/1/w/${width}/h/${height}/q/100`;

          case !!width:
            return `?imageView2/2/w/${width}/q/100`;

          case !!height:
            return `?imageView2/2/h/${height}/q/100`;

          default:
            return "";
        }
      })();

      return `${CDN_URL}/${id}${params}`;
    },
    async openDocument({
      serviceUrl = "https://view.officeapps.live.com/op/view.aspx?src=",
      url,
    }) {
      // #ifdef H5
      window.open(`${serviceUrl}${url}`);
      // #endif

      // #ifdef APP-PLUS
      uni.showLoading({
        title: "文件下载中...",
        mask: true,
      });

      const { tempFilePath } = await uni.downloadFile({ url });

      uni.hideLoading();

      uni.openDocument({ filePath: tempFilePath });
      // #endif
    },
    async navigateBack({ homePage } = {}) {
      const pages = getCurrentPages();

      if (pages.length > 1) {
        await uni.navigateBack();
      } else {
        await uni.switchTab({ url: homePage || "/pages/home/index" });
      }
    },
  };
};
