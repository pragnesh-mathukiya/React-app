export const SiteMap = {
  SITE_CONFIG_START: "SITE_CONFIG_START",
  SITE_CONFIG_SUCCESS: "SITE_CONFIG_SUCCESS",
  SITE_CONFIG_ERROR: "SITE_CONFIG_ERROR",
  GET_ALL_CONFIG_START: "GET_ALL_CONFIG_START",
  GET_ALL_CONFIG_SUCCESS: "GET_ALL_CONFIG_SUCCESS",
  GET_ALL_CONFIG_ERROR: "GET_ALL_CONFIG_ERROR",
};

export const SiteActions = {
  siteUpdateStart: () => ({ type: SiteMap.SITE_CONFIG_START }),
  siteUpdateSuccess: (data) => ({
    type: SiteMap.SITE_CONFIG_SUCCESS,
    payload: data,
  }),
  siteUpdateError: (errors) => ({
    type: SiteMap.SITE_CONFIG_ERROR,
    payload: { errors },
  }),
  siteGetDetailStart: (data) => ({
    type: SiteMap.GET_ALL_CONFIG_START,
    payload: data,
  }),
  siteGetDetailSuccess: (data) => ({
    type: SiteMap.GET_ALL_CONFIG_SUCCESS,
    payload: data,
  }),
  siteGetDetailError: (errors) => ({
    type: SiteMap.GET_ALL_CONFIG_ERROR,
    payload: { errors },
  }),
};
