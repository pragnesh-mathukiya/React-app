import { SiteMap } from "./siteAction";

const initialState = {
  isLoading: false,
  cofigDetail: {},
  setDetail: {},
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SiteMap.SITE_CONFIG_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case SiteMap.SITE_CONFIG_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        setDetail: action.payload,
      };
    }
    case SiteMap.SITE_CONFIG_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case SiteMap.GET_ALL_CONFIG_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case SiteMap.GET_ALL_CONFIG_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        cofigDetail: action.payload,
      };
    }
    case SiteMap.GET_ALL_CONFIG_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    default:
      return { ...state };
  }
};
