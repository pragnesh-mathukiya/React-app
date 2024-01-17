import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Table } from "react-bootstrap";
import { getAllReportedUserListAsync, UserManagementActions } from "../userManagement/redux";
import { Card, CardHeader, CardHeaderToolbar } from "../../../_metronic/_partials/controls";
import { CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const ReportedUserManagementTable = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const { isLoading, reportList, searchBy, searchText, dir } = useSelector(
        (state) => state.userManagement,
        shallowEqual
    );

    useEffect(() => {
        dispatch(UserManagementActions.setUserPageLimit(5));
        dispatch(UserManagementActions.setUserBatchNumber(0));
        dispatch(getAllReportedUserListAsync(searchBy, searchText, dir));
    }, []);

    const onReprotRedirectClick = () => {
        history.push("/users-management/reported-users");
    };

    return (
        <div className='row g-5 g-xl-8'>
            <div className='col-xl-6'>
                <Card>
                    <CardHeader title={
                        <>
                            <div className="form-group m-0 d-flex align-items-center">
                                <span className="pl-2">Reported Users</span>
                            </div>
                        </>
                    }
                    >
                        <CardHeaderToolbar>
                            <div className="d-flex flex-wrap ap_filter_wraper justify-content-end align-items-center">
                                <div className="form-row">
                                    <div className="form-group mr-5 mb-1 mt-2">
                                        <button className="btn_new btn-sm" type="button" onClick={() => onReprotRedirectClick()} > View More </button>
                                    </div>
                                </div>
                            </div>
                        </CardHeaderToolbar>
                    </CardHeader>
                    <div className="px-6 pt-0 dash_wt_bx pb-0 ovflhddn loader-display-position">
                        <div className="tblmrgn mt-0">
                            <div className="mt-5">
                                <div>
                                    <Table hover responsive id="myTable" className="mb-0 default_table with_hoverbtn mrpdng_tbl" >
                                        <thead>
                                            <tr>
                                                <th>Sr.no</th>
                                                <th>Who Reported</th>
                                                <th>Whose Reported</th>
                                                <th>Message</th>
                                                <th>Reported On</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reportList.records && reportList.records.length ? (
                                                reportList.records.map((reportLists, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>
                                                                <span className="f-w-500">
                                                                    {0 + (index + 1)}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <span className="f-w-500">{reportLists.fromUserName}</span>
                                                            </td>
                                                            <td>
                                                                <span className="f-w-500">{reportLists.toUserName}</span>
                                                            </td>
                                                            <td>{reportLists.message}</td>
                                                            <td>{new Date(reportLists.createdOn).toLocaleDateString()}</td>
                                                        </tr>
                                                    );
                                                })
                                            ) : (
                                                <tr>
                                                    <td colSpan={8} className="text-center">
                                                        No Record Found
                                                    </td>
                                                </tr>
                                            )}
                                            {isLoading && (
                                                <tr>
                                                    <td colSpan={7} className="text-center">
                                                        <div className="basic-verification-loader text-center">
                                                            {<CircularProgress />}
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card >
            </div>
        </div>
    );
};

export default ReportedUserManagementTable;
