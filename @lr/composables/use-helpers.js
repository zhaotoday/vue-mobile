import helpers from "jt-helpers";
import { useConsts } from "@/composables/use-consts";

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
          case width && height:
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
  };
};
