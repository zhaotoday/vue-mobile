import AsyncValidator from "async-validator";
import { reactive } from "@vue/composition-api";
import { onHide } from "uni-composition-api";

export const useCaptcha = ({
  sendCaptchaText = "获取验证码",
  sendCaptchaSuccessText = "验证码获取成功",
  waitText = "{seconds}s 后获取",
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
        uni.showToast({ title: errors[0].message });
        return;
      }

      await request();

      uni.showToast({ title: sendCaptchaSuccessText });

      captcha.i = 0;
      captcha.leftSeconds = 120;

      cCaptcha.disabled = true;
      cCaptcha.message = waitText.replace(
        "{seconds}",
        captcha.leftSeconds + ""
      );

      captcha.timer = setInterval(() => {
        cCaptcha.message = waitText.replace(
          "{seconds}",
          captcha.leftSeconds - ++captcha.i + ""
        );

        if (captcha.leftSeconds === captcha.i) {
          clearInterval(captcha.timer);

          cCaptcha.disabled = false;
          cCaptcha.message = sendCaptchaText;
        }
      }, 1000);
    });
  };

  return {
    captcha,
    cCaptcha,
    sendCaptcha,
  };
};
