import axios from "axios";
import { faq_managementActions } from "./faqManagementAction";
import { showSuccessSnackbar } from "../../snackBar/snackBar.action";

const getAdminURL = (state) => {
  return state.environnment.environmentLists.adminBaseURL;
};

export const getFaqAsync = () => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      let { faqSkip, faqLimit } = getState().faqManagement;
      dispatch(faq_managementActions.getFaqStart());
      const { data } = await axios({
        method: "Get",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/faqs/getAll?skip=${faqSkip}&limit=${faqLimit}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.code === 200) {
        return dispatch(faq_managementActions.getFaqSuccess(data.data));
      }
      return dispatch(faq_managementActions.getFaqError());
    } catch (error) {
      dispatch(faq_managementActions.getFaqError());
      dispatch(showSuccessSnackbar("error", "Error while fetching data", 3000));
    }
  };
};

export const updateFaqAsync = (values, faqId) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      dispatch(faq_managementActions.updateFaqStart());
      const { data } = await axios({
        method: "PUT",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/faqs/updateDetails/${faqId}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: values,
      });
      if (data.code === 200) {
        dispatch(faq_managementActions.updateFaqSuccess(data.data));
        dispatch(showSuccessSnackbar("success", data?.message, 3000));
        return data;
      }
      return dispatch(faq_managementActions.updateFaqError());
    } catch (error) {
      dispatch(faq_managementActions.updateFaqError());
      dispatch(showSuccessSnackbar("error", "Error while updating data", 3000));
    }
  };
};

export const deleteFaqAsync = (faqId) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      dispatch(faq_managementActions.deleteFaqStart());
      const { data } = await axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/faqs/delete/${faqId}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.code === 200) {
        dispatch(faq_managementActions.deleteFaqSuccess(data.data));
        dispatch(showSuccessSnackbar("success", data?.message, 3000));
        return data;
      }
      return dispatch(faq_managementActions.deleteFaqError());
    } catch (error) {
      dispatch(faq_managementActions.deleteFaqError());
      dispatch(showSuccessSnackbar("error", "Error while deleting Faq", 3000));
    }
  };
};

export const addFaqAsync = (faq) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      dispatch(faq_managementActions.addFaqStart());
      let { data } = await axios({
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/faqs/create`,
        method: "POST",
        data: faq,
      });
      if (data?.code === 200) {
        dispatch(faq_managementActions.addFaqSuccess(data?.data));
        dispatch(showSuccessSnackbar("success", data?.message, 3000));
        return data;
      } else {
        dispatch(faq_managementActions.addFaqError());
        dispatch(showSuccessSnackbar("error", data?.message, 3000));
        return data;
      }
    } catch (error) {
      dispatch(faq_managementActions.addFaqError());
      return dispatch(
        showSuccessSnackbar("error", "Please try again later.", 3000)
      );
    }
  };
};
