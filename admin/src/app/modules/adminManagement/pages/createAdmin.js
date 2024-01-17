/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { Formik, Form } from "formik";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Card, CardHeader, CardBody } from "../../../../_metronic/_partials/controls";
import * as Yup from "yup";
import { updateAdminAsync } from "../redux";
import { adminAsync } from "../redux";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import Select from "react-select";
import { useParams, Redirect, Link, useHistory } from "react-router-dom";
import { regexValidation } from "../../../../_metronic/_helpers/RegexValidationHelpers";
import { CircularProgress } from "@material-ui/core";
import { getRolePermissionAsync, getAdminDetailAsync } from "../redux/adminApi";

const UpdateAdmin = () => {
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  let [callingCode, setCallingCode] = useState([]);
  const { selectedSubAdmin, isSubAdminLoading, rolePermissionList, } = useSelector((state) => state.admin, shallowEqual);

  useEffect(() => {
    dispatch(getRolePermissionAsync());
    if (!params?.id) {
      setFile("");
    }
    if (params?.id) {
      dispatch(getAdminDetailAsync(params.id));
    }
  }, []);

  const [file, setFile] = useState({
    file: selectedSubAdmin?.profilePicture,
    url: selectedSubAdmin?.profilePicture,
  });

  // useEffect(() => {
  //   let arr = []
  //   dailCode.map((ele) => {
  //     arr.push({ value: ele.callingCode, label: ele.callingCode })
  //   })
  //   setCallingCode(arr);
  // }, [dailCode]);

  if (!selectedSubAdmin && params?.id !== undefined) {
    return <Redirect to="/admin" />;
  }


  const initialValues = {
    name: "",
    email: "",
    status: "active",
    permissions: [],
    dailCode: "+91",
    mobileNo: "",
    profilePicture: selectedSubAdmin.profilePicture || "",
  };

  const redirectBack = () => {
    history.push("/admin");
  };
  const subAdminSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .notOneOf(
        ["null", "NULL", "Null", "Undefined", "undefined"],
        "Please enter valid name "
      )
      .required("Please enter name"),
    email: Yup.string()
      .trim()
      .matches(regexValidation.EMAIL_REGEX, "Invalid email")
      .notOneOf(
        ["null", "NULL", "Null", "Undefined", "undefined"],
        "Please enter valid email "
      )
      .required("Please enter email"),
    status: Yup.string()
      .trim()
      .notOneOf(
        ["null", "NULL", "Null", "Undefined", "undefined"],
        "Status is required"
      )
      .required("Status is required"),
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
  const status = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];
  const goback = () => {
    history.goBack();
  };

  const uploadImage = (e) => {
    setFile({
      url: URL.createObjectURL(e.target.files[0]),
      file: e.target.files[0],
    });
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={
          selectedSubAdmin && params?.id !== undefined
            ? selectedSubAdmin
            : initialValues
        }
        validationSchema={subAdminSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          let formData = new FormData();
          if (file && file.file) {
            let randomString = '';
            let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for (let i = 0; i < 8; i++) {
              randomString += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            let fileName = randomString + new Date().getTime() + '.jpg';
            formData.append("profilePicture", file.file, fileName);
          }
          formData.append("name", values.name);
          formData.append("email", values.email);
          formData.append("dailCode", values.dailCode ? values.dailCode : "+91");
          formData.append("mobileNo", values.mobileNo ? values.mobileNo : "");
          formData.append("status", values.status);
          values.permissions.forEach((item) =>
            formData.append("permissions", item)
          );
          if (selectedSubAdmin && params?.id !== undefined) {
            dispatch(
              updateAdminAsync(formData, params.id, setSubmitting, resetForm, redirectBack)
            );
          } else {
            dispatch(
              adminAsync(formData, setSubmitting, resetForm, redirectBack)
            );
          }
          resetForm();
          goback();
        }}
      >
        {({
          // values, errors, touched, handleBlur, handleChange
          values,
          errors,
          touched,
          isSubmitting,
          handleBlur,
          handleChange,
          setFieldValue,
          setFieldTouched,
        }) => (
          <Card>
            <CardHeader
              title={
                <div className="form-group m-0 d-flex align-items-center">
                  <button
                    className="btn btn-link px-0"
                    onClick={() => goback()}
                  >
                    <SVG
                      className="h-50 align-self-center"
                      src={toAbsoluteUrl(
                        "/media/svg/icons/Navigation/Arrow-left.svg"
                      )}
                    />
                    Back
                  </button>
                  <span className="pl-2">
                    {selectedSubAdmin && params?.id !== undefined
                      ? "Edit Admin"
                      : "Add Admin"}
                  </span>
                </div>
              }
            ></CardHeader>
            <CardBody>
              {isSubAdminLoading && (
                <div className="ml-3 basic-verification-loader text-center">
                  {<CircularProgress />}
                </div>
              )}
              <Row className="justify-content-center">
                <Col lg={8}>
                  <Form>
                    <Row>
                      <div className="col-md-12">
                        <div className="col-md-12 text-center mb-4">
                          <div className="pro_img" style={{ backgroundImage: `url(${file.url ? file.url : params?.id && values && values.profilePicture ? values.profilePicture : "https://test-bucketstaging.s3.us-east-2.amazonaws.com/fulImage/1656417459984blank.png"})` }}>
                            <input type="file" accept=".png, .jpg, .jpeg" onChange={uploadImage} />
                            <div className="edt_img_btn">
                              <span className="material-icons">edit</span>EDIT
                            </div>
                          </div>
                        </div>
                      </div>
                    </Row>

                    <div className="form-group">
                      <label className="pho_14_500">Name</label>
                      <input
                        placeholder="Enter Name"
                        autoComplete="off"
                        type="text"
                        name="name"
                        className={
                          errors.name && touched.name
                            ? "form-control re_inputRouded is-invalid"
                            : "form-control re_inputRouded"
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                      />
                      {touched.name && errors.name ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">{errors.name}</div>
                        </div>
                      ) : null}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input
                        placeholder="Enter Email"
                        autoComplete="off"
                        type="email"
                        name="email"
                        className={
                          errors.email && touched.email
                            ? "form-control re_inputRouded is-invalid"
                            : "form-control re_inputRouded"
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                      {touched.email && errors.email ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">{errors.email}</div>
                        </div>
                      ) : null}
                    </div>

                    <div className="row">
                      <div className="col-lg-2">
                        <div className="form-group">
                          <label className="form-label">Mobile No</label>

                          <Select classNamePrefix="react-select" name="dailCode" placeholder="Select Dail Code" className={`form-control border-0 p-0 `}
                            options={callingCode}
                            value={[{ value: values.dailCode, label: values.dailCode }]}
                            onChange={(e) => { values.dailCode = e.value }}
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
                          {touched.dailCode && errors.dailCode ? (
                            <div className="fv-plugins-message-container">
                              <div className="fv-help-block">{errors.dailCode}</div>
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
                            onChange={handleChange}
                            onBlur={handleBlur}
                            defaultValue={values.mobileNo}
                          />
                          {
                            touched.mobileNo && errors.mobileNo ? (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">{errors.mobileNo}</div>
                              </div>
                            ) : null
                          }
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="pho_14_500">Status</label>
                      <Select
                        name="status"
                        placeholder="Select Status"
                        className={`form-control border-0 p-0 `}
                        classNamePrefix="phoSelect"
                        options={status}
                        onChange={(e) => {
                          values.status = e.value;
                        }}
                        defaultValue={[
                          {
                            value: values.status,
                            label: (values.status === 'active') ? 'Active' : 'Inactive',
                          },
                        ]}
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
                      {touched.status && errors.status ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">{errors.status}</div>
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Permissions</label>
                      {rolePermissionList && rolePermissionList.length ? (
                        rolePermissionList.map((rolePermission, index) => (
                          <div key={rolePermission._id}>
                            <input
                              key={rolePermission._id}
                              type="checkbox"
                              name="permissions"
                              onChange={handleChange}
                              id={rolePermission._id}
                              value={rolePermission.slug}
                              checked={
                                (values.permissions &&
                                  values.permissions.length) >= 0
                                  ? values.permissions.includes(
                                    rolePermission.slug
                                  )
                                  : ""
                              }
                              style={{ margin: "10px 10px 10px 10px" }}
                            />
                            <span>{rolePermission.title}</span>
                          </div>
                        ))
                      ) : (
                        <div>No Record Found</div>
                      )}
                    </div>

                    <div className="form-group d-flex flex-wrap justify-content-center align-items-center mb-0 mt-4">
                      <div className="mr-5 mb-1 mt-2">
                        <Link className="btn btn-outline-blue" to="/admin">
                          Close
                        </Link>
                      </div>
                      <div className="mb-1 mt-2">
                        <Button
                          variant="blue"
                          className="px-5 defpddng spinnerBtn"
                          size="lg"
                          type="submit"
                          disabled={isSubAdminLoading}
                        >
                          {selectedSubAdmin && params?.id !== undefined
                            ? "Update"
                            : "Submit"}
                          {/* {isSubAdminLoading && (
                            <div className="ml-3 basic-verification-loader text-center">
                              {<CircularProgress />}
                            </div>
                          )} */}
                        </Button>
                      </div>
                    </div>
                    <div className="text-center"></div>
                  </Form>
                </Col>
              </Row>
            </CardBody>
          </Card>
        )}
      </Formik>
    </>
  );
};
export default UpdateAdmin;
