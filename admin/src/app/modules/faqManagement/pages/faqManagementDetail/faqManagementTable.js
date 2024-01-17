import React, { useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Table, Modal } from "react-bootstrap";
// import CircularProgress from "@material-ui/core/CircularProgress";
import {
  deleteFaqAsync,
  faq_managementActions,
} from "../../../faqManagement/redux";
import BasicPagination from "../../../pagination/BasicPagination";
import { useHistory } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../_metronic/_helpers";
import { CircularProgress } from "@material-ui/core";

const FAQManagementTable = () => {
  const { faqList, faqSkip, faqLimit, isFaqLoading } = useSelector(
    (state) => state.faqManagement,
    shallowEqual
  );

  const [DeleteModal, setDeleteModal] = useState(false);
  const deleteClose = () => setDeleteModal(false);
  const deleteShow = () => setDeleteModal(true);
  const [selectedFaq, setselectedFaq] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();
  const onPageChange = (currentBatch) => {
    let count = currentBatch ? currentBatch - 1 : faqSkip;
    dispatch(faq_managementActions.setFaqBatchNumber(count));
  };
  const onEditClick = (faq) => {
    dispatch(faq_managementActions.setSelectedFaq(faq));
    history.push(`/faq-management/edit-faq?faqId=${faq?._id}`);
  };
  const onDeleteClick = (faq) => {
    setselectedFaq(faq);
    deleteShow();
  };
  const onDeactiveClick = () => {
    dispatch(deleteFaqAsync(selectedFaq._id));
    setselectedFaq({});
    deleteClose();
  };
  return (
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
                  <th>Category</th>
                  <th>Question</th>
                  <th>Answer</th>
                  <th>Status</th>
                  <th width="120px">Action</th>
                </tr>
              </thead>
              <tbody>
                {faqList.records && faqList.records.length ? (
                  faqList.records.map((faq, index) => (
                    <tr key={index}>
                      <td>
                        <span className="f-w-500">
                          {faqSkip * faqLimit + (index + 1)}
                        </span>
                      </td>
                      <td>
                        <span className="f-w-500">{faq.category}</span>
                      </td>
                      <td>
                        <span className="f-w-500">{faq.question}</span>
                      </td>
                      <td>{faq.answer}</td>
                      <td>{faq.status}</td>

                      <td>
                        <button
                          title="Edit"
                          className="btn btn-icon btn-light btn-hover-primary btn-sm mr-3"
                          onClick={() => onEditClick(faq)}
                        >
                          <span className="svg-icon svg-icon-md svg-icon-primary">
                            <SVG
                              src={toAbsoluteUrl(
                                "/media/svg/icons/Communication/Write.svg"
                              )}
                            />
                          </span>
                        </button>
                        <button
                          title="Delete"
                          className="btn btn-icon btn-light btn-hover-danger btn-sm"
                          onClick={() => onDeleteClick(faq)}
                        >
                          <span className="svg-icon svg-icon-md svg-icon-danger">
                            <SVG
                              src={toAbsoluteUrl(
                                "/media/svg/icons/General/Trash.svg"
                              )}
                            />
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center">
                      No Record Found
                    </td>
                  </tr>
                )}
                {isFaqLoading && (
                  <tr>
                    <td colSpan={8} className="text-center">
                      <div className="basic-verification-loader text-center">
                        <CircularProgress />
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
          <div className="row d-flex align-items-center mr-5 ml-5 mt-4">
            <div className="col-md-8 text-right mb-5 aspgntn">
              <BasicPagination
                totalRecords={faqList && faqList.recordsTotal}
                limit={faqLimit}
                batch={faqSkip + 1}
                onBatchChange={onPageChange}
              />
            </div>
            <div className="col-md-4 mb-5 fn_s_16 f-w-400 text-right">
              Displaying {faqSkip * faqLimit + 1} -{" "}
              {faqSkip * faqLimit + faqLimit} of{" "}
              {faqList && faqList.recordsTotal} Records
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={DeleteModal}
        onHide={deleteClose}
        centered
        className="def_modal delete_modal"
      >
        <Modal.Header>
          <Modal.Title className="fn_s_18 color_blk f-w-700">Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form def_form frmwtpddng">
            <p className="fn_s_18 f-w-400 text-center mb-10">
              Are you sure want you to delete?
            </p>
            <div className="form-group d-flex flex-wrap justify-content-center align-items-center mb-0">
              <button
                type="button"
                className="btn_new btn-sm mr-3"
                onClick={deleteClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn_new btn-sm"
                onClick={onDeactiveClick}
              >
                Yes, Delete
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default FAQManagementTable;
