import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import FAQManagementTable from "./faqManagementDetail/faqManagementTable";
import {
  Card,
  CardHeader,
  CardHeaderToolbar,
} from "./../../../../_metronic/_partials/controls";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getFaqAsync } from "../redux/faqManagementApi";

export const FaqManagement = () => {
  const { refreshFaqList } = useSelector(
    (state) => state.faqManagement,
    shallowEqual
  );
  const dispatch = useDispatch();
  const history = useHistory();

  const handleFaqModalShow = () => {
    history.push("/faq-management/add-faq");
  };

  useEffect(() => {
    // if (params !== null && params !== undefined) {
    dispatch(getFaqAsync());
    // } else {
    //   return history.push("/faq-management");
    // }
  }, [dispatch, refreshFaqList]);

  return (
    <>
      <Card>
        <CardHeader title="FAQ Management">
          <CardHeaderToolbar>
            <div className="form-group mr-5 mb-1 mt-2">
              <button
                className="btn_new btn-sm"
                type="button"
                onClick={() => handleFaqModalShow()}
              >
                Create Faq
              </button>
            </div>
          </CardHeaderToolbar>
        </CardHeader>
        <FAQManagementTable />
      </Card>
    </>
  );
};
