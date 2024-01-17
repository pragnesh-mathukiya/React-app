import React from "react";
// import CKEditor from "@ckeditor/ckeditor5-react";
/* import { CKEditor } from "ckeditor4-react"; */
import { Col, Row, Button } from "react-bootstrap";
import { useParams, Redirect, Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useHistory } from "react-router-dom";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import CircularProgress from "@material-ui/core/CircularProgress";
// import Select from "react-select";
import {
  Card,
  CardHeader,
  CardBody,
} from "./../../../../_metronic/_partials/controls";
import * as Yup from "yup";
import { addSmsAsync, updateSmsAsync } from "../redux/smsManagementApi";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
// import CustomEditor from "../../CustomEditor/CustomEditor";

const AddTemplate = () => {
  // const templateOptions = [];
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const entities = [{ values: "", label: "" }];
  const { selectedSms, templates } = useSelector(
    (state) => state.smsManagement,
    shallowEqual
  );
  if (!selectedSms && params?.id !== undefined) {
    return <Redirect to="/sms-management" />;
  }
  if (selectedSms && params?.id && templates) {
    templates.forEach((template) => {
      if (
        selectedSms.smsName &&
        template.templateName === selectedSms.smsName
      ) {
        template.templateEntities.forEach((entity) => {
          entities.push({ value: entity, label: entity });
        });
      }
    });
  }
  const initialValues = {
    smsTitle: "",
    smsContent: "",
  };
  const redirectBack = () => {
    history.push("/sms-management");
  };

  const addSmsSchema = Yup.object().shape({
    smsTitle: Yup.string()
      .trim()
      .notOneOf(
        ["null", "NULL", "Null", "Undefined", "undefined"],
        "Please enter Sms Title"
      )
      .required("Please enter Sms title"),
    smsContent: Yup.string()
      .trim()
      .notOneOf(
        ["null", "NULL", "Null", "Undefined", "undefined"],
        "Please enter valid Sms content"
      )
      .required("Please enter Sms content"),
  });
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={
          selectedSms && params?.id !== undefined
            ? selectedSms
            : initialValues
        }
        validationSchema={addSmsSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          if (selectedSms && params?.id !== undefined) {
            dispatch(
              updateSmsAsync(values, setSubmitting, resetForm, redirectBack)
            );
          } else {
            dispatch(
              addSmsAsync(values, setSubmitting, resetForm, redirectBack)
            );
          }
        }}
      >
        {({
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
                  <Link className="btn btn-link px-0" to="/sms-management">
                    <SVG
                      className="h-50 align-self-center"
                      src={toAbsoluteUrl(
                        "/media/svg/icons/Navigation/Arrow-left.svg"
                      )}
                    />
                    Back
                  </Link>
                  <span className="pl-2">
                    {selectedSms ? "Edit Template" : "Add Template"}
                  </span>
                </div>
              }
            ></CardHeader>
            <CardBody>
              <Row className="justify-content-center">
                <Col lg={8}>
                  <Form>
                    <div className="form-group">
                      <label className="form-label">Title</label>
                      <input
                        placeholder="Enter Title"
                        type="text"
                        disabled={selectedSms && params?.id !== undefined}
                        name="smsTitle"
                        className={
                          errors.smsTitle && touched.smsTitle
                            ? "form-control re_inputRouded is-invalid"
                            : "form-control re_inputRouded"
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.smsTitle}
                      />
                      {touched.smsTitle && errors.smsTitle ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            {errors.smsTitle}
                          </div>
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Content</label>

                      <textarea
                        placeholder="Enter Content"
                        type="text"
                        rows="3"
                        name="smsContent"
                        className={
                          errors.smsContent && touched.smsContent
                            ? "form-control re_inputRouded is-invalid"
                            : "form-control re_inputRouded"
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.smsContent}
                      />
                      {touched.smsContent && errors.smsContent ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">{errors.smsContent}</div>
                        </div>
                      ) : null}
                    </div>

                    <div className="form-group d-flex flex-wrap justify-content-center align-items-center mb-0 mt-4">
                      <div className="mr-5 mb-1 mt-2">
                        <Link
                          className="btn btn-outline-blue"
                          to="/sms-management"
                        >
                          Close
                        </Link>
                      </div>
                      <div className="mb-1 mt-2">
                        <Button
                          variant="blue"
                          className="px-5 defpddng spinnerBtn"
                          size="lg"
                          type="submit"
                        >
                          {selectedSms && params?.id !== undefined
                            ? "Update"
                            : "Submit"}
                          {isSubmitting && (
                            <div className="ml-3 basic-verification-loader text-center">
                              {/* <CircularProgress /> */}
                            </div>
                          )}
                        </Button>
                      </div>
                    </div>
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
export default AddTemplate;
