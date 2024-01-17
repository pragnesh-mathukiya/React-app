import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { siteSetUpAsync } from "../redux/siteApi";

const SmsConfiguration = (props) => {
  const dispatch = useDispatch();

  const initialValues = {
    type: props.selectedTab,
    smsAccountSid: props.sms?.smsAccountSid || "",
    smsAuthToken: props.sms?.smsAuthToken || "",
    smsFrom: props.sms?.smsFrom || "",
  };

  const smsSchema = () =>
    Yup.object().shape({
      smsAccountSid: Yup.string()
        .trim()
        .required("Account Sid is required."),
      smsAuthToken: Yup.string()
        .trim()
        .required("AuthToken is required"),
      smsFrom: Yup.string()
        .trim()
        .required("Number is required"),
    });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: smsSchema,
    onSubmit: (values) => {
      dispatch(siteSetUpAsync(values));
    },
  });

  return (
    <>
      <div className="tblmrgn mt-0 lwpddng cstm_pddng mn_height_500">
        <div className="row justify-content-center">
          <div className="col-xl-4 col-md-4-as mt-5">
            <form
              className="form def_form text-left"
              onSubmit={formik.handleSubmit}
            >
              <div className="form-group">
                <label className="form-label">Account Sid</label>
                <input
                  name="smsAccountSid"
                  className={`form-control wth_chng`}
                  placeholder="Account Sid"
                  type="text"
                  {...formik.getFieldProps("smsAccountSid")}
                  style={{ paddingRight: "50px" }}
                />
                {formik.touched.smsAccountSid && formik.errors.smsAccountSid ? (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                      {formik.errors.smsAccountSid}
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="form-group">
                <label className="form-label">Auth Token</label>
                <input
                  name="smsAuthToken"
                  className={`form-control wth_chng`}
                  placeholder="Auth Token"
                  type="text"
                  {...formik.getFieldProps("smsAuthToken")}
                  style={{ paddingRight: "50px" }}
                />
                {formik.touched.smsAuthToken && formik.errors.smsAuthToken ? (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                      {formik.errors.smsAuthToken}
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="form-group">
                <label className="form-label">Sender Number</label>
                <input
                  name="smsFrom"
                  className={`form-control wth_chng`}
                  placeholder="Sender Number"
                  type="text"
                  {...formik.getFieldProps("smsFrom")}
                  style={{ paddingRight: "50px" }}
                />
                {formik.touched.smsFrom && formik.errors.smsFrom ? (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">{formik.errors.smsFrom}</div>
                  </div>
                ) : null}
              </div>
              <div className="form-group mb-0 mt-0">
                <div className="row">
                  <div className="col-md-12 text-center mb-0">
                    <button
                      id="kt_login_signin_submit"
                      type="submit"
                      className="btn btn-blue defpddng"
                      disabled={props.isLoading}
                    >
                      <span> {props.sms ? "Update" : "Add"} </span>
                      {props.isLoading && (
                        <span className="ml-3 spinner spinner-white"></span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SmsConfiguration;
