import defaultAvatar from "../../../../../assets/images/components/avatar/default.png";
import { reactive } from "@vue/composition-api";
import { useValidators } from "vue-validation";
import { useConsts } from "@/composables/use-consts";
import { useUsers } from "../../../../composables/use-users";
import { usersApi } from "../../../../apis/client/users";

export default {
  setup() {
    const { ApiUrl } = useConsts();

    const { isRequired, validate } = useValidators();

    const { avatarUrl, getHeaders, getUserInfo } = useUsers();

    const cForm = reactive({
      model: {
        avatarFileId: "",
        name: "",
      },
      rules: {
        avatarFileId: [isRequired({ message: "请上传头像" })],
        name: [isRequired({ label: "昵称" })],
      },
      errors: {},
    });

    const initialize = async () => {
      const userInfoRes = await getUserInfo();

      cForm.model = {
        ...userInfoRes,
        avatarFileId: userInfoRes.avatarFileId
          ? userInfoRes.avatarFileId + ""
          : "",
      };
    };

    const onChooseAvatar = async (e) => {
      const { statusCode, data } = await uni.uploadFile({
        url: `${ApiUrl}/client/files/actions/upload`,
        header: getHeaders(),
        formData: { dir: "avatars" },
        filePath: e.detail.avatarUrl,
        name: "file",
      });

      const parsedData = JSON.parse(data);

      if (statusCode === 201) {
        await usersApi.post({
          action: "updateUserInfo",
          body: { avatarFileId: parsedData.data.id },
        });
        const { avatarFileId } = await getUserInfo();
        cForm.model.avatarFileId = avatarFileId + "";
        await validate(cForm, "avatarFileId");
      } else {
        await uni.showToast({ title: parsedData.error.message });
      }
    };

    const onNickNameChange = async (e) => {
      cForm.model.name = e.detail.value;
      await validate(cForm, "name");
    };

    const submit = async (cb) => {
      await validate(cForm, null, async (errors, model) => {
        if (errors) return;

        await usersApi.post({
          action: "updateUserInfo",
          body: model,
        });

        await getUserInfo();

        cb && cb();
      });
    };

    return {
      defaultAvatar,
      cForm,
      avatarUrl,
      validate,
      initialize,
      onChooseAvatar,
      onNickNameChange,
      submit,
    };
  },
};
