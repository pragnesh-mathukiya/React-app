import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { resetPasswordAsync } from "../redux/profileApi";

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,32}$/;

const ProfileChangePassword = (props) => {
  const { isLoading } = useSelector((state) => state.profile, shallowEqual);

  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const PasswordSchema = () =>
    Yup.object().shape({
      oldPassword: Yup.string()
        .trim()
        .required("Enter valid current password."),
      newPassword: Yup.string()
        .trim()
        .matches(
          passwordRegex,
          "Password should contain min 6 and max 32 characters with atleast one Alphanumeric and special character."
        )
        .required("Please enter password."),
      confirmPassword: Yup.string()
        .trim()
        .oneOf(
          [Yup.ref("newPassword"), null],
          "New password and confirm password didn't match"
        )
        .required("Please enter confirm password."),
    });

  const formik = useFormik({
    initialValues,
    validationSchema: PasswordSchema,
    onSubmit: (values, { resetForm }) => {
      resetPassword(values);
      resetForm({ values: "" });
    },
  });

  useEffect(() => {
    if (props && props.selectedTab !== "change-password") {
      formik.resetForm();
    }
  }, [props, props.selectedTab]);

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const [passwordShown_v2, setPasswordShown_v2] = useState(false);
  const togglePasswordVisiblity_v2 = () => {
    setPasswordShown_v2(passwordShown_v2 ? false : true);
  };

  const [passwordShown_v3, setPasswordShown_v3] = useState(false);
  const togglePasswordVisiblity_v3 = () => {
    setPasswordShown_v3(passwordShown_v3 ? false : true);
  };

  const dispatch = useDispatch();

  const resetPassword = (values) => {
    dispatch(
      resetPasswordAsync({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      })
    );
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
                <label className="form-label">Current Password</label>
                <div className="frpsswrd">
                  <input
                    name="oldPassword"
                    className={`form-control ${getInputClasses("password")}`}
                    placeholder="Password"
                    type={passwordShown ? "text" : "password"}
                    {...formik.getFieldProps("oldPassword")}
                    style={{ paddingRight: "50px" }}
                  />
                  <i
                    onClick={togglePasswordVisiblity}
                    className="far fa-eye-slash"
                  ></i>
                  {formik.touched.oldPassword && formik.errors.oldPassword ? (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        {formik.errors.oldPassword}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">New Password</label>
                <div className="frpsswrd">
                  <input
                    name="newPassword"
                    className={`form-control ${getInputClasses("password")}`}
                    placeholder="Password"
                    type={passwordShown_v2 ? "text" : "password"}
                    {...formik.getFieldProps("newPassword")}
                    style={{ paddingRight: "50px" }}
                  />
                  <i
                    onClick={togglePasswordVisiblity_v2}
                    className="far fa-eye-slash"
                  ></i>
                  {formik.touched.newPassword && formik.errors.newPassword ? (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        {formik.errors.newPassword}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <div className="frpsswrd">
                  <input
                    name="confirmPassword"
                    className={`form-control ${getInputClasses("password")}`}
                    placeholder="Password"
                    type={passwordShown_v3 ? "text" : "password"}
                    {...formik.getFieldProps("confirmPassword")}
                    style={{ paddingRight: "50px" }}
                  />
                  <i
                    onClick={togglePasswordVisiblity_v3}
                    className="far fa-eye-slash"
                  ></i>
                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword ? (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        {formik.errors.confirmPassword}
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
                      disabled={isLoading}
                    >
                      <span>Update</span>
                      {isLoading && (
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

export default ProfileChangePassword;
