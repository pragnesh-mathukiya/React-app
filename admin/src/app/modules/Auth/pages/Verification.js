import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  verifyLoginSecurityCodeAsync,
  resendVerificationCodeAsync,
} from "../redux/authApi";
import { AuthActions } from "../redux/authAction";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

const initialValues = {
  code: "",
};

function Verification() {
  const LoginSchema = Yup.object().shape({
    code: Yup.string()
      .trim()
      .trim()
      .min(3, "Minimum 6 symbols")
      .max(8, "Maximum 8 symbols")
      .required("code is required"),
  });

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }
    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }
    return "";
  };

  const dispatch = useDispatch();

  const history = useHistory();

  const { user, isLoading, flashMessage } = useSelector(
    (state) => state.auth,
    shallowEqual
  );

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      dispatch(verifyLoginSecurityCodeAsync({ code: values.code }));
    },
  });

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        clearInterval(myInterval);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const onBackClick = () => {
    dispatch(AuthActions.resetAuth());
    history.push("/login");
  };

  const resendCode = () => {
    setSeconds(60);
    dispatch(resendVerificationCodeAsync());
  };

  if (!user || !user.twoFactorAuthentication) {
    return <Redirect to="/auth/login" />;
  }

  return (
    <div className="col-xl-4">
      <div className="wt_box">
        <div className="login-form login-signin" id="kt_login_signin_form">
          {/* begin::Head */}
          <div className="text-center mb-10 mb-lg-15">
            <h3 className="font-size-h1">Verification</h3>
            <p className="text-muted font-weight-bold">
              Enter the security code we sent to your registered details
            </p>
          </div>
          {/* end::Head */}

          {/*begin::Form*/}
          {flashMessage ? (
            <div
              className="mb-10 alert alert-custom alert-light-danger alert-dismissible"
              style={{ margin: "auto" }}
            >
              <div className="alert-text font-weight-bold">{flashMessage}</div>
            </div>
          ) : null}
          <form onSubmit={formik.handleSubmit} className="form def_form">
            <div className="form-group fv-plugins-icon-container">
              <label className="form-label">Security Code</label>
              <div className="frpsswrd">
                <input
                  placeholder="Security Code..."
                  type={passwordShown ? "text" : "password"}
                  className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                    "password"
                  )}`}
                  name="code"
                  {...formik.getFieldProps("code")}
                />
                <i
                  onClick={togglePasswordVisiblity}
                  className="far fa-eye-slash"
                ></i>
              </div>
              {formik.touched.code && formik.errors.code ? (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">{formik.errors.code}</div>
                </div>
              ) : null}
            </div>

            <div className="form-group mb-0 mt-5">
              <div className="row">
                <div className="col-md-6 mb-5">
                  <button
                    id="kt_login_signin_submit"
                    type="button"
                    disabled={seconds > 0}
                    className={`btn btn-link `}
                    onClick={resendCode}
                  >
                    <span>Resend</span>
                    {seconds > 0 && <span className="ml-3">{seconds}</span>}
                  </button>
                </div>
                <div className="col-md-6 text-right mb-5">
                  <button
                    id="kt_login_signin_submit"
                    type="submit"
                    disabled={isLoading}
                    className={`btn btn-blue`}
                  >
                    <span>Continue</span>
                    {isLoading && (
                      <span className="ml-3 spinner spinner-white"></span>
                    )}
                  </button>
                </div>
                {/* <div className="col-md-12 text-center mt-10 bottom_links">
                  <OtpTimer seconds={60} onResend={resendCode} />
                </div> */}
                <div className="col-md-12 text-center">
                  <button
                    onClick={onBackClick}
                    className="bckbtn fn_s_14 color_blk f-w-500 opacity50 btnLink"
                  >
                    Back
                  </button>
                </div>
              </div>
            </div>
          </form>
          {/*end::Form*/}
        </div>
      </div>
    </div>
  );
}

export default Verification;
