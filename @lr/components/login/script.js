import { useUsers } from "vue-mobile/@lr/composables/use-users";
import BPhoneNumber from "../phone-number";
import BUserInfo from "../user-info";

export default {
  components: {
    BPhoneNumber,
    BUserInfo,
  },
  emits: ["ok"],
  setup(props, context) {
    const { getUserInfo } = useUsers();

    const login = async () => {
      const { phoneNumber, name } = await getUserInfo();

      if (!phoneNumber) {
        context.refs.phoneNumberRef.show();
        return Promise.reject();
      } else if (!name) {
        context.refs.userInfoRef.show();
        return Promise.reject();
      } else {
        return Promise.resolve();
      }
    };

    const showUserInfo = () => {
      context.refs.userInfoRef.show();
    };

    return {
      login,
      showUserInfo,
    };
  },
};
