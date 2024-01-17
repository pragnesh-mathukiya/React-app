import React, { useEffect, useRef } from "react";
import "bootstrap-daterangepicker/daterangepicker.css";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
  getAllSmsAsync,
  SmsManagementActions,
  getAllSmsTemplatesAsync,
} from "../redux";
import SmsManagementTable from "./smsManagementDetail/smsManagementTable";
import {
  Card,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../_metronic/_partials/controls";

export function SmsManagement() {
  const dispatch = useDispatch();
  const searchSmsRef = useRef();
  const history = useHistory();
  const type = "SMS";
  const { refreshSmsList, searchBy, searchText } = useSelector(
    (state) => state.smsManagement,
    shallowEqual
  );
  useEffect(() => {
    dispatch(SmsManagementActions.setSelectedSms(null));
    if (searchSmsRef.current) {
      let keyPressEvent = (e) => {
        if (e.keyCode === 13) {
          e.preventDefault();
          dispatch(SmsManagementActions.refreshSmsList());
        }
      };
      let input = searchSmsRef.current;
      input.addEventListener("keyup", keyPressEvent);

      return () => {
        input.removeEventListener("keyup", keyPressEvent);
        dispatch(SmsManagementActions.searchTextChange(""));
        input.value = "";
      };
    }
  }, [dispatch]);
  useEffect(() => {
    if (refreshSmsList) {
      dispatch(getAllSmsAsync(searchBy, searchText, type));
    }
  }, [dispatch, refreshSmsList, searchBy, searchText]);
  useEffect(() => {
    dispatch(getAllSmsTemplatesAsync());
  }, [dispatch]);

  const onAddClick = () => {
    history.push("/sms-management/add-template");
  };

  const onSearchTextChange = (e) => {
    dispatch(SmsManagementActions.searchTextChange(e.target.value));
  };
  return (
    <>
      <Card>
        <CardHeader title="SMS Management">
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
                      ref={searchSmsRef}
                    />
                  </div>
                </div>
              </form>
            </div>
          </CardHeaderToolbar>
        </CardHeader>
        <SmsManagementTable />
      </Card>
    </>
  );
}
