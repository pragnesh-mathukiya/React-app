export const EmailManagementMap = {
  GET_ALL_EMAIL_START: "GET_ALL_EMAIL_START",
  GET_ALL_EMAIL_SUCCESS: "GET_ALL_EMAIL_SUCCESS",
  GET_ALL_EMAIL_ERROR: "GET_ALL_EMAIL_ERROR",
  ADD_EMAIL_START: "ADD_EMAIL_START",
  ADD_EMAIL_SUCCESS: "ADD_EMAIL_SUCCESS",
  ADD_EMAIL_ERROR: "ADD_EMAIL_ERROR",
  SELECT_USER_DETAILS: "SELECT_USER_DETAILS",
  COUNTRY_FILTERS: "COUNTRY_FILTERS",
  APPLY_FILTERS: "APPLY_FILTERS",
  SEARCH_TEXT_CHANGE: "SEARCH_TEXT_CHANGE",
  REFRESH_EMAIL_LIST: "REFRESH_EMAIL_LIST",
  SET_EMAIL_BATCH_NUMBER: "SET_EMAIL_BATCH_NUMBER",
  SELECT_EMAIL_DETAILS: "SELECT_EMAIL_DETAILS",
  GET_ALL_TEMPLATES_START: "GET_ALL_TEMPLATES_START",
  GET_ALL_TEMPLATES_SUCCESS: "GET_ALL_TEMPLATES_SUCCESS",
  GET_ALL_TEMPLATES_ERROR: "GET_ALL_TEMPLATES_ERROR",
  UPDATE_EMAIL_START: "UPDATE_EMAIL_START",
  UPDATE_EMAIL_SUCCESS: "UPDATE_EMAIL_SUCCESS",
  UPDATE_EMAIL_ERROR: "UPDATE_EMAIL_ERROR",
  DELETE_EMAIL_START: "DELETE_EMAIL_START",
  DELETE_EMAIL_SUCCESS: "DELETE_EMAIL_SUCCESS",
  DELETE_EMAIL_ERROR: "DELETE_EMAIL_ERROR",
};

export const EmailManagementActions = {
  getAllEmailStart: (data) => ({
    type: EmailManagementMap.GET_ALL_EMAIL_START,
    payload: data,
  }),
  getAllEmailSuccess: (data) => ({
    type: EmailManagementMap.GET_ALL_EMAIL_SUCCESS,
    payload: data,
  }),
  getAllEmailError: (errors) => ({
    type: EmailManagementMap.GET_ALL_EMAIL_ERROR,
    payload: { errors },
  }),
  deleteEmailStart: (data) => ({
    type: EmailManagementMap.DELETE_EMAIL_START,
    payload: data,
  }),
  deleteEmailSuccess: (data) => ({
    type: EmailManagementMap.DELETE_EMAIL_SUCCESS,
    payload: data,
  }),
  deleteEmailError: (errors) => ({
    type: EmailManagementMap.DELETE_EMAIL_ERROR,
    payload: { errors },
  }),
  addEmailStart: (data) => ({
    type: EmailManagementMap.ADD_EMAIL_START,
    payload: data,
  }),
  addEmailSuccess: (data) => ({
    type: EmailManagementMap.ADD_EMAIL_SUCCESS,
    payload: data,
  }),
  addEmailError: (errors) => ({
    type: EmailManagementMap.ADD_EMAIL_ERROR,
    payload: { errors },
  }),
  updateEmailStart: (data) => ({
    type: EmailManagementMap.UPDATE_EMAIL_START,
    payload: data,
  }),
  updateEmailSuccess: (data) => ({
    type: EmailManagementMap.UPDATE_EMAIL_SUCCESS,
    payload: data,
  }),
  updateEmailError: (errors) => ({
    type: EmailManagementMap.UPDATE_EMAIL_ERROR,
    payload: { errors },
  }),
  getEmailTemplateStart: (data) => ({
    type: EmailManagementMap.GET_ALL_TEMPLATES_START,
    payload: data,
  }),
  getEmailTemplateSuccess: (data) => ({
    type: EmailManagementMap.GET_ALL_TEMPLATES_SUCCESS,
    payload: data,
  }),
  getEmailTemplateError: (errors) => ({
    type: EmailManagementMap.GET_ALL_TEMPLATES_ERROR,
    payload: { errors },
  }),
  applyFilters: (data) => ({
    type: EmailManagementMap.APPLY_FILTERS,
    payload: data,
  }),
  refreshEmailList: () => ({ type: EmailManagementMap.REFRESH_EMAIL_LIST }),
  searchTextChange: (data) => ({
    type: EmailManagementMap.SEARCH_TEXT_CHANGE,
    payload: data,
  }),
  setSelectedEmail: (data) => ({
    type: EmailManagementMap.SELECT_EMAIL_DETAILS,
    payload: data,
  }),
  setEmailBatchNumber: (data) => ({
    type: EmailManagementMap.SET_EMAIL_BATCH_NUMBER,
    payload: data,
  }),
};
