import axios from "axios";
import { SiteActions } from "./siteAction";
import { showSuccessSnackbar } from "../../snackBar/snackBar.action";

const getAdminURL = (state) => {
  return state.environnment.environmentLists.adminBaseURL;
};

export const siteSetUpAsync = (formData) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      dispatch(SiteActions.siteUpdateStart());
      let { data } = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/config/setConfig`,
        headers: {
          "Content-Type": "application/json",
        },
        data: formData,
      });
      if (data.code === 200) {
        dispatch(SiteActions.siteUpdateSuccess(data.data));
        return dispatch(showSuccessSnackbar("success", data.message, 3000));
      }
      dispatch(SiteActions.siteUpdateError());
      return dispatch(showSuccessSnackbar("error", data.message, 3000));
    } catch (error) {
      dispatch(SiteActions.siteUpdateError());
      dispatch(
        showSuccessSnackbar(
          "error",
          "Error while updating configuaration.Please try again after sometime.",
          3000
        )
      );
    }
  };
};

export const getAllConfigAsync = () => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      dispatch(SiteActions.siteGetDetailStart());
      let { data } = await axios({
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/config/getConfig`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.code === 200) {
        return dispatch(SiteActions.siteGetDetailSuccess(data.data));
      }
      dispatch(SiteActions.siteGetDetailError());
      dispatch(showSuccessSnackbar("error", data.message, 3000));
    } catch (error) {
      dispatch(SiteActions.siteGetDetailError());
      dispatch(
        showSuccessSnackbar("error", "Error while fetching Data.", 3000)
      );
    }
  };
};
