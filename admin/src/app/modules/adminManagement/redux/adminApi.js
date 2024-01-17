import axios from "axios";
import { adminActions } from "./adminAction";
import { showSuccessSnackbar } from "../../snackBar/snackBar.action";

const getAdminURL = (state) => {
  return state.environnment.environmentLists.adminBaseURL;
};

export const getAdminAsync = (searchText) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      let { subAdminSkip, subAdminLimit } = getState().admin;
      dispatch(adminActions.getSubAdminStart());
      const { data } = await axios({
        method: "Get",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/getAll?skip=${subAdminSkip}&limit=${subAdminLimit}&search=${searchText}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.code === 200) {
        return dispatch(adminActions.getSubAdminSuccess(data.data));
      }
      return dispatch(adminActions.getSubAdminError());
    } catch (error) {
      dispatch(adminActions.getSubAdminError());
      dispatch(showSuccessSnackbar("error", "Error while fetching data", 3000));
    }
  };
};

export const updateAdminAsync = (values, SubAdminId) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      dispatch(adminActions.updateSubAdminStart());
      const { data } = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/updateProfile/${SubAdminId}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: values,
      });
      if (data.code === 200) {
        dispatch(adminActions.updateSubAdminSuccess(data.data));
        dispatch(showSuccessSnackbar("success", data?.message, 3000));
        return data;
      }
      return dispatch(adminActions.updateSubAdminError());
    } catch (error) {
      dispatch(adminActions.updateSubAdminError());
      dispatch(showSuccessSnackbar("error", "Error while updating data", 3000));
    }
  };
};

export const deleteAdminAsync = (SubAdminId) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      dispatch(adminActions.deleteSubAdminStart());
      const { data } = await axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/delete/${SubAdminId}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.code === 200) {
        dispatch(adminActions.deleteSubAdminSuccess(data.data));
        dispatch(showSuccessSnackbar("success", data?.message, 3000));
        return data;
      }
      return dispatch(adminActions.deleteSubAdminError());
    } catch (error) {
      dispatch(adminActions.deleteSubAdminError());
      dispatch(
        showSuccessSnackbar("error", "Error while deleting SubAdmin", 3000)
      );
    }
  };
};

export const adminAsync = (SubAdmin) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      dispatch(adminActions.addSubAdminStart());
      let { data } = await axios({
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/addSubAdmin`,
        method: "POST",
        data: SubAdmin,
      });
      if (data?.code === 200) {
        dispatch(adminActions.addSubAdminSuccess(data?.data));
        dispatch(showSuccessSnackbar("success", data?.message, 3000));
        return data;
      } else {
        dispatch(adminActions.addSubAdminError());
        dispatch(showSuccessSnackbar("error", data?.message, 3000));
        return data;
      }
    } catch (error) {
      dispatch(adminActions.addSubAdminError());
      return dispatch(
        showSuccessSnackbar("error", "Please try again later.", 3000)
      );
    }
  };
};

export const getRolePermissionAsync = () => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      dispatch(adminActions.getRolePermissionStart());
      const { data } = await axios({
        method: "Get",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/role/getAllPermission`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.code === 200) {
        return dispatch(adminActions.getRolePermissionSuccess(data.data));
      } else {
        return dispatch(adminActions.getRolePermissionError());
      }
    } catch (error) {
      dispatch(adminActions.getRolePermissionError());
      dispatch(showSuccessSnackbar("error", "Error while fetching data", 3000));
    }
  };
};

export const getAdminDetailAsync = (SubAdminId) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      dispatch(adminActions.getSubAdminDetailStart());
      const { data } = await axios({
        method: "Get",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/getProfile/${SubAdminId}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.code === 200) {
        dispatch(adminActions.getSubAdminDetailSuccess(data.data));
        dispatch(showSuccessSnackbar("success", data?.message, 3000));
        return data;
      }
      return dispatch(adminActions.getSubAdminDetailError());
    } catch (error) {
      dispatch(adminActions.getSubAdminDetailError());
      dispatch(showSuccessSnackbar("error", "Error while get data", 3000));
    }
  };
};
