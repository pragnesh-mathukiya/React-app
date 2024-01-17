import React, { useEffect, useRef } from "react";
import "bootstrap-daterangepicker/daterangepicker.css";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
  getAllNotificationAsync,
  NotificationManagementActions,
  getAllEmailTemplatesAsync,
} from "../redux";
import {
  Card,
  CardHeader,
  CardHeaderToolbar,
} from "./../../../../_metronic/_partials/controls";
import NotificationManagementTable from "./notificationManagementDetail/notificationManagementTable";

export function NotificationManagement() {
  const searchNotificationRef = useRef();
  const dispatch = useDispatch();
  const history = useHistory();

  const type = "NOTIFICATION";
  const { refreshNotificationList, searchBy, searchText } = useSelector(
    (state) => state.notificationManagement,
    shallowEqual
  );

  useEffect(() => {
    dispatch(NotificationManagementActions.setNotificationEmail(null));
    if (searchNotificationRef.current) {
      let keyPressEvent = (e) => {
        if (e.keyCode === 13) {
          e.preventDefault();
          dispatch(NotificationManagementActions.refreshNotificationList());
        }
      };
      let input = searchNotificationRef.current;
      input.addEventListener("keyup", keyPressEvent);

      return () => {
        input.removeEventListener("keyup", keyPressEvent);
        dispatch(NotificationManagementActions.searchTextChange(""));
        input.value = "";
      };
    }
  }, [dispatch]);

  useEffect(() => {
    if (refreshNotificationList) {
      dispatch(getAllNotificationAsync(searchBy, searchText, type));
    }
  }, [dispatch, refreshNotificationList, searchBy, searchText]);
  useEffect(() => {
    dispatch(getAllEmailTemplatesAsync());
  }, [dispatch]);

  const onSearchTextChange = (e) => {
    dispatch(NotificationManagementActions.searchTextChange(e.target.value));
  };

  const onAddClick = () => {
    history.push("/notification-management/add-template");
  };
  return (
    <>
      <Card>
        <CardHeader title="Notification Management">
          <CardHeaderToolbar>
            <div className="d-flex flex-wrap ap_filter_wraper justify-content-end align-items-center">
              <form
                className="subheader_filter"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="form-row">
                  <div className="form-group mr-5 mb-1 mt-2">
                    <button
                      className="btn_new btn-sm"
                      type="button"
                      onClick={() => onAddClick()}
                    >
                      Add
                    </button>
                  </div>
                  <div className="form-group mr-3 mb-1">
                    <input
                      name="Search"
                      placeholder="Search. . ."
                      type="text"
                      className="form-control"
                      value={searchText}
                      onChange={onSearchTextChange}
                      ref={searchNotificationRef}
                    />
                  </div>
                </div>
              </form>
            </div>
          </CardHeaderToolbar>
        </CardHeader>
        <NotificationManagementTable />
      </Card>
    </>
  );
}
