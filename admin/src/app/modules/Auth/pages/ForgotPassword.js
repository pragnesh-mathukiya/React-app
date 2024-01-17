import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import { injectIntl } from "react-intl";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { forgotPasswordAsync } from "../redux/authApi";

function ForgotPassword(props) {
  const { intl } = props;

  const dispatch = useDispatch();
  const history = useHistory();

  const authState = useSelector((state) => state.auth, shallowEqual);

  const [statusColor, setStatusColor] = useState("danger");

  const initialValues = {
    email: "",
  };

  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .email("Enter valid email")
      .required("Email Id is required"),
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
  const redirectToLogin = () => {
    history.push("/auth/login");
  };
  const formik = useFormik({
    initialValues,
    validationSchema: ForgotPasswordSchema,
    onSubmit: (values, { setStatus }) => {
      try {
        dispatch(forgotPasswordAsync(values.email, redirectToLogin));
      } catch (error) {
        setStatus(
          intl.formatMessage(
            { id: "AUTH.VALIDATION.NOT_FOUND" },
            { name: values.email }
          )
        );
      }
    },
  });

  useEffect(() => {
    if (authState.errors || authState.message) {
      setStatusColor(authState.message ? "primary" : "danger");
      formik.setStatus(authState.errors || authState.message);
    } else {
      formik.setStatus("");
    }
  }, [authState.errors, authState.message]);

  return (
    <>
      <div className="login-form login-forgot" style={{ display: "block" }}>
        <div className="text-center mb-10 mb-lg-20">
          <h3 className="font-size-h1">Forgotten Password ?</h3>
          <div className="text-muted font-weight-bold">
            Enter your email to reset your password
          </div>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"
        >
          {formik.status && (
            <div
              className={`mb-10 alert alert-custom alert-light-${statusColor} alert-dismissible}`}
            >
              <div className="alert-text font-weight-bold">{formik.status}</div>
            </div>
          )}
          <div className="form-group fv-plugins-icon-container">
            <input
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
          <div className="form-group d-flex flex-wrap flex-center">
            <button
              id="kt_login_forgot_submit"
              type="submit"
              className={`btn btn-blue`}
              to="/auth/instructions-sent"
            >
              Submit
            </button>
            <Link to="/auth">
              <button
                type="button"
                id="kt_login_forgot_cancel"
                className="btn btn-outline-def my-3 mx-4"
              >
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default injectIntl(ForgotPassword);
