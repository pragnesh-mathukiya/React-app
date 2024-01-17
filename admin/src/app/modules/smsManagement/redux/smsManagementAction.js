export const SmsManagementMap = {
  GET_ALL_SMS_START: "GET_ALL_SMS_START",
  GET_ALL_SMS_SUCCESS: "GET_ALL_SMS_SUCCESS",
  GET_ALL_SMS_ERROR: "GET_ALL_SMS_ERROR",
  ADD_SMS_START: "ADD_SMS_START",
  ADD_SMS_SUCCESS: "ADD_SMS_SUCCESS",
  ADD_SMS_ERROR: "ADD_SMS_ERROR",
  SELECT_USER_DETAILS: "SELECT_USER_DETAILS",
  COUNTRY_FILTERS: "COUNTRY_FILTERS",
  APPLY_FILTERS: "APPLY_FILTERS",
  SEARCH_TEXT_CHANGE: "SEARCH_TEXT_CHANGE",
  REFRESH_SMS_LIST: "REFRESH_SMS_LIST",
  SET_SMS_BATCH_NUMBER: "SET_SMS_BATCH_NUMBER",
  SELECT_SMS_DETAILS: "SELECT_SMS_DETAILS",
  GET_ALL_TEMPLATES_START: "GET_ALL_TEMPLATES_START",
  GET_ALL_TEMPLATES_SUCCESS: "GET_ALL_TEMPLATES_SUCCESS",
  GET_ALL_TEMPLATES_ERROR: "GET_ALL_TEMPLATES_ERROR",
  UPDATE_SMS_START: "UPDATE_SMS_START",
  UPDATE_SMS_SUCCESS: "UPDATE_SMS_SUCCESS",
  UPDATE_SMS_ERROR: "UPDATE_SMS_ERROR",
  DELETE_SMS_START: "DELETE_SMS_START",
  DELETE_SMS_SUCCESS: "DELETE_SMS_SUCCESS",
  DELETE_SMS_ERROR: "DELETE_SMS_ERROR",
};

export const SmsManagementActions = {
  getAllSmsStart: (data) => ({
    type: SmsManagementMap.GET_ALL_SMS_START,
    payload: data,
  }),
  getAllSmsSuccess: (data) => ({
    type: SmsManagementMap.GET_ALL_SMS_SUCCESS,
    payload: data,
  }),
  getAllSmsError: (errors) => ({
    type: SmsManagementMap.GET_ALL_SMS_ERROR,
    payload: { errors },
  }),
  deleteSmsStart: (data) => ({
    type: SmsManagementMap.DELETE_SMS_START,
    payload: data,
  }),
  deleteSmsSuccess: (data) => ({
    type: SmsManagementMap.DELETE_SMS_SUCCESS,
    payload: data,
  }),
  deleteSmsError: (errors) => ({
    type: SmsManagementMap.DELETE_SMS_ERROR,
    payload: { errors },
  }),
  addSmsStart: (data) => ({
    type: SmsManagementMap.ADD_SMS_START,
    payload: data,
  }),
  addSmsSuccess: (data) => ({
    type: SmsManagementMap.ADD_SMS_SUCCESS,
    payload: data,
  }),
  addSmsError: (errors) => ({
    type: SmsManagementMap.ADD_SMS_ERROR,
    payload: { errors },
  }),
  updateSmsStart: (data) => ({
    type: SmsManagementMap.UPDATE_SMS_START,
    payload: data,
  }),
  updateSmsSuccess: (data) => ({
    type: SmsManagementMap.UPDATE_SMS_SUCCESS,
    payload: data,
  }),
  updateSmsError: (errors) => ({
    type: SmsManagementMap.UPDATE_SMS_ERROR,
    payload: { errors },
  }),
  getSmsTemplateStart: (data) => ({
    type: SmsManagementMap.GET_ALL_TEMPLATES_START,
    payload: data,
  }),
  getSmsTemplateSuccess: (data) => ({
    type: SmsManagementMap.GET_ALL_TEMPLATES_SUCCESS,
    payload: data,
  }),
  getSmsTemplateError: (errors) => ({
    type: SmsManagementMap.GET_ALL_TEMPLATES_ERROR,
    payload: { errors },
  }),
  applyFilters: (data) => ({
    type: SmsManagementMap.APPLY_FILTERS,
    payload: data,
  }),
  refreshSmsList: () => ({ type: SmsManagementMap.REFRESH_SMS_LIST }),
  searchTextChange: (data) => ({
    type: SmsManagementMap.SEARCH_TEXT_CHANGE,
    payload: data,
  }),
  setSelectedSms: (data) => ({
    type: SmsManagementMap.SELECT_SMS_DETAILS,
    payload: data,
  }),
  setSmsBatchNumber: (data) => ({
    type: SmsManagementMap.SET_SMS_BATCH_NUMBER,
    payload: data,
  }),
};
