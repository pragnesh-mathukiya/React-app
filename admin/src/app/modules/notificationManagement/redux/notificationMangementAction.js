export const NotificationManagementMap = {
  GET_ALL_NOTIFICATION_START: "GET_ALL_NOTIFICATION_START",
  GET_ALL_NOTIFICATION_SUCCESS: "GET_ALL_NOTIFICATION_SUCCESS",
  GET_ALL_NOTIFICATION_ERROR: "GET_ALL_NOTIFICATION_ERROR",
  ADD_NOTIFICATION_START: "ADD_NOTIFICATION_START",
  ADD_NOTIFICATION_SUCCESS: "ADD_NOTIFICATION_SUCCESS",
  ADD_NOTIFICATION_ERROR: "ADD_NOTIFICATION_ERROR",
  SELECT_NOTIFICATION_DETAILS: "SELECT_USER_DETAILS",
  COUNTRY_FILTERS: "COUNTRY_FILTERS",
  APPLY_FILTERS: "APPLY_FILTERS",
  SEARCH_TEXT_CHANGE: "SEARCH_TEXT_CHANGE",
  REFRESH_NOTIFICATION_LIST: "REFRESH_NOTIFICATION_LIST",
  SET_NOTIFICATION_BATCH_NUMBER: "SET_NOTIFICATION_BATCH_NUMBER",
  GET_ALL_TEMPLATES_START: "GET_ALL_TEMPLATES_START",
  GET_ALL_TEMPLATES_SUCCESS: "GET_ALL_TEMPLATES_SUCCESS",
  GET_ALL_TEMPLATES_ERROR: "GET_ALL_TEMPLATES_ERROR",
  UPDATE_NOTIFICATION_START: "UPDATE_NOTIFICATION_START",
  UPDATE_NOTIFICATION_SUCCESS: "UPDATE_NOTIFICATION_SUCCESS",
  UPDATE_NOTIFICATION_ERROR: "UPDATE_NOTIFICATION_ERROR",
  DELETE_NOTIFICATION_START: "DELETE_NOTIFICATION_START",
  DELETE_NOTIFICATION_SUCCESS: "DELETE_NOTIFICATION_SUCCESS",
  DELETE_NOTIFICATION_ERROR: "DELETE_NOTIFICATION_ERROR",
};

export const NotificationManagementActions = {
  getAllNotificationStart: (data) => ({
    type: NotificationManagementMap.GET_ALL_NOTIFICATION_START,
    payload: data,
  }),
  getAllNotificationSuccess: (data) => ({
    type: NotificationManagementMap.GET_ALL_NOTIFICATION_SUCCESS,
    payload: data,
  }),
  getAllNotificationError: (errors) => ({
    type: NotificationManagementMap.GET_ALL_NOTIFICATION_ERROR,
    payload: { errors },
  }),
  deleteNotificationStart: (data) => ({
    type: NotificationManagementMap.DELETE_NOTIFICATION_START,
    payload: data,
  }),
  deleteNotificationSuccess: (data) => ({
    type: NotificationManagementMap.DELETE_NOTIFICATION_SUCCESS,
    payload: data,
  }),
  deleteNotificationError: (errors) => ({
    type: NotificationManagementMap.DELETE_NOTIFICATION_ERROR,
    payload: { errors },
  }),
  addNotificationStart: (data) => ({
    type: NotificationManagementMap.ADD_NOTIFICATION_START,
    payload: data,
  }),
  addNotificationSuccess: (data) => ({
    type: NotificationManagementMap.ADD_NOTIFICATION_SUCCESS,
    payload: data,
  }),
  addNotificationError: (errors) => ({
    type: NotificationManagementMap.ADD_NOTIFICATION_ERROR,
    payload: { errors },
  }),
  updateNotificationStart: (data) => ({
    type: NotificationManagementMap.UPDATE_NOTIFICATION_START,
    payload: data,
  }),
  updateNotificationSuccess: (data) => ({
    type: NotificationManagementMap.UPDATE_NOTIFICATION_SUCCESS,
    payload: data,
  }),
  updateNotificationError: (errors) => ({
    type: NotificationManagementMap.UPDATE_NOTIFICATION_ERROR,
    payload: { errors },
  }),
  getNotificationTemplateStart: (data) => ({
    type: NotificationManagementMap.GET_ALL_TEMPLATES_START,
    payload: data,
  }),
  getNotificationTemplateSuccess: (data) => ({
    type: NotificationManagementMap.GET_ALL_TEMPLATES_SUCCESS,
    payload: data,
  }),
  getNotificationTemplateError: (errors) => ({
    type: NotificationManagementMap.GET_ALL_TEMPLATES_ERROR,
    payload: { errors },
  }),
  applyFilters: (data) => ({
    type: NotificationManagementMap.APPLY_FILTERS,
    payload: data,
  }),
  refreshNotificationList: () => ({
    type: NotificationManagementMap.REFRESH_NOTIFICATION_LIST,
  }),
  searchTextChange: (data) => ({
    type: NotificationManagementMap.SEARCH_TEXT_CHANGE,
    payload: data,
  }),
  setNotificationEmail: (data) => ({
    type: NotificationManagementMap.SELECT_NOTIFICATION_DETAILS,
    payload: data,
  }),
  setNotificationBatchNumber: (data) => ({
    type: NotificationManagementMap.SET_NOTIFICATION_BATCH_NUMBER,
    payload: data,
  }),
};
