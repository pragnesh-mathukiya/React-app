import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllcmsAsync, deleteCMSAsync } from "../redux/cmsApi";
import CmsPagesTable from "./cmsPageDetail/cmsPagesTable";
import {
  Card,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../_metronic/_partials/controls";
import { CmsActions } from "../redux/cmsAction";

export function CmsPages() {
  const [DeleteModal, setDeleteModal] = useState(false);
  const deleteClose = () => setDeleteModal(false);
  const deleteShow = () => setDeleteModal(true);

  const [selectedID, setSelectedID] = useState();

  const { isLoading, cmsLists, refreshCms } = useSelector(
    (state) => state.cms,
    shallowEqual
  );

  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    if (refreshCms) {
      dispatch(getAllcmsAsync());
    }
  }, [refreshCms, dispatch]);

  const onDeleteClick = (id) => {
    setSelectedID(id);
    deleteShow();
  };

  const onDeactiveClick = () => {
    dispatch(deleteCMSAsync(selectedID._id));
    setSelectedID({});
    deleteClose();
  };

  const onSelectCMS = (cms) => {
    dispatch(CmsActions.setSelectedCMS(cms));
    history.push(`/cms-pages/cms-page-detail`);
  };

  return (
    <>
      <Card>
        <CardHeader title="CMS">
          <CardHeaderToolbar>
            <div className="form-group mr-5 mb-1 mt-2">
              <button
                className="btn_new btn-sm"
                type="button"
                onClick={() => onSelectCMS({})}
              >
                Add
              </button>
            </div>
          </CardHeaderToolbar>
        </CardHeader>
        <CmsPagesTable
          cmsLists={cmsLists}
          onSelectCMS={onSelectCMS}
          onDeleteClick={onDeleteClick}
          isLoading={isLoading}
        />
      </Card>

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
              Are you sure want to delete?
            </p>
            <div className="form-group d-flex flex-wrap justify-content-center align-items-center mb-0">
              <div className="form-group mr-5 mb-1 mt-2">
                <button
                  className="btn_new btn-sm"
                  type="button"
                  onClick={deleteClose}
                >
                  Close
                </button>
              </div>
              <div className="form-group mr-5 mb-1 mt-2">
                <button
                  className="btn_new btn-sm"
                  type="button"
                  onClick={onDeactiveClick}
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
