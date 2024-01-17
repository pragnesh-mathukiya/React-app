export const faq_managementMap = {
  GET_FAQ_START: "GET_FAQ_START",
  GET_FAQ_SUCCESS: "GET_FAQ_SUCCESS",
  GET_FAQ_ERROR: "GET_FAQ_ERROR",
  SET_SELECTED_FAQ: "SET_SELECTED_FAQ",
  SET_FAQ_BATCH_NUMBER: "SET_FAQ_BATCH_NUMBER",
  UPDATE_FAQ_START: "UPDATE_FAQ_START",
  UPDATE_FAQ_SUCCESS: "UPDATE_FAQ_SUCCESS",
  UPDATE_FAQ_ERROR: "UPDATE_FAQ_ERROR",
  DELETE_FAQ_START: "DELETE_FAQ_START",
  DELETE_FAQ_SUCCESS: "DELETE_FAQ_SUCCESS",
  DELETE_FAQ_ERROR: "DELETE_FAQ_ERROR",
  ADD_FAQ_START: "ADD_FAQ_START",
  ADD_FAQ_SUCCESS: "ADD_FAQ_SUCCESS",
  ADD_FAQ_ERROR: "ADD_FAQ_ERROR",
  CREATE_FAQ_MANAGEMENT_CLOSE: "CREATE_FAQ_MANAGEMENT_CLOSE",
  CREATE_FAQ_MANAGEMENT_SHOW: "CREATE_FAQ_MANAGEMENT_SHOW"

};

export const faq_managementActions = {
  getFaqStart: (data) => ({
    type: faq_managementMap.GET_FAQ_START,
    payload: data,
  }),
  getFaqSuccess: (data) => ({
    type: faq_managementMap.GET_FAQ_SUCCESS,
    payload: data,
  }),
  getFaqError: (data) => ({
    type: faq_managementMap.GET_FAQ_ERROR,
    payload: data,
  }),

  updateFaqStart: (data) => ({
    type: faq_managementMap.UPDATE_FAQ_START,
    payload: data,
  }),
  updateFaqSuccess: (data) => ({
    type: faq_managementMap.UPDATE_FAQ_SUCCESS,
    payload: data,
  }),
  updateFaqError: (errors) => ({
    type: faq_managementMap.UPDATE_FAQ_ERROR,
    payload: { errors },
  }),
  setSelectedFaq: (data) => ({
    type: faq_managementMap.SET_SELECTED_FAQ,
    payload: data,
  }),
  deleteFaqStart: (data) => ({
    type: faq_managementMap.DELETE_FAQ_START,
    payload: data,
  }),
  deleteFaqSuccess: (data) => ({
    type: faq_managementMap.DELETE_FAQ_SUCCESS,
    payload: data,
  }),
  deleteFaqError: (data) => ({
    type: faq_managementMap.DELETE_FAQ_ERROR,
    payload: data,
  }),
  addFaqStart: (data) => ({
    type: faq_managementMap.ADD_FAQ_START,
    payload: data,
  }),
  addFaqSuccess: (data) => ({
    type: faq_managementMap.ADD_FAQ_SUCCESS,
    payload: data,
  }),
  addFaqError: (errors) => ({
    type: faq_managementMap.ADD_FAQ_ERROR,
    payload: { errors },
  }),
  setFaqBatchNumber: (data) => ({
    type: faq_managementMap.SET_FAQ_BATCH_NUMBER,
    payload: data,
  }),
  createFaqModalClose: () => ({
    type: faq_managementMap.CREATE_FAQ_MANAGEMENT_CLOSE,
  }),
  createFaqModalShow: () => ({
    type: faq_managementMap.CREATE_FAQ_MANAGEMENT_SHOW,
  }),

};
