import { EmailManagementMap } from "./emailManagementAction";

const initialState = {
  isLoading: false,
  emailList: {},
  refreshEmailList: true,
  selectedEmail: null,
  searchBy: "",
  templates: [],
  searchText: "",
  skip: 0,
  limit: 10,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case EmailManagementMap.GET_ALL_EMAIL_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case EmailManagementMap.GET_ALL_EMAIL_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        emailList: action.payload,
        refreshEmailList: false,
      };
    }
    case EmailManagementMap.GET_ALL_EMAIL_ERROR: {
      return {
        ...state,
        isLoading: false,
        refreshEmailList: false,
      };
    }
    case EmailManagementMap.ADD_EMAIL_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case EmailManagementMap.ADD_EMAIL_SUCCESS: {
      return {
        ...state,
        refreshEmailList: true,
      };
    }
    case EmailManagementMap.ADD_EMAIL_ERROR: {
      return {
        ...state,
        isLoading: false,
        refreshEmailList: false,
      };
    }
    case EmailManagementMap.UPDATE_EMAIL_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case EmailManagementMap.UPDATE_EMAIL_SUCCESS: {
      return {
        ...state,
        refreshEmailList: true,
      };
    }
    case EmailManagementMap.UPDATE_EMAIL_ERROR: {
      return {
        ...state,
        isLoading: false,
        refreshEmailList: false,
      };
    }
    case EmailManagementMap.GET_ALL_TEMPLATES_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case EmailManagementMap.GET_ALL_TEMPLATES_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        templates: action.payload,
        refreshEmailList: true,
      };
    }
    case EmailManagementMap.GET_ALL_TEMPLATES_ERROR: {
      return {
        ...state,
        isLoading: false,
        templates: [],
        refreshEmailList: false,
      };
    }
    case EmailManagementMap.SELECT_EMAIL_DETAILS: {
      return {
        ...state,
        isLoading: false,
        selectedEmail: action.payload,
      };
    }
    case EmailManagementMap.SEARCH_TEXT_CHANGE: {
      return {
        ...state,
        searchText: action.payload,
      };
    }
    case EmailManagementMap.SET_EMAIL_BATCH_NUMBER: {
      return {
        ...state,
        skip: action.payload,
        refreshEmailList: true,
      };
    }
    case EmailManagementMap.REFRESH_EMAIL_LIST: {
      return {
        ...state,
        skip: 0,
        refreshEmailList: true,
      };
    }
    case EmailManagementMap.DELETE_EMAIL_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case EmailManagementMap.DELETE_EMAIL_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        refreshEmailList: true,
      };
    }
    case EmailManagementMap.DELETE_EMAIL_ERROR: {
      return {
        ...state,
        isLoading: false,
        refreshEmailList: false,
      };
    }
    default:
      return { ...state };
  }
};
