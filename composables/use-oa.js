import qs from "query-string";

const { _, code } = qs.parse(window.location.search);

export const useOa = () => {
  const parseUrl = () => {
    return {
      _,
      code,
      page: window.location.hash.substr(1),
      wxJsSdkUrl: location.href.split("#")[0]
    };
  };

  return {
    parseUrl
  };
};
