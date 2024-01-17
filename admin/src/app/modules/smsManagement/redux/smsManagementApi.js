import axios from "axios";
import { SmsManagementActions } from "./smsManagementAction";
import { showSuccessSnackbar } from "../../snackBar/snackBar.action";

const getAdminURL = (state) => {
  return state.environnment.environmentLists.adminBaseURL;
};

export const getAllSmsAsync = (searchBy, searchText, type) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      //let { _id } = getState().auth.user;
      let { skip, limit } = getState().smsManagement;
      dispatch(SmsManagementActions.getAllSmsStart());
      const { data } = await axios({
        method: "Get",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/smsManagement/getAllTemplates?skip=${skip}&limit=${limit}&column=${searchBy}&dir=&search=${searchText}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.code === 200) {
        return dispatch(SmsManagementActions.getAllSmsSuccess(data.data));
      }
      dispatch(SmsManagementActions.getAllSmsError());
      return dispatch(showSuccessSnackbar("success", data.message, 3000));
    } catch (error) {
      dispatch(SmsManagementActions.getAllSmsError());
      dispatch(showSuccessSnackbar("error", "Error while fetching data", 3000));
    }
  };
};
export const getAllSmsTemplatesAsync = () => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      //let { _id } = getState().auth.user;
      dispatch(SmsManagementActions.getSmsTemplateStart());
      const { data } = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/smsManagement/getAllTemplateEntities`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.code === 200) {
        return dispatch(
          SmsManagementActions.getSmsTemplateSuccess(data.data)
        );
      }
      dispatch(SmsManagementActions.getSmsTemplateError());

      return dispatch(showSuccessSnackbar("error", data.message, 3000));
    } catch (error) {
      dispatch(SmsManagementActions.getSmsTemplateError());
      dispatch(showSuccessSnackbar("error", "Error while fetching data", 3000));
    }
  };
};

export const addSmsAsync = (
  values,
  setSubmitting,
  resetForm,
  redirectBack
) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      //let { _id } = getState().auth.user;
      dispatch(SmsManagementActions.addSmsStart());
      const { data } = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/smsManagement/createTemplate`,
        headers: {
          "Content-Type": "application/json",
        },
        data: values,
      });
      if (data.code === 200) {
        dispatch(SmsManagementActions.addSmsSuccess(data.data));
        setSubmitting(false);
        resetForm();
        redirectBack();
        return dispatch(showSuccessSnackbar("success", data.message, 3000));
      }
      dispatch(SmsManagementActions.addSmsError());
      setSubmitting(false);
      return dispatch(showSuccessSnackbar("error", data.message, 3000));
    } catch (error) {
      dispatch(SmsManagementActions.addSmsError(error));
      setSubmitting(false);
      resetForm();
      dispatch(showSuccessSnackbar("error", "Error while fetching data", 3000));
    }
  };
};

export const updateSmsAsync = (
  values,
  setSubmitting,
  resetForm,
  redirectBack
) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      //let { _id } = getState().auth.user;
      let { selectedSms } = getState().smsManagement;
      dispatch(SmsManagementActions.updateSmsStart());
      const { data } = await axios({
        method: "PUT",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/smsManagement/updateTemplate/${selectedSms._id}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: values,
      });
      if (data.code === 200) {
        dispatch(SmsManagementActions.updateSmsSuccess(data.data));
        setSubmitting(false);
        resetForm();
        redirectBack();
        return dispatch(showSuccessSnackbar("success", data.message, 3000));
      }
      dispatch(SmsManagementActions.updateSmsError());
      setSubmitting(false);
      return dispatch(showSuccessSnackbar("error", data.message, 3000));
    } catch (error) {
      dispatch(SmsManagementActions.updateSmsError(error));
      setSubmitting(false);
      resetForm();
      dispatch(showSuccessSnackbar("error", "Error while fetching data", 3000));
    }
  };
};

export const deleteSmsAsync = (id) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      //let { _id } = getState().auth.user;
      dispatch(SmsManagementActions.deleteSmsStart());
      const { data } = await axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/smsManagement/deleteTemplate/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.code === 200) {
        dispatch(SmsManagementActions.deleteSmsSuccess(data.data));
        return dispatch(showSuccessSnackbar("success", data.message, 3000));
      }
      dispatch(SmsManagementActions.deleteSmsError());

      return dispatch(showSuccessSnackbar("error", data.message, 3000));
    } catch (error) {
      dispatch(SmsManagementActions.deleteSmsError(error));
      dispatch(showSuccessSnackbar("error", "Error while fetching data", 3000));
    }
  };
};
