const isPromise = (obj) =>
  !!obj &&
  (typeof obj === "object" || typeof obj === "function") &&
  typeof obj.then === "function";

uni.addInterceptor({
  returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise((resolve, reject) => {
      res.then((res) => {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  },
});

uni.addInterceptor("showToast", {
  invoke(args) {
    if (!args.icon) args.icon = "none";
  },
});

uni.addInterceptor("navigateTo", {
  invoke(args) {
    const url = args.url
      ? args.url
      : Object.keys(args)
          .filter((key) => !isNaN(Number(key, 10)))
          .map((key) => args[key])
          .join("");

    if (url.indexOf("https://") !== -1 || url.indexOf("http://") !== -1) {
      // #ifdef APP-PLUS
      plus.runtime.openWeb(url);
      // #endif
      // #ifdef H5
      window.location.href = url;
      // #endif
      return false;
    } else {
      if (args.animationType) args.animationType = "slide-in-right";

      if (args.animationDuration) args.animationDuration = 200;

      args.url = url;
    }
  },
});

["switchTab", "redirectTo", "reLaunch"].forEach((key) => {
  uni.addInterceptor(key, {
    invoke(args) {
      const url = args.url
        ? args.url
        : Object.keys(args)
            .filter((key) => !isNaN(Number(key, 10)))
            .map((key) => args[key])
            .join("");

      args.url = url;
    },
  });
});
