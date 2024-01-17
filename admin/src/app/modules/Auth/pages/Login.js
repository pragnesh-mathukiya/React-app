import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormattedMessage, injectIntl } from "react-intl";
import { loginAsync } from "../redux/authApi";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

const initialValues = {
  email: "",
  password: "",
};

function Login(props) {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const { intl } = props;

  const { user, flashMessage, isLoading } = useSelector(
    (state) => state.auth,
    shallowEqual
  );

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .email("Enter valid email")
      .required("Email Id is required"),
    password: Yup.string()
      .trim()
      .matches(/^(?!\s*$).+/, "Please enter valid password")
      .min(6, "Please enter valid password")
      .max(32, "Please enter valid password")
      .required("Password is required"),
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

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values, { setStatus }) => {
      try {
        dispatch(
          loginAsync({
            email: values.email,
            password: values.password,
          })
        );
      } catch (error) {
        setStatus(
          intl.formatMessage({
            id: "AUTH.VALIDATION.INVALID_LOGIN",
          })
        );
      }
    },
  });

  if (user && user.twoFactorAuthentication) {
    return <Redirect to="/auth/verification" />;
  }

  return (
    <div className="login-form login-signin" id="kt_login_signin_form">
      {/* begin::Head */}
      <div className="text-center mb-10 mb-lg-20">
        <h3 className="font-size-h1">
          <FormattedMessage id="AUTH.LOGIN.TITLE" />
        </h3>
        <p className="text-muted font-weight-bold">
          Enter your username and password
        </p>
      </div>
      {/* end::Head */}
      {flashMessage ? (
        <div
          className="mb-10 alert alert-custom alert-light-danger alert-dismissible"
          style={{ margin: "auto" }}
        >
          <div className="alert-text font-weight-bold">{flashMessage}</div>
        </div>
      ) : null}
      {/*begin::Form*/}
      <form
        onSubmit={formik.handleSubmit}
        className="form fv-plugins-bootstrap fv-plugins-framework"
      >
        {formik.status ? (
          <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
            <div className="alert-text font-weight-bold">{formik.status}</div>
          </div>
        ) : null}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Email"
            type="email"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "email"
            )}`}
            name="email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.email}</div>
            </div>
          ) : null}
        </div>
        <div className="form-group fv-plugins-icon-container">
          <div className="frpsswrd">
            <input
              placeholder="Password"
              type={passwordShown ? "text" : "password"}
              className={`form-control form-control-solid `}
              name="password"
              {...formik.getFieldProps("password")}
              style={{ paddingRight: "50px" }}
            />
            <i
              onClick={togglePasswordVisiblity}
              className="far fa-eye-slash"
            ></i>
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.password}</div>
            </div>
          ) : null}
        </div>
        <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
          <Link
            to="/auth/forgot-password"
            className="text-dark-50 text-hover-primary my-3 mr-2"
            id="kt_login_forgot"
          >
            <FormattedMessage id="AUTH.GENERAL.FORGOT_BUTTON" />
          </Link>
          <button
            id="kt_login_signin_submit"
            type="submit"
            disabled={isLoading}
            className={`btn btn-blue ${!isLoading ? "" : "lodingTime"}`}
          >
            <span>Continue</span>
            {isLoading && <span className="ml-3 spinner spinner-white"></span>}
          </button>
        </div>
      </form>
      {/*end::Form*/}
    </div>
  );
}

export default injectIntl(Login);
