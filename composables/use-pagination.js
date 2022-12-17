import { reactive } from "@vue/composition-api";

export const usePagination = ({ pageSize = 10, list, render } = {}) => {
  const cPagination = reactive({
    offset: 0,
    limit: pageSize,
    loading: false,
    finished: false,
    lastPageItems: [],
  });

  const resetPagination = () => {
    cPagination.offset = 0;
    cPagination.limit = pageSize;
    cPagination.loading = false;
    cPagination.finished = false;
    cPagination.lastPageItems = [];
  };

  const beforeRequest = () => {
    cPagination.loading = true;
  };

  const afterRequest = ({ items }) => {
    cPagination.loading = false;

    cPagination.lastPageItems = items;

    if (cPagination.offset) {
      list.value = {
        items: [...list.value.items, ...items],
      };
    } else {
      list.value = { items };
    }
  };

  const onScrollToLower = async () => {
    if (cPagination.lastPageItems.length === pageSize) {
      cPagination.offset += pageSize;
      await render();
    } else {
      cPagination.finished = true;
    }
  };

  return {
    cPagination,
    resetPagination,
    beforeRequest,
    afterRequest,
    onScrollToLower,
  };
};
