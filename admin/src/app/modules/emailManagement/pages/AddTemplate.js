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
import Select from "react-select";
import {
  Card,
  CardHeader,
  CardBody,
} from "./../../../../_metronic/_partials/controls";
import * as Yup from "yup";
import { addEmailAsync, updateEmailAsync } from "../redux/emailManagementApi";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import CustomEditor from "../../CustomEditor/CustomEditor";

const AddTemplate = () => {
  const templateOptions = [];
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const entities = [{ values: "", label: "" }];
  const { selectedEmail, templates } = useSelector(
    (state) => state.emailManagement,
    shallowEqual
  );
  if (!selectedEmail && params?.id !== undefined) {
    return <Redirect to="/email-management" />;
  }
  if (selectedEmail && params?.id && templates) {
    templates.forEach((template) => {
      if (
        selectedEmail.mailName &&
        template.templateName === selectedEmail.mailName
      ) {
        template.templateEntities.forEach((entity) => {
          entities.push({ value: entity, label: entity });
        });
      }
    });
  }
  const initialValues = {
    type: "EMAIL",
    mailName: "",
    mailTitle: "",
    entities: [],
    templates: [],
    entity: "",
    mailSubject: "",
    mailBody: "",
  };
  if (templates && templates.length > 0) {
    initialValues.templates = templates;
    templates.forEach((entity) => {
      templateOptions.push({
        value: entity.templateName,
        label: entity.templateName,
      });
    });
  }
  const redirectBack = () => {
    history.push("/email-management");
  };

  const addEmailSchema = Yup.object().shape({
    mailName: Yup.string()
      .trim()
      .notOneOf(
        ["null", "NULL", "Null", "Undefined", "undefined"],
        "Please enter Email name"
      )
      .required("Please enter Email name"),
    mailTitle: Yup.string()
      .trim()
      .notOneOf(
        ["null", "NULL", "Null", "Undefined", "undefined"],
        "Please enter Email Title"
      )
      .required("Please enter Email title"),
    mailSubject: Yup.string()
      .trim()
      .notOneOf(
        ["null", "NULL", "Null", "Undefined", "undefined"],
        "Please enter Email subject"
      )
      .required("Please enter Email subject"),
    mailBody: Yup.string()
      .trim()
      .notOneOf(
        ["null", "NULL", "Null", "Undefined", "undefined"],
        "Please enter valid Email body"
      )
      .required("Please enter Email body"),
  });
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={
          selectedEmail && params?.id !== undefined
            ? selectedEmail
            : initialValues
        }
        validationSchema={addEmailSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          if (selectedEmail && params?.id !== undefined) {
            dispatch(
              updateEmailAsync(values, setSubmitting, resetForm, redirectBack)
            );
          } else {
            dispatch(
              addEmailAsync(values, setSubmitting, resetForm, redirectBack)
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
                    <Link className="btn btn-link px-0" to="/email-management">
                      <SVG
                        className="h-50 align-self-center"
                        src={toAbsoluteUrl(
                          "/media/svg/icons/Navigation/Arrow-left.svg"
                        )}
                      />
                    Back
                  </Link>
                    <span className="pl-2">
                      {selectedEmail ? "Edit Template" : "Add Template"}
                    </span>
                  </div>
                }
              ></CardHeader>
              <CardBody>
                <Row className="justify-content-center">
                  <Col lg={8}>
                    <Form>
                      <div className="form-group">
                        <label className="pho_14_500">Template Name</label>

                        <Select
                          value={{
                            value: values.mailName,
                            label: values.mailName,
                          }}
                          isDisabled={selectedEmail && params?.id !== undefined}
                          placeholder="Select Template"
                          className={`form-control border-0 p-0 `}
                          classNamePrefix="phoSelect"
                          options={templateOptions}
                          onChange={(e) => {
                            const entities = [{ values: "", label: "" }];
                            values.templates.forEach((template) => {
                              if (e.value && template.templateName === e.value) {
                                template.templateEntities.forEach((entity) => {
                                  entities.push({ value: entity, label: entity });
                                });
                              }
                            });

                            // Set field value
                            setFieldValue("entity", "");
                            setFieldValue("mailName", e.value);
                            setFieldValue("entities", entities);
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
                        {touched.mailName && errors.mailName ? (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block">{errors.mailName}</div>
                          </div>
                        ) : null}
                      </div>
                      <div className="form-group">
                        <label className="form-label">Title</label>
                        <input
                          placeholder="Enter Title"
                          type="text"
                          disabled={selectedEmail && params?.id !== undefined}
                          name="mailTitle"
                          className={
                            errors.mailTitle && touched.mailTitle
                              ? "form-control re_inputRouded is-invalid"
                              : "form-control re_inputRouded"
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.mailTitle}
                        />
                        {touched.mailTitle && errors.mailTitle ? (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block">
                              {errors.mailTitle}
                            </div>
                          </div>
                        ) : null}
                      </div>
                      <div className="form-group">
                        <label className="form-label">Subject</label>
                        <input
                          placeholder="Enter Subject"
                          type="text"
                          name="mailSubject"
                          className={
                            errors.mailSubject && touched.mailSubject
                              ? "form-control re_inputRouded is-invalid"
                              : "form-control re_inputRouded"
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.mailSubject}
                        />
                        {touched.mailSubject && errors.mailSubject ? (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block">
                              {errors.mailSubject}
                            </div>
                          </div>
                        ) : null}
                      </div>
                      <div className="form-group">
                        <label className="pho_14_500">Entity</label>
                        <Select
                          value={{ value: values.entity, label: values.entity }}
                          onChange={(e) => {
                            // Set field value
                            setFieldValue("entity", e.value);
                          }}
                          placeholder="Select"
                          className={`form-control border-0 p-0 `}
                          classNamePrefix="phoSelect"
                          options={
                            selectedEmail && params?.id
                              ? entities
                              : values.entities
                          }
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
                      </div>
                      <Button
                        size="sm"
                        type="button"
                        variant="success"
                        className="px-5 py-3 mb-3"
                        onClick={(e) => {
                          e.preventDefault();
                          let emailBody = "";

                          if (values.entity && values.entity.length > 0) {
                            const string = values.mailBody.replace(
                              /<\/?[^>]+(>|$)/g,
                              ""
                            );
                            // Add current entity into email body
                            emailBody = string + "${" + values.entity + "}";

                            // Set field value
                            setFieldValue("mailBody", emailBody);
                          }
                        }}
                      >
                        Append
                    </Button>
                      <div className="form-group">
                        <label className="form-label">Email Body</label>

                        <CustomEditor
                          data={values.mailBody}
                          className={
                            errors.mailBody && touched.mailBody
                              ? "form-control re_inputRouded is-invalid"
                              : "form-control re_inputRouded"
                          }
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            // Set field touched value
                            setFieldTouched("mailBody", true);

                            // Set field value
                            setFieldValue("mailBody", data);
                          }}
                        />

                        {/* <CKEditor
                        // editor={ClassicEditor}
                        data={values.mailBody}
                        className={
                          errors.mailBody && touched.mailBody
                            ? "form-control re_inputRouded is-invalid"
                            : "form-control re_inputRouded"
                        }
                        onChange={(event) => {
                          const data = event.editor.getData();

                          // Set field touched value
                          setFieldTouched("mailBody", true);

                          // Set field value
                          setFieldValue("mailBody", data);
                        }}
                      /> */}
                        {touched.mailBody && errors.mailBody ? (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block">{errors.mailBody}</div>
                          </div>
                        ) : null}
                      </div>
                      <div className="form-group d-flex flex-wrap justify-content-center align-items-center mb-0 mt-4">
                        <div className="mr-5 mb-1 mt-2">
                          <Link
                            className="btn btn-outline-blue"
                            to="/email-management"
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
                            {selectedEmail && params?.id !== undefined
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
