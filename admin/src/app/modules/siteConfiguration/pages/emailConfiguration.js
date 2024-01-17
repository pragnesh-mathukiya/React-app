import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { siteSetUpAsync } from "../redux/siteApi";
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,32}$/;

const EmailConfiguration = (props) => {
  const dispatch = useDispatch();

  const initialValues = {
    type: props.selectedTab,
    smtpHost: props.email?.smtpHost || "",
    smtpPort: props.email?.smtpPort,
    smtpEmail: props.email?.smtpEmail || "",
    smtpPassword: props.email?.smtpPassword || "",
  };

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }
    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }
    return "";
  };

  const emailSchema = () =>
    Yup.object().shape({
      smtpHost: Yup.string()
        .trim()
        .required("Host is required."),
      smtpPort: Yup.string()
        .trim()
        .required("Port is required"),
      smtpEmail: Yup.string()
        .trim()
        .required("Email is required"),
      smtpPassword: Yup.string()
        .trim()
        .matches(
          passwordRegex,
          "Password should contain min 6 and max 32 characters with atleast one Alphanumeric and special character."
        )
        .required("Password is required"),
    });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: emailSchema,
    onSubmit: (values) => {
      dispatch(siteSetUpAsync(values));
    },
  });

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

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
                <label className="form-label">Host</label>
                <input
                  name="smtpHost"
                  className={`form-control wth_chng`}
                  placeholder="Host"
                  type="text"
                  {...formik.getFieldProps("smtpHost")}
                  style={{ paddingRight: "50px" }}
                />
                {formik.touched.smtpHost && formik.errors.smtpHost ? (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                      {formik.errors.smtpHost}
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="form-group">
                <label className="form-label">Port</label>
                <input
                  name="smtpPort"
                  className={`form-control wth_chng`}
                  placeholder="Port"
                  type="text"
                  {...formik.getFieldProps("smtpPort")}
                  style={{ paddingRight: "50px" }}
                />
                {formik.touched.smtpPort && formik.errors.smtpPort ? (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                      {formik.errors.smtpPort}
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  name="smtpEmail"
                  className={`form-control wth_chng`}
                  placeholder="Email"
                  type="text"
                  {...formik.getFieldProps("smtpEmail")}
                  style={{ paddingRight: "50px" }}
                />
                {formik.touched.smtpEmail && formik.errors.smtpEmail ? (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                      {formik.errors.smtpEmail}
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="frpsswrd">
                  <input
                    name="smtpPassword"
                    className={`form-control ${getInputClasses("password")}`}
                    placeholder="Password"
                    type={passwordShown ? "text" : "password"}
                    {...formik.getFieldProps("smtpPassword")}
                    style={{ paddingRight: "50px" }}
                  />
                  <i
                    onClick={togglePasswordVisiblity}
                    className="far fa-eye-slash"
                  ></i>
                  {formik.touched.smtpPassword && formik.errors.smtpPassword ? (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        {formik.errors.smtpPassword}
                      </div>
                    </div>
                  ) : null}
                </div>
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
                      <span> {props.email ? "Update" : "Add"} </span>
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

export default EmailConfiguration;
