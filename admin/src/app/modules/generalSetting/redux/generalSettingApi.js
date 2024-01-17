import axios from "axios";
import { GeneralSettingActions } from "./generalSettingAction";
import { showSuccessSnackbar } from "../../snackBar/snackBar.action";

const getAdminURL = (state) => {
  return state.environnment.environmentLists.adminBaseURL;
};

export const getGeneralSettingAsync = () => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      dispatch(GeneralSettingActions.getGeneralSetting());
      let { data } = await axios({
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/settings/getDetails`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.code === 200) {
        return dispatch(
          GeneralSettingActions.getGeneralSettingSuccess(data.data)
        );
      }
      dispatch(GeneralSettingActions.getGeneralSettingError());
      dispatch(showSuccessSnackbar("error", data.message, 3000));
    } catch (error) {
      dispatch(GeneralSettingActions.getGeneralSettingError());
      dispatch(
        showSuccessSnackbar("error", "Error while fetching Data.", 3000)
      );
    }
  };
};

export const updateGeneralSettingAsync = (settingId, updateData) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      dispatch(GeneralSettingActions.updateGeneralSettingStart());
      let { data } = await axios({
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/settings/updateDetails/${settingId}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        data: updateData,
      });
      if (data.code === 200) {
        dispatch(GeneralSettingActions.updateGeneralSettingSuccess(data.data));
        return dispatch(showSuccessSnackbar("success", data.message, 3000));
      }
      dispatch(GeneralSettingActions.updateGeneralSettingError());
      return dispatch(showSuccessSnackbar("error", data.message, 3000));
    } catch (error) {
      dispatch(GeneralSettingActions.updateGeneralSettingError());
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
