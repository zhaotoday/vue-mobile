import { reactive } from "@vue/composition-api";

export const usePagination = ({ pageSize = 10 } = {}) => {
  const cPagination = reactive({
    offset: 0,
    limit: pageSize,
    finished: false,
    lastPageItems: [],
  });

  const resetPagination = () => {
    cPagination.offset = 0;
    cPagination.limit = pageSize;
    cPagination.finished = false;
    cPagination.lastPageItems = [];
  };

  const setPagination = () => {
    return new Promise((resolve, reject) => {
      if (cPagination.lastPageItems.length > 0) {
        cPagination.offset += pageSize;
        resolve();
      } else {
        cPagination.finished = true;
        reject();
      }
    });
  };

  return {
    cPagination,
    resetPagination,
    setPagination,
  };
};
