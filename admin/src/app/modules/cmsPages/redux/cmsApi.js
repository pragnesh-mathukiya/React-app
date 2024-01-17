import axios from "axios";
import { CmsActions } from "./cmsAction";
import { showSuccessSnackbar } from "../../snackBar/snackBar.action";

const getAdminURL = (state) => {
  return state.environnment.environmentLists.adminBaseURL;
};

export const createCMSAsync = (cmsDetail) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      dispatch(CmsActions.createCMSStart());
      let { data } = await axios({
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/cms/create`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: cmsDetail,
      });
      if (data.code === 200) {
        dispatch(CmsActions.createCMSSuccess(data.data));
        return dispatch(showSuccessSnackbar("success", data.message, 3000));
      }
      dispatch(CmsActions.createCMSError());
      dispatch(showSuccessSnackbar("error", data.message, 3000));
    } catch (error) {
      dispatch(CmsActions.createCMSError());
      dispatch(
        showSuccessSnackbar("error", "Error while fetching Data.", 3000)
      );
    }
  };
};

export const getAllcmsAsync = () => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      dispatch(CmsActions.getAllCMS());
      let { data } = await axios({
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/cms/getAll`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.code === 200) {
        return dispatch(CmsActions.getAllCMSSuccess(data.data));
      }
      dispatch(CmsActions.getAllCMSError());
      dispatch(showSuccessSnackbar("error", data.message, 3000));
    } catch (error) {
      dispatch(CmsActions.getAllCMSError());
      dispatch(
        showSuccessSnackbar("error", "Error while fetching Data.", 3000)
      );
    }
  };
};

export const updateCMSAsync = (cmsID, updateData) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      dispatch(CmsActions.updateCMSStart());
      let { data } = await axios({
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/cms/updateDetails/${cmsID}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        data: updateData,
      });
      if (data.code === 200) {
        dispatch(CmsActions.updateCMSSuccess(data.data));
        return dispatch(showSuccessSnackbar("success", data.message, 3000));
      }
      dispatch(CmsActions.updateCMSError());
      return dispatch(showSuccessSnackbar("error", data.message, 3000));
    } catch (error) {
      dispatch(CmsActions.updateCMSError());
      dispatch(
        showSuccessSnackbar(
          "error",
          "Error while updating.Please try again after sometime..",
          3000
        )
      );
    }
  };
};

export const deleteCMSAsync = (cmsID) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      //let { _id } = getState().auth.user;
      dispatch(CmsActions.deleteCMSStart());
      let { data } = await axios({
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/cms/delete/${cmsID}`,
        method: "DELETE",
      });
      if (data.code === 200) {
        dispatch(CmsActions.deleteCMSSuccess(data.data));
        return dispatch(showSuccessSnackbar("success", data.message, 3000));
      }
      dispatch(CmsActions.deleteCMSError());
      return dispatch(showSuccessSnackbar("error", data.message, 3000));
    } catch (error) {
      dispatch(CmsActions.deleteCMSError());
      dispatch(
        showSuccessSnackbar(
          "error",
          "Error while updating.Please try again after sometime..",
          3000
        )
      );
    }
  };
};
