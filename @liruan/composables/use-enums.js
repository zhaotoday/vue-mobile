import { onMounted, computed } from "vue";
import { useStore } from "vuex";

export const useEnums = () => {
  const { state, dispatch } = useStore();

  const enums = computed(() => state.enums.data);

  onMounted(async () => {
    await dispatch("enums/get");
  });

  return { enums };
};
