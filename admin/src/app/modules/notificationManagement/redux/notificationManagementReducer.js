import { NotificationManagementMap } from "./notificationMangementAction";

const initialState = {
  isLoading: false,
  notificationList: {},
  refreshNotificationList: true,
  selectedNotification: null,
  searchBy: "createdAt",
  templates: [],
  searchText: "",
  skip: 0,
  limit: 3,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case NotificationManagementMap.GET_ALL_NOTIFICATION_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        notificationList: action.payload,
        refreshNotificationList: false,
      };
    }
    case NotificationManagementMap.GET_ALL_NOTIFICATION_START: {
      return {
        ...state,
        isLoading: false,
        refreshNotificationList: false,
      };
    }
    case NotificationManagementMap.ADD_NOTIFICATION_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case NotificationManagementMap.ADD_NOTIFICATION_SUCCESS: {
      return {
        ...state,
        refreshNotificationList: true,
      };
    }
    case NotificationManagementMap.ADD_NOTIFICATION_ERROR: {
      return {
        ...state,
        isLoading: false,
        refreshNotificationList: false,
      };
    }
    case NotificationManagementMap.UPDATE_NOTIFICATION_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case NotificationManagementMap.UPDATE_NOTIFICATION_SUCCESS: {
      return {
        ...state,
        refreshNotificationList: true,
        isLoading: false,
      };
    }
    case NotificationManagementMap.UPDATE_NOTIFICATION_ERROR: {
      return {
        ...state,
        isLoading: false,
        refreshNotificationList: false,
      };
    }
    case NotificationManagementMap.GET_ALL_TEMPLATES_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case NotificationManagementMap.GET_ALL_TEMPLATES_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        templates: action.payload,
        refreshNotificationList: true,
      };
    }
    case NotificationManagementMap.GET_ALL_TEMPLATES_ERROR: {
      return {
        ...state,
        isLoading: false,
        templates: [],
        refreshNotificationList: false,
      };
    }
    case NotificationManagementMap.SELECT_NOTIFICATION_DETAILS: {
      return {
        ...state,
        isLoading: false,
        selectedNotification: action.payload,
      };
    }
    case NotificationManagementMap.SEARCH_TEXT_CHANGE: {
      return {
        ...state,
        searchText: action.payload,
      };
    }
    case NotificationManagementMap.SET_NOTIFICATION_BATCH_NUMBER: {
      return {
        ...state,
        skip: action.payload,
        refreshNotificationList: true,
      };
    }
    case NotificationManagementMap.REFRESH_NOTIFICATION_LIST: {
      return {
        ...state,
        skip: 0,
        refreshNotificationList: true,
      };
    }
    case NotificationManagementMap.DELETE_EMAIL_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case NotificationManagementMap.DELETE_NOTIFICATION_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        refreshNotificationList: true,
      };
    }
    case NotificationManagementMap.DELETE_NOTIFICATION_ERROR: {
      return {
        ...state,
        isLoading: false,
        refreshNotificationList: false,
      };
    }
    default:
      return { ...state };
  }
};
