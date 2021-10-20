import helpers from "jt-helpers";
import { useConsts } from "@/composables/use-consts";
import wx from "wx-bridge";

export const useHelpers = () => {
  const { ApiUrl, CdnUrl } = useConsts();

  return {
    ...helpers,
    getFileUrl({ id }) {
      return `${ApiUrl}/public/files/${id}`;
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

      return `${CdnUrl}/${id}${params}`;
    },
    async openDocument({ url }) {
      wx.showLoading({
        title: "文件下载中，请稍后...",
        mask: true,
      });

      const { tempFilePath } = await wx.downloadFile({ url });

      wx.hideLoading();

      // #ifdef H5
      wx.showToast({ title: "微信浏览器暂不支持打开该文档" });
      // #endif

      // #ifdef APP-PLUS
      wx.openDocument({ filePath: tempFilePath });
      // #endif
    },
  };
};
