import axios from "axios";
import { DashboardActions } from "./dashboardAction";
import { showSuccessSnackbar } from "../../snackBar/snackBar.action";

const getAdminURL = (state) => {
  return state.environnment.environmentLists.adminBaseURL;
};

export const getDashboardDetailAsync = () => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      dispatch(DashboardActions.getDashboardDetailStart());
      const { data } = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/dashboard/dashboardDetail`,
      });

      if (data.code === 200) {
        return dispatch(DashboardActions.getDashboardDetailSuccess(data.data));
      }
      return dispatch(DashboardActions.getDashboardDetailError());
    } catch (error) {
      dispatch(DashboardActions.getDashboardDetailError());
      return dispatch(
        showSuccessSnackbar("error", "Error while fetching data", 3000)
      );
    }
  };
};
