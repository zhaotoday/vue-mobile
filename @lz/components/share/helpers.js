import jweixin from 'jweixin-module'

export const helpers = {
  share({ provider, scene, url, imageUrl, title, summary }) {
    const params = provider === "weixin" ? { type: 0, imageUrl } : { type: 1 };

    return new Promise(async (resolve, reject) => {
      // #ifdef APP-PLUS
      uni.share({
        provider,
        title,
        summary,
        scene,
        href: url,
        ...params,
        success: resolve,
        fail: reject
      });
      // #endif

      // #ifedf H5
      const shareOptions = {
        title,
        desc: summary,
        link: url,
        imgUrl: imageUrl
      };

      jweixin.onMenuShareAppMessage(shareOptions);
      jweixin.onMenuShareTimeline(shareOptions);
      // #end
    });
  }
};
