/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import AdminManagementTable from "./adminDetail/addAdminTable";
import { Card, CardHeader, CardHeaderToolbar, } from "../../../../_metronic/_partials/controls";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAdminAsync } from "../redux/adminApi";
import { adminActions } from "../redux";

export function AdminsManagement() {
  const { refreshSubAdminList, searchText } = useSelector(
    (state) => state.admin,
    shallowEqual
  );
  const searchSubAdminRef = useRef();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubAdminModalShow = () => {
    history.push("/admin/add-admin");
  };

  const onSearchTextChange = (e) => {
    dispatch(adminActions.searchTextChange(e.target.value));
  };

  useEffect(() => {
    dispatch(getAdminAsync(searchText));
  }, [refreshSubAdminList]);

  return (
    <>
      <Card>
        <CardHeader title="Sub Admin">
          <CardHeaderToolbar>
            <div className="form-group mr-5 mb-1 mt-2">
              <button className="btn_new btn-sm" type="button" onClick={() => handleSubAdminModalShow()}>
                Create Admin
              </button>
            </div>
            <form className="subheader_filter" onSubmit={(e) => e.preventDefault()}>
              <div className="form-row">
                <div className="form-group mr-3 mb-1">
                  <input
                    name="Search"
                    placeholder="Search. . ."
                    type="text"
                    className="form-control"
                    value={searchText}
                    autoComplete="off"
                    onChange={onSearchTextChange}
                    ref={searchSubAdminRef}
                  />
                </div>
              </div>
            </form>
          </CardHeaderToolbar>
        </CardHeader>
        <AdminManagementTable />
      </Card>
    </>
  );
}
