import { SmsManagementMap } from "./smsManagementAction";

const initialState = {
  isLoading: false,
  smsList: {},
  refreshSmsList: true,
  selectedSms: null,
  searchBy: "",
  templates: [],
  searchText: "",
  skip: 0,
  limit: 10,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SmsManagementMap.GET_ALL_SMS_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case SmsManagementMap.GET_ALL_SMS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        smsList: action.payload,
        refreshSmsList: false,
      };
    }
    case SmsManagementMap.GET_ALL_SMS_ERROR: {
      return {
        ...state,
        isLoading: false,
        refreshSmsList: false,
      };
    }
    case SmsManagementMap.ADD_SMS_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case SmsManagementMap.ADD_SMS_SUCCESS: {
      return {
        ...state,
        refreshSmsList: true,
      };
    }
    case SmsManagementMap.ADD_SMS_ERROR: {
      return {
        ...state,
        isLoading: false,
        refreshSmsList: false,
      };
    }
    case SmsManagementMap.UPDATE_SMS_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case SmsManagementMap.UPDATE_SMS_SUCCESS: {
      return {
        ...state,
        refreshSmsList: true,
      };
    }
    case SmsManagementMap.UPDATE_SMS_ERROR: {
      return {
        ...state,
        isLoading: false,
        refreshSmsList: false,
      };
    }
    case SmsManagementMap.GET_ALL_TEMPLATES_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case SmsManagementMap.GET_ALL_TEMPLATES_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        templates: action.payload,
        refreshSmsList: true,
      };
    }
    case SmsManagementMap.GET_ALL_TEMPLATES_ERROR: {
      return {
        ...state,
        isLoading: false,
        templates: [],
        refreshSmsList: false,
      };
    }
    case SmsManagementMap.SELECT_SMS_DETAILS: {
      return {
        ...state,
        isLoading: false,
        selectedSms: action.payload,
      };
    }
    case SmsManagementMap.SEARCH_TEXT_CHANGE: {
      return {
        ...state,
        searchText: action.payload,
      };
    }
    case SmsManagementMap.SET_SMS_BATCH_NUMBER: {
      return {
        ...state,
        skip: action.payload,
        refreshSmsList: true,
      };
    }
    case SmsManagementMap.REFRESH_SMS_LIST: {
      return {
        ...state,
        skip: 0,
        refreshSmsList: true,
      };
    }
    case SmsManagementMap.DELETE_SMS_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case SmsManagementMap.DELETE_SMS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        refreshSmsList: true,
      };
    }
    case SmsManagementMap.DELETE_SMS_ERROR: {
      return {
        ...state,
        isLoading: false,
        refreshSmsList: false,
      };
    }
    default:
      return { ...state };
  }
};
