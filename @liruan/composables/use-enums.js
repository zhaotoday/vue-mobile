import { store } from "@/store";
import { onMounted, computed } from "vue";

export const useEnums = () => {
  const enums = computed(() => store.state.enums.data);

  onMounted(async () => {
    await store.dispatch("enums/get");
  });

  return { enums };
};
