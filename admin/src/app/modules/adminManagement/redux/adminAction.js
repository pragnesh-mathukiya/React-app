export const adminMap = {
  GET_ADD_ADMIN_START: "GET_ADD_ADMIN_START",
  GET_ADD_ADMIN_SUCCESS: "GET_ADD_ADMIN_SUCCESS",
  GET_ADD_ADMIN_ERROR: "GET_ADD_ADMIN_ERROR",
  SET_SELECTED_ADD_ADMIN: "SET_SELECTED_ADD_ADMIN",
  SET_ADD_ADMIN_BATCH_NUMBER: "SET_ADD_ADMIN_BATCH_NUMBER",
  UPDATE_ADD_ADMIN_START: "UPDATE_ADD_ADMIN_START",
  UPDATE_ADD_ADMIN_SUCCESS: "UPDATE_ADD_ADMIN_SUCCESS",
  UPDATE_ADD_ADMIN_ERROR: "UPDATE_ADD_ADMIN_ERROR",
  DELETE_ADD_ADMIN_START: "DELETE_ADD_ADMIN_START",
  DELETE_ADD_ADMIN_SUCCESS: "DELETE_ADD_ADMIN_SUCCESS",
  DELETE_ADD_ADMIN_ERROR: "DELETE_ADD_ADMIN_ERROR",
  ADD_ADD_ADMIN_START: "ADD_ADD_ADMIN_START",
  ADD_ADD_ADMIN_SUCCESS: "ADD_ADD_ADMIN_SUCCESS",
  ADD_ADD_ADMIN_ERROR: "ADD_ADD_ADMIN_ERROR",
  CREATE_ADD_ADMIN_CLOSE: "CREATE_ADD_ADMIN_CLOSE",
  CREATE_ADD_ADMIN_SHOW: "CREATE_ADD_ADMIN_SHOW",
  SEARCH_TEXT_CHANGE: "SEARCH_TEXT_CHANGE",
  GET_ROLE_PERMISSION_START: "GET_ROLE_PERMISSION_START",
  GET_ROLE_PERMISSION_SUCCESS: "GET_ROLE_PERMISSION_SUCCESS",
  GET_ROLE_PERMISSION_ERROR: "GET_ROLE_PERMISSION_ERROR",
  GET_ADMIN_DETAIL_START: "GET_ADMIN_DETAIL_START",
  GET_ADMIN_DETAIL_SUCCESS: "GET_ADMIN_DETAIL_SUCCESS",
  GET_ADMIN_DETAIL_ERROR: "GET_ADMIN_DETAIL_ERROR",
};

export const adminActions = {
  getSubAdminStart: (data) => ({
    type: adminMap.GET_ADD_ADMIN_START,
    payload: data,
  }),
  getSubAdminSuccess: (data) => ({
    type: adminMap.GET_ADD_ADMIN_SUCCESS,
    payload: data,
  }),
  getSubAdminError: (data) => ({
    type: adminMap.GET_ADD_ADMIN_ERROR,
    payload: data,
  }),

  updateSubAdminStart: (data) => ({
    type: adminMap.UPDATE_ADD_ADMIN_START,
    payload: data,
  }),
  updateSubAdminSuccess: (data) => ({
    type: adminMap.UPDATE_ADD_ADMIN_SUCCESS,
    payload: data,
  }),
  updateSubAdminError: (errors) => ({
    type: adminMap.UPDATE_ADD_ADMIN_ERROR,
    payload: { errors },
  }),
  setSelectedSubAdmin: (data) => ({
    type: adminMap.SET_SELECTED_ADD_ADMIN,
    payload: data,
  }),
  deleteSubAdminStart: (data) => ({
    type: adminMap.DELETE_ADD_ADMIN_START,
    payload: data,
  }),
  deleteSubAdminSuccess: (data) => ({
    type: adminMap.DELETE_ADD_ADMIN_SUCCESS,
    payload: data,
  }),
  deleteSubAdminError: (data) => ({
    type: adminMap.DELETE_ADD_ADMIN_ERROR,
    payload: data,
  }),
  addSubAdminStart: (data) => ({
    type: adminMap.ADD_ADD_ADMIN_START,
    payload: data,
  }),
  addSubAdminSuccess: (data) => ({
    type: adminMap.ADD_ADD_ADMIN_SUCCESS,
    payload: data,
  }),
  addSubAdminError: (errors) => ({
    type: adminMap.ADD_ADD_ADMIN_ERROR,
    payload: { errors },
  }),
  setSubAdminBatchNumber: (data) => ({
    type: adminMap.SET_ADD_ADMIN_BATCH_NUMBER,
    payload: data,
  }),
  createSubAdminModalClose: () => ({
    type: adminMap.CREATE_ADD_ADMIN_CLOSE,
  }),
  createSubAdminModalShow: () => ({
    type: adminMap.CREATE_ADD_ADMIN_SHOW,
  }),
  searchTextChange: (data) => ({
    type: adminMap.SEARCH_TEXT_CHANGE,
    payload: data,
  }),
  getRolePermissionStart: (data) => ({
    type: adminMap.GET_ROLE_PERMISSION_START,
    payload: data,
  }),
  getRolePermissionSuccess: (data) => ({
    type: adminMap.GET_ROLE_PERMISSION_SUCCESS,
    payload: data,
  }),
  getRolePermissionError: (data) => ({
    type: adminMap.GET_ROLE_PERMISSION_ERROR,
    payload: data,
  }),

  getSubAdminDetailStart: (data) => ({
    type: adminMap.GET_ADMIN_DETAIL_START,
    payload: data,
  }),
  getSubAdminDetailSuccess: (data) => ({
    type: adminMap.GET_ADMIN_DETAIL_SUCCESS,
    payload: data,
  }),
  getSubAdminDetailError: (errors) => ({
    type: adminMap.GET_ADMIN_DETAIL_ERROR,
    payload: { errors },
  }),
};
