import axios from "axios";
import { NotificationManagementActions } from "./notificationMangementAction";
import { showSuccessSnackbar } from "../../snackBar/snackBar.action";

const getAdminURL = (state) => {
  return state.environnment.environmentLists.adminBaseURL;
};

export const getAllNotificationAsync = (searchBy, searchText, type) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      //let { _id } = getState().auth.user;
      let { skip, limit } = getState().emailManagement;
      skip = skip * limit;
      dispatch(NotificationManagementActions.getAllNotificationStart());
      const { data } = await axios({
        method: "Get",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/emailManagement/getAllTemplates?skip=${skip}&limit=${limit}&column=${searchBy}&type=${type}&dir=&search=${searchText}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.code === 200) {
        return dispatch(
          NotificationManagementActions.getAllNotificationSuccess(data.data)
        );
      }
      dispatch(NotificationManagementActions.getAllNotificationError());
      return dispatch(showSuccessSnackbar("success", data.message, 3000));
    } catch (error) {
      dispatch(NotificationManagementActions.getAllNotificationError());
      dispatch(showSuccessSnackbar("error", "Error while fetching data", 3000));
    }
  };
};
export const getAllEmailTemplatesAsync = () => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      //let { _id } = getState().auth.user;
      dispatch(NotificationManagementActions.getNotificationTemplateStart());
      const { data } = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/emailManagement/getAllTemplateEntities`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.code === 200) {
        return dispatch(
          NotificationManagementActions.getNotificationTemplateSuccess(
            data.data
          )
        );
      }
      dispatch(NotificationManagementActions.getNotificationTemplateError());

      return dispatch(showSuccessSnackbar("error", data.message, 3000));
    } catch (error) {
      dispatch(NotificationManagementActions.getNotificationTemplateError());
      dispatch(showSuccessSnackbar("error", "Error while fetching data", 3000));
    }
  };
};

export const addNotificationsync = (
  values,
  setSubmitting,
  resetForm,
  redirectBack
) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      //let { _id } = getState().auth.user;
      dispatch(NotificationManagementActions.addNotificationStart());
      const { data } = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/emailManagement/createTemplate`,
        headers: {
          "Content-Type": "application/json",
        },
        data: values,
      });
      if (data.code === 200) {
        dispatch(
          NotificationManagementActions.addNotificationSuccess(data.data)
        );
        setSubmitting(false);
        resetForm();
        redirectBack();
        return dispatch(showSuccessSnackbar("success", data.message, 3000));
      }
      dispatch(NotificationManagementActions.addNotificationError());
      setSubmitting(false);
      return dispatch(showSuccessSnackbar("error", data.message, 3000));
    } catch (error) {
      dispatch(NotificationManagementActions.addNotificationError(error));
      setSubmitting(false);
      resetForm();
      dispatch(showSuccessSnackbar("error", "Error while fetching data", 3000));
    }
  };
};

export const updateNotficationAsync = (
  values,
  setSubmitting,
  resetForm,
  redirectBack
) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      //let { _id } = getState().auth.user;
      let { selectedNotification } = getState().notificationManagement;
      dispatch(NotificationManagementActions.updateNotificationStart());
      const { data } = await axios({
        method: "PUT",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/emailManagement/updateTemplate/${selectedNotification._id}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: values,
      });
      if (data.code === 200) {
        dispatch(
          NotificationManagementActions.updateNotificationSuccess(data.data)
        );
        setSubmitting(false);
        resetForm();
        redirectBack();
        return dispatch(showSuccessSnackbar("success", data.message, 3000));
      }
      dispatch(NotificationManagementActions.updateNotificationError());
      setSubmitting(false);
      return dispatch(showSuccessSnackbar("error", data.message, 3000));
    } catch (error) {
      dispatch(NotificationManagementActions.updateNotificationError(error));
      setSubmitting(false);
      resetForm();
      dispatch(showSuccessSnackbar("error", "Error while fetching data", 3000));
    }
  };
};

export const deleteNotificationAsync = (id) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      //let { _id } = getState().auth.user;
      dispatch(NotificationManagementActions.deleteNotificationStart());
      const { data } = await axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/emailManagement/deleteTemplate/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.code === 200) {
        dispatch(
          NotificationManagementActions.deleteNotificationSuccess(data.data)
        );
        return dispatch(showSuccessSnackbar("success", data.message, 3000));
      }
      dispatch(NotificationManagementActions.deleteNotificationError());

      return dispatch(showSuccessSnackbar("error", data.message, 3000));
    } catch (error) {
      dispatch(NotificationManagementActions.deleteNotificationError(error));
      dispatch(showSuccessSnackbar("error", "Error while fetching data", 3000));
    }
  };
};
