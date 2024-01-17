import React, { useEffect, useRef } from "react";
import "bootstrap-daterangepicker/daterangepicker.css";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
  getAllEmailAsync,
  EmailManagementActions,
  getAllEmailTemplatesAsync,
} from "../redux";
import EmailManagementTable from "./emailManagementDetail/emailManagementTable";
import {
  Card,
  CardHeader,
  CardHeaderToolbar,
} from "./../../../../_metronic/_partials/controls";

export function EmailManagement() {
  const dispatch = useDispatch();
  const searchEmailRef = useRef();
  const history = useHistory();
  const type = "EMAIL";
  const { refreshEmailList, searchBy, searchText } = useSelector(
    (state) => state.emailManagement,
    shallowEqual
  );
  useEffect(() => {
    dispatch(EmailManagementActions.setSelectedEmail(null));
    if (searchEmailRef.current) {
      let keyPressEvent = (e) => {
        if (e.keyCode === 13) {
          e.preventDefault();
          dispatch(EmailManagementActions.refreshEmailList());
        }
      };
      let input = searchEmailRef.current;
      input.addEventListener("keyup", keyPressEvent);

      return () => {
        input.removeEventListener("keyup", keyPressEvent);
        dispatch(EmailManagementActions.searchTextChange(""));
        input.value = "";
      };
    }
  }, [dispatch]);
  useEffect(() => {
    if (refreshEmailList) {
      dispatch(getAllEmailAsync(searchBy, searchText, type));
    }
  }, [dispatch, refreshEmailList, searchBy, searchText]);
  useEffect(() => {
    dispatch(getAllEmailTemplatesAsync());
  }, [dispatch]);

  const onAddClick = () => {
    history.push("/email-management/add-template");
  };

  const onSearchTextChange = (e) => {
    dispatch(EmailManagementActions.searchTextChange(e.target.value));
  };
  return (
    <>
      <Card>
        <CardHeader title="Email Management">
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
                      ref={searchEmailRef}
                    />
                  </div>
                </div>
              </form>
            </div>
          </CardHeaderToolbar>
        </CardHeader>
        <EmailManagementTable />
      </Card>
    </>
  );
}
