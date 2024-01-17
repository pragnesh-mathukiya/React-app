import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addFaqAsync } from "../../redux/faqManagementApi";
import { useDispatch } from "react-redux";
// import CircularProgress from "@material-ui/core/CircularProgress";
import { useHistory } from "react-router-dom";
import SVG from "react-inlinesvg";
import Select from "react-select";
import {
  Card,
  CardHeader,
  CardBody,
} from "../../../../../_metronic/_partials/controls";
import { toAbsoluteUrl } from "../../../../../_metronic/_helpers";
import { Col, Row } from "react-bootstrap";

const CreateFaqManagement = ({ isLoading }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const addFaqSchema = () =>
    Yup.object().shape({
      question: Yup.string()
        .trim()
        .min(3, "Minimum 3 characters")
        .required("Question is required"),
      answer: Yup.string()
        .trim()
        .min(3, "Minimum 3 characters")
        .required("Answer is required"),
      category: Yup.string()
        .trim()
        .notOneOf(
          ["null", "NULL", "Null", "Undefined", "undefined"],
          "Category is required"
        )
        .required("Category is required"),
      status: Yup.string()
        .trim()
        .notOneOf(
          ["null", "NULL", "Null", "Undefined", "undefined"],
          "Status is required"
        )
        .required("Status is required"),
    });

  const list = [
    { value: "General Question", label: "General Question" },
    {
      value: "Fantasy Specific Questions",
      label: "Fantasy Specific Questions",
    },
  ];
  const status = [
    { value: "active", label: "ACTIVE" },
    { value: "inactive", label: "INACTIVE" },
  ];

  const goback = () => {
    history.goBack();
  };
  const formik = useFormik({
    initialValues: {
      question: "",
      answer: "",
      category: "",
      status: "active",
    },
    enableReinitialize: true,
    validationSchema: addFaqSchema,
    onSubmit: async (values, { resetForm }) => {
      dispatch(addFaqAsync(values));
      resetForm();
      goback();
    },
  });

  const handleChange = (events) => {
    formik.setFieldValue("category", events.value);
  };
  const handleStatusChange = (events) => {
    console.log(events.value)
    formik.setFieldValue("status", events.value);
  };

  return (
    <>
      <form className="form def_form frmwtpddng" onSubmit={formik.handleSubmit}>
        <Card>
          <CardHeader
            title={
              <div className="form-group m-0 d-flex align-items-center">
                <button className="btn btn-link px-0" onClick={() => goback()}>
                  <SVG
                    className="h-50 align-self-center"
                    src={toAbsoluteUrl(
                      "/media/svg/icons/Navigation/Arrow-left.svg"
                    )}
                  />
                  Back
                </button>
                <span className="pl-2">{"Add FAQ"}</span>
              </div>
            }
          ></CardHeader>
          <CardBody>
            <Row className="justify-content-center">
              <Col lg={8}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="pho_14_500">Category</label>
                        <Select
                          name="category"
                          placeholder="Select Category"
                          className={`form-control border-0 p-0 `}
                          classNamePrefix="phoSelect"
                          options={list}
                          onChange={handleChange}
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
                        {formik.touched.category && formik.errors.category ? (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block">
                              {formik.errors.category}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="form-label">Question</label>
                        <input
                          placeholder="Enter Question"
                          autoComplete="off"
                          type="text"
                          className={`form-control`}
                          name="question"
                          {...formik.getFieldProps("question")}
                        />
                        {formik.touched.question && formik.errors.question ? (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block">
                              {formik.errors.question}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="form-label">Answer</label>
                        <textarea
                          placeholder="Enter Answer"
                          type="text"
                          className={`form-control`}
                          name="answer"
                          {...formik.getFieldProps("answer")}
                        />
                        {formik.touched.answer && formik.errors.answer ? (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block">
                              {formik.errors.answer}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="pho_14_500">Status</label>
                        <Select
                          name="status"
                          placeholder="Select Status"
                          className={`form-control border-0 p-0 `}
                          classNamePrefix="phoSelect"
                          options={status}
                          onChange={handleStatusChange}
                          defaultValue={[
                            {
                              value: status[0].value,
                              label: status[0].label,
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
                        {formik.touched.status && formik.errors.status ? (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block">
                              {formik.errors.status}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="form-group d-flex flex-wrap justify-content-center align-items-center mb-0 mt-4">
                      <div className="form-group mr-5 mb-1 mt-2">
                        <button
                          type="submit"
                          className="btn btn-blue spinnerBtn"
                          disabled={isLoading}
                        >
                          Save
                          {isLoading && (
                            <div className="ml-3 basic-verification-loader text-center">
                              {/* <CircularProgress /> */}
                            </div>
                          )}
                        </button>
                      </div>
                      <div className="mr-5 mb-1 mt-2">
                        <button
                          type="button"
                          className="btn btn-outline-blue"
                          onClick={() => history.push("/faq-management")}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </form>
    </>
  );
};

export default CreateFaqManagement;
