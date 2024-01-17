import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { updateUserProfileAsync } from "../redux/profileApi";
import { regexValidation } from "../../../../_metronic/_helpers";
import Select from "react-select";

const ProfileBasicDetails = (props) => {
  const [file, setFile] = useState({ file: null, url: "" });
  let [callingCode, setCallingCode] = useState([]);
  const { user, isLoading } = useSelector((state) => state.auth, shallowEqual);

  const dispatch = useDispatch();
  const initialValues = {
    email: user.email || "",
    contactNumber: user.contactNumber || "",
    name: user.name || "",
    dailCode: user.mobileDetails ? user.mobileDetails.dailCode : "+91",
    mobileNo: user.mobileDetails ? user.mobileDetails.mobileNo : "",
  };

  const ProfileSchema = () =>
    Yup.object().shape({
      name: Yup.string()
        .trim()
        .required("Full name is required"),
      email: Yup.string()
        .trim()
        .email("Enter valid email")
        .min(3, "Minimum 3 characters")
        .max(50, "Maximum 50 characters")
        .required("Email is required"),
      mobileNo: Yup.string()
        .trim()
        .notOneOf(
          ["null", "NULL", "Null", "Undefined", "undefined"],
          "Mobile Number is required"
        )
        .matches(
          regexValidation.MOBILE_NUMBER_REGEX,
          "Mobile Number is not valid"
        )
        .required("Mobile number is required"),
      dailCode: Yup.string()
        .trim()
        .notOneOf(
          ["null", "NULL", "Null", "Undefined", "undefined"],
          "Dail code is required"
        )
        .required("Dail code is required"),

    });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: ProfileSchema,
    onSubmit: (values, { setErrors, resetForm }) => {
      let data = null;
      data = new FormData();
      if (file && file.file) {
        let randomString = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 8; i++) {
          randomString += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        let fileName = randomString + new Date().getTime() + '.jpg';
        data.append("profilePicture", file.file, fileName);
      }
      data.append("name", values.name);
      data.append("email", values.email);
      data.append("dailCode", values.dailCode ? values.dailCode : "+91");
      data.append("mobileNo", values.mobileNo ? values.mobileNo : "");

      // if (isValidPhoneNumber(values && values.mobileNo)) {
      dispatch(updateUserProfileAsync(data));
      resetForm();
      // } else {
      //   setErrors({ mobileNo: "Invalid mobile number" });
      // }
    },
  });

  useEffect(() => {
    if (props && props.selectedTab !== "basic-details") {
      formik.resetForm();
    }
  }, [props, props.selectedTab]);

  const uploadImage = (e) => {
    setFile({
      url: URL.createObjectURL(e.target.files[0]),
      file: e.target.files[0],
    });
  };

  return (
    <>
      <div className="tblmrgn mt-0 lwpddng cstm_pddng">
        <div className="row justify-content-center">
          <div className="col-xl-5 col-md-6-as">
            <form
              className="form def_form frmwtpddng"
              onSubmit={formik.handleSubmit}
            >
              <div className="row">
                <div className="col-md-12 text-center mb-4">
                  <div
                    className="pro_img"
                    style={{
                      backgroundImage: `url(${file.url ||
                        user.profilePicture})`,
                    }}
                  >
                    <input
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      onChange={uploadImage}
                    />
                    <div className="edt_img_btn">
                      <span className="material-icons">edit</span>EDIT
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                      placeholder="Full Name"
                      type="text"
                      className={`form-control wth_chng`}
                      name="name"
                      {...formik.getFieldProps("name")}
                    />
                    {formik.touched.name && formik.errors.name ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          {formik.errors.name}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="col-lg-2">
                  <div className="form-group">
                    <label className="form-label">Mobile No</label>

                    <Select classNamePrefix="react-select" name="dailCode" placeholder="Select Dail Code" className={`form-control border-0 p-0 `}
                      options={callingCode}
                      defaultValue={[{ value: formik.values.dailCode, label: formik.values.dailCode }]}
                      onChange={(e) => { formik.values.dailCode = e.value }}
                      theme={(theme) => ({
                        ...theme,
                        colors: {
                          ...theme.colors,
                          primary25: "#DCF4E4",
                          primary75: "#DCF4E4",
                          primary50: "#DCF4E4",
                          primary: "#50C878",
                        },
                      })}
                    />
                    {formik.touched.dailCode && formik.errors.dailCode ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.dailCode}</div>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="col-lg-10 ">
                  <div className="form-group">
                    <label className="form-label"></label>
                    <input
                      placeholder="Mobile Number"
                      type="text"
                      className={`form-control`}
                      style={{ marginTop: "7px" }}
                      name="mobileNo"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      defaultValue={formik.values.mobileNo}
                    />
                    {
                      formik.touched.mobileNo && formik.errors.mobileNo ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">{formik.errors.mobileNo}</div>
                        </div>
                      ) : null
                    }
                  </div>
                </div>
                {/* <div className="col-lg-12">
                  <div className="form-group">
                    <label className="form-label">Phone</label>

                    <input
                      placeholder="Enter contact number(i.e. +99123456789)"
                      type="text"
                      className={`form-control wth_chng`}
                      name="contactNumber"
                      {...formik.getFieldProps("contactNumber")}
                    />
                    {formik.touched.contactNumber &&
                      formik.errors.contactNumber ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          {formik.errors.contactNumber}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div> */}
                <div className="col-lg-12">
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <div className="re_grpPhone position-relative">
                      <input
                        placeholder="username@company.com"
                        type="email"
                        className={`form-control wth_chng`}
                        name="email"
                        {...formik.getFieldProps("email")}
                      />
                    </div>
                    {formik.touched.email && formik.errors.email ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          {formik.errors.email}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="form-group d-flex flex-wrap justify-content-center align-items-center mb-0 mt-4">
                <button
                  type="submit"
                  disabled={Object.keys(formik.errors).length > 0}
                  className="btn btn-blue defpddng"
                >
                  <span>Update</span>
                  {isLoading && (
                    <span className="ml-3 spinner spinner-white"></span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileBasicDetails;
