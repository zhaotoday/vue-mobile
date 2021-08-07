import wx from "wx-bridge";
import AsyncValidator from "async-validator";
import { reactive } from "@vue/composition-api";
import { onHide } from "uni-composition-api";

export const useCaptcha = ({
  sendCaptchaText = "获取验证码",
  model,
  rules,
  request,
}) => {
  const captcha = {
    timer: null,
    i: 0,
    leftSeconds: 120,
  };

  const cCaptcha = reactive({
    disabled: false,
    message: sendCaptchaText,
  });

  onHide(() => {
    captcha.i = 0;
    captcha.leftSeconds = 120;

    cCaptcha.disabled = false;
    cCaptcha.message = sendCaptchaText;

    clearInterval(captcha.timer);
  });

  const sendCaptcha = async () => {
    if (cCaptcha.disabled) return;

    await new AsyncValidator(rules()).validate(model(), async (errors) => {
      if (errors) {
        wx.showToast({ title: errors[0].message });
        return;
      }

      await request();

      wx.showToast({ title: "验证码获取成功" });

      captcha.i = 0;
      captcha.leftSeconds = 120;

      cCaptcha.disabled = true;
      cCaptcha.message = `${captcha.leftSeconds}s 后获取`;

      captcha.timer = setInterval(() => {
        cCaptcha.message = `${captcha.leftSeconds - ++captcha.i}s 后获取`;

        if (captcha.leftSeconds === captcha.i) {
          clearInterval(captcha.timer);

          cCaptcha.disabled = false;
          cCaptcha.message = sendCaptchaText;
        }
      }, 1000);
    });
  };

  return {
    cCaptcha,
    sendCaptcha,
  };
};
