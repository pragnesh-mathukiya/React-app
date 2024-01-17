import React, { useState } from "react";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import { setNewPasswordAsync } from "../redux/authApi";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

function SetNewPassword() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const [passwordShown_v2, setPasswordShown_v2] = useState(false);
  const togglePasswordVisiblity_v2 = () => {
    setPasswordShown_v2(passwordShown_v2 ? false : true);
  };

  const PasswordSchema = () =>
    Yup.object().shape({
      password: Yup.string()
        .trim()
        .min(6, "Minimum 6 characters")
        .max(20, "Maximum 20 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .trim()
        .test("passwords-match", "Passwords must match", function(value) {
          return this.parent.password === value;
        }),
    });

  const params = useParams();

  const redirectBack = () => {
    history.push("/auth/login");
  };

  const onSetPassword = (values, resetForm) => {
    resetForm();
    dispatch(
      setNewPasswordAsync(
        {
          passwordToken: params.passwordToken,
          password: values.password,
        },
        redirectBack
      )
    );
  };

  if (!params.passwordToken) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Formik
        initialValues={{
          password: "",
          confirmPassword: "",
        }}
        validationSchema={PasswordSchema}
        onSubmit={(values, { resetForm }) => {
          onSetPassword(values, resetForm);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <div className="login-form login-signin" id="kt_login_signin_form">
              <div className="text-center mb-10 mb-lg-15">
                <h3 className="font-size-h1">Set New Password</h3>
                <p className="text-muted font-weight-bold">
                  Please never share with anyone for safe use.
                </p>
              </div>

              <Form className="form text-left" onSubmit={handleSubmit}>
                <div className="form-group fv-plugins-icon-container">
                  <div className="frpsswrd">
                    <Field
                      placeholder="New Password"
                      type={passwordShown ? "text" : "password"}
                      className={`form-control form-control-solid h-auto py-5 px-6 `}
                      name="password"
                    />
                    <i
                      onClick={togglePasswordVisiblity}
                      className="far fa-eye-slash"
                    ></i>
                  </div>
                </div>
                <div className="form-group fv-plugins-icon-container">
                  <div className="frpsswrd">
                    <Field
                      placeholder="Confirm Password"
                      type={passwordShown_v2 ? "text" : "password"}
                      className={`form-control form-control-solid h-auto py-5 px-6 `}
                      name="confirmPassword"
                    />
                    <i
                      onClick={togglePasswordVisiblity_v2}
                      className="far fa-eye-slash"
                    ></i>
                  </div>
                </div>
                <div className="form-group mb-0 mt-0">
                  <div className="row">
                    <div className="col-md-12 text-center mb-0">
                      <button
                        id="kt_login_signin_submit"
                        type="submit"
                        className="btn btn-blue"
                      >
                        <span>Submit</span>
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
              <div className="text-center mt-15">
                <p className="opacity60 fn_s_14 color_blk f-w-400">
                  If you don't want to set new password
                </p>
                <Link
                  to="/auth"
                  className="bckbtn fn_s_14 color_blue f-w-500 uppercase"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          </>
        )}
      </Formik>
    </>
  );
}
export default SetNewPassword;
