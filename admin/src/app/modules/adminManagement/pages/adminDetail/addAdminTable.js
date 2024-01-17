import React, { useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Table, Modal } from "react-bootstrap";
import { deleteAdminAsync, adminActions } from "../../redux";
import BasicPagination from "../../../pagination/BasicPagination";
import { useHistory } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../_metronic/_helpers";
import { CircularProgress } from "@material-ui/core";

const AdminManagementTable = () => {
  const {
    subAdminList,
    subAdminSkip,
    subAdminLimit,
    isSubAdminLoading,
    isLoading,
  } = useSelector((state) => state.admin, shallowEqual);

  const [DeleteModal, setDeleteModal] = useState(false);
  const deleteClose = () => setDeleteModal(false);
  const [selectedSubAdmin, setselectedSubAdmin] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();
  const onPageChange = (currentBatch) => {
    let count = currentBatch ? currentBatch - 1 : subAdminSkip;
    dispatch(adminActions.setSubAdminBatchNumber(count));
  };
  const onEditClick = (subAdmin) => {
    dispatch(adminActions.setSelectedSubAdmin(subAdmin));
    history.push(`/admin/edit-admin/${subAdmin?._id}`);
  };

  const onDeactiveClick = () => {
    dispatch(deleteAdminAsync(selectedSubAdmin._id));
    setselectedSubAdmin({});
    deleteClose();
  };
  return (
    <>

      <div className="px-6 pt-0 dash_wt_bx pb-0 ovflhddn loader-display-position">
        <div className="tblmrgn mt-0">
          <div className="mt-5">
            <div>
              <Table
                hover
                responsive
                className="mb-0 default_table with_hoverbtn mrpdng_tbl"
              >
                <thead>
                  <tr>
                    <th width="60px">Sr No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Status</th>
                    <th width="120px">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {subAdminList.records && subAdminList.records.length ? (
                    subAdminList.records.map((subAdmin, index) => (
                      <tr key={index}>
                        <td>
                          <span className="f-w-500">
                            {subAdminSkip * subAdminLimit + (index + 1)}
                          </span>
                        </td>
                        <td>
                          <span className="f-w-500">{subAdmin.name}</span>
                        </td>
                        <td>
                          <span className="f-w-500">{subAdmin.email}</span>
                        </td>
                        <td>
                          <span className="f-w-500">{subAdmin.dailCode ? subAdmin.dailCode : ""}{subAdmin.mobileNo ? subAdmin.mobileNo : ""}</span>
                        </td>
                        <td>
                          <span className="f-w-500">{subAdmin.status}</span>
                        </td>

                        <td>
                          <button
                            title="Edit"
                            className="btn btn-icon btn-light btn-hover-primary btn-sm mr-3"
                            onClick={() => onEditClick(subAdmin)}
                          >
                            <span className="svg-icon svg-icon-md svg-icon-primary">
                              <SVG
                                src={toAbsoluteUrl(
                                  "/media/svg/icons/Communication/Write.svg"
                                )}
                              />
                            </span>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="text-center">
                        No Record Found
                      </td>
                    </tr>
                  )}
                  {isSubAdminLoading && (
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
            {!isLoading && (
              <div className="row d-flex align-items-center mr-5 ml-5 mt-4">
                <div className="col-md-8 text-right mb-5 aspgntn">
                  <BasicPagination
                    totalRecords={subAdminList && subAdminList.recordsTotal}
                    limit={subAdminLimit}
                    batch={subAdminSkip + 1}
                    onBatchChange={onPageChange}
                  />
                </div>
                <div className="col-md-4 mb-5 fn_s_16 f-w-400 text-right">
                  Displaying {subAdminSkip * subAdminLimit + 1} -{" "}
                  {subAdminSkip * subAdminLimit + subAdminLimit} of{" "}
                  {subAdminList && subAdminList.recordsTotal} Records
                </div>
              </div>
            )}
          </div>
        </div>
        <Modal
          show={DeleteModal}
          onHide={deleteClose}
          centered
          className="def_modal delete_modal"
        >
          <Modal.Header>
            <Modal.Title className="fn_s_18 color_blk f-w-700">
              Alert
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="form def_form frmwtpddng">
              <p className="fn_s_18 f-w-400 text-center mb-10">
                Are you sure want you to delete?
              </p>
              <div className="form-group d-flex flex-wrap justify-content-center align-items-center mb-0">
                <button
                  type="button"
                  className="btn btn-def btn_pdng mr-3"
                  onClick={deleteClose}
                >
                  Keep
                </button>
                <button
                  type="button"
                  className="btn btn-delete btn_pdng"
                  onClick={onDeactiveClick}
                >
                  Yes, Delete
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default AdminManagementTable;
