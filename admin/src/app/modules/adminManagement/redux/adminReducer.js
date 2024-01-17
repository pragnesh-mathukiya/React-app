import { adminMap } from "./adminAction";

const initialState = {
  isLoading: false,
  refreshSubAdminList: true,
  searchBy: "",
  subAdminList: {},
  searchText: "",
  searchStatus: "",
  skip: 0,
  subAdminSkip: 0,
  subAdminLimit: 10,
  column: "",
  dir: "",
  limit: 10,
  selectedSubAdmin: {},
  createSubAdminModal: false,
  rolePermissionList: {},
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case adminMap.GET_ADD_ADMIN_START: {
      return {
        ...state,
        isSubAdminLoading: true,
      };
    }
    case adminMap.GET_ADD_ADMIN_SUCCESS: {
      return {
        ...state,
        refreshSubAdminList: false,
        isSubAdminLoading: false,
        subAdminList: action.payload,
      };
    }
    case adminMap.GET_ADD_ADMIN_ERROR: {
      return {
        ...state,
        refreshSubAdminList: false,
        isSubAdminLoading: false,
        subAdminList: {},
      };
    }
    case adminMap.SET_ADD_ADMIN_BATCH_NUMBER: {
      return {
        ...state,
        subAdminSkip: action.payload,
        refreshSubAdminList: true,
      };
    }
    case adminMap.SET_SELECTED_ADD_ADMIN: {
      return {
        ...state,
        selectedSubAdmin: action.payload,
      };
    }

    case adminMap.UPDATE_ADD_ADMIN_START: {
      return {
        ...state,
        isSubAdminLoading: true,
      };
    }
    case adminMap.UPDATE_ADD_ADMIN_SUCCESS: {
      return {
        ...state,
        isSubAdminLoading: false,
        refreshSubAdminList: true,
      };
    }
    case adminMap.UPDATE_ADD_ADMIN_ERROR: {
      return {
        ...state,
        isSubAdminLoading: false,
        refreshSubAdminList: false,
      };
    }
    case adminMap.DELETE_ADD_ADMIN_START: {
      return {
        ...state,
        isSubAdminLoading: true,
      };
    }
    case adminMap.DELETE_ADD_ADMIN_SUCCESS: {
      return {
        ...state,
        isSubAdminLoading: false,
        refreshSubAdminList: true,
      };
    }
    case adminMap.DELETE_ADD_ADMIN_ERROR: {
      return {
        ...state,
        isSubAdminLoading: false,
        refreshSubAdminList: false,
      };
    }
    case adminMap.ADD_ADD_ADMIN_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case adminMap.ADD_ADD_ADMIN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        refreshSubAdminList: true,
      };
    }
    case adminMap.ADD_ADD_ADMIN_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case adminMap.CREATE_ADD_ADMIN_MANAGEMENT_CLOSE: {
      return {
        ...state,
        createSubAdminModal: false,
      };
    }
    case adminMap.CREATE_ADD_ADMIN_MANAGEMENT_SHOW: {
      return {
        ...state,
        createSubAdminModal: true,
      };
    }
    case adminMap.SEARCH_TEXT_CHANGE: {
      return {
        ...state,
        searchText: action.payload,
        refreshSubAdminList: true,
      };
    }
    case adminMap.GET_ROLE_PERMISSION_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case adminMap.GET_ROLE_PERMISSION_SUCCESS: {
      return {
        ...state,
        refreshSubAdminList: false,
        isLoading: false,
        rolePermissionList: action.payload,
      };
    }
    case adminMap.GET_ROLE_PERMISSION_ERROR: {
      return {
        ...state,
        refreshSubAdminList: false,
        isLoading: false,
        rolePermissionList: {},
      };
    }
    case adminMap.GET_ADMIN_DETAIL_START: {
      return {
        ...state,
        isSubAdminLoading: true,
      };
    }
    case adminMap.GET_ADMIN_DETAIL_SUCCESS: {
      return {
        ...state,
        isSubAdminLoading: false,
        selectedSubAdmin: action.payload,
      };
    }
    case adminMap.GET_ADMIN_DETAIL_ERROR: {
      return {
        ...state,
        isSubAdminLoading: false,
      };
    }
    default:
      return { ...state };
  }
};
