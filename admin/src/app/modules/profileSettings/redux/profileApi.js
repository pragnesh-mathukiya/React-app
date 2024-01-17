import axios from "axios";
import { ProfileActions } from "./profileAction";
import { showSuccessSnackbar } from "../../snackBar/snackBar.action";

const getAdminURL = (state) => {
  return state.environnment.environmentLists.adminBaseURL;
};


export const updateUserProfileAsync = (formData) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      dispatch(ProfileActions.profileUpdateStart());
      let { _id } = getState().auth.user;
      let { data } = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/updateProfile/${_id}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: formData,
      });
      if (data.code === 200) {
        dispatch(ProfileActions.profileUpdateSuccess(data.data));
        return dispatch(
          showSuccessSnackbar("success", data.message, 3000)
        );
      }
      dispatch(ProfileActions.profileUpdateError());
      return dispatch(showSuccessSnackbar("error", data.message, 3000));
    } catch (error) {
      dispatch(ProfileActions.profileUpdateError());
      dispatch(
        showSuccessSnackbar(
          "error",
          "Error while updating profile.Please try again after sometime.",
          3000
        )
      );
    }
  };
};

export const resetPasswordAsync = (password) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      dispatch(ProfileActions.resetPasswordStart());
      const { data } = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/resetPassword`,
        data: password,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.code === 200) {
        dispatch(ProfileActions.resetPasswordSuccess(data.data));
        return dispatch(
          showSuccessSnackbar("success", data.message, 3000)
        );
      }
      return dispatch(ProfileActions.resetPasswordError());
    } catch (error) {
      dispatch(ProfileActions.resetPasswordError());
      dispatch(
        showSuccessSnackbar(
          "error",
          "Error while reseting password.Please try again after sometime.",
          3000
        )
      );
    }
  };
};