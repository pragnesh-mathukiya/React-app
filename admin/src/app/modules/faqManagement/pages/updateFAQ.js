import React from "react";
import { Col, Row, Button } from "react-bootstrap";
import { Formik, Form } from "formik";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useHistory } from "react-router-dom";
// import CircularProgress from "@material-ui/core/CircularProgress";
import {
  Card,
  CardHeader,
  CardBody,
} from "../../../../_metronic/_partials/controls";
import * as Yup from "yup";
import { updateFaqAsync } from "../../faqManagement/redux";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import Select from "react-select";

const UpdateFAQ = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { selectedFaq, isFaqLoading } = useSelector(
    (state) => state.faqManagement,
    shallowEqual
  );
  const initialValues = {
    question: "",
    answer: "",
    category: "",
    status: "active",
  };

  const addFaqSchema = Yup.object().shape({
    question: Yup.string()
      .trim()
      .notOneOf(
        ["null", "NULL", "Null", "Undefined", "undefined"],
        "Please enter valid question "
      )
      .required("Please enter question"),
    answer: Yup.string()
      .trim()
      .notOneOf(
        ["null", "NULL", "Null", "Undefined", "undefined"],
        "Please enter valid answer "
      )
      .required("Please enter answer"),
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
  // const handleChange1 = (events) => {
  //   useFor.setFieldValue("category", events.value)
  // }
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={
          Object.keys(selectedFaq).length <= 0 ? initialValues : selectedFaq
        }
        validationSchema={addFaqSchema}
        onSubmit={(values, { resetForm }) => {
          dispatch(updateFaqAsync(values, selectedFaq && selectedFaq._id));
          resetForm();
          goback();
        }}
      >
        {({ values, errors, touched, handleBlur, handleChange }) => (
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
                    {selectedFaq ? "Edit FAQ" : "Add FAQ"}
                  </span>
                </div>
              }
            ></CardHeader>
            <CardBody>
              <Row className="justify-content-center">
                <Col lg={8}>
                  <Form>
                    <div className="form-group">
                      <label className="pho_14_500">Category</label>
                      <Select
                        name="category"
                        placeholder="Select Category"
                        className={`form-control border-0 p-0 `}
                        classNamePrefix="phoSelect"
                        options={list}
                        defaultValue={[
                          {
                            value: values.category,
                            label: values.category,
                          },
                        ]}
                        onChange={(e) => {
                          values.category = e.value;
                        }}
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
                      {touched.category && errors.category ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">{errors.category}</div>
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Question</label>
                      <input
                        placeholder="Enter Question"
                        autoComplete="off"
                        type="text"
                        name="question"
                        className={
                          errors.question && touched.question
                            ? "form-control re_inputRouded is-invalid"
                            : "form-control re_inputRouded"
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.question}
                      />
                      {touched.question && errors.question ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">{errors.question}</div>
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label className="pho_14_500">Answer</label>
                      <textarea
                        rows="5"
                        placeholder="Enter Answer"
                        autoComplete="off"
                        name="answer"
                        className={
                          errors.answer && touched.answer
                            ? "form-control re_inputRouded is-invalid"
                            : "form-control re_inputRouded"
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.answer}
                      ></textarea>
                      {touched.answer && errors.answer ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">{errors.answer}</div>
                        </div>
                      ) : null}
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
                          onChange={(e) => {
                            values.status = e.value;
                          }}
                          defaultValue={[
                            {
                              value: values.status,
                              label: values.status,
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
                    </div>
                    <div className="form-group d-flex flex-wrap justify-content-center align-items-center mb-0 mt-4">
                      <div className="mr-5 mb-1 mt-2">
                        <button
                          className="btn btn-outline-blue"
                          onClick={() => history.push(`/faq-management`)}
                        >
                          Close
                        </button>
                      </div>
                      <div className="mb-1 mt-2">
                        <Button
                          variant="blue"
                          className="px-5 defpddng spinnerBtn"
                          size="lg"
                          type="submit"
                        >
                          {selectedFaq ? "Update" : "Submit"}
                          {isFaqLoading && (
                            <div className="ml-3 basic-verification-loader text-center">
                              {/* <CircularProgress /> */}
                            </div>
                          )}
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
export default UpdateFAQ;
