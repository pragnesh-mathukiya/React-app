import React from "react";
import { Col, Row, Button } from "react-bootstrap";
import { Formik, Form } from "formik";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useHistory, useParams, Redirect, Link } from "react-router-dom";
import {CircularProgress} from "@material-ui/core";
import Select from "react-select";
import {
  Card,
  CardHeader,
  CardBody,
} from "./../../../../_metronic/_partials/controls";
import * as Yup from "yup";
import {
  addNotificationsync,
  updateNotficationAsync,
} from "../redux/notificationManagementApi";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";

const AddNotificationTemplate = () => {
  const templateOptions = [];
  const params = useParams();
  const history = useHistory();
  const entities = [{ values: "", label: "" }];
  const dispatch = useDispatch();
  const { templates, selectedNotification } = useSelector(
    (state) => state.notificationManagement,
    shallowEqual
  );

  if (!selectedNotification && params?.id !== undefined) {
    return <Redirect to="/notification-management" />;
  }
  if (selectedNotification && params?.id && templates) {
    templates.forEach((template) => {
      if (
        selectedNotification.mailName &&
        template.templateName === selectedNotification.mailName
      ) {
        template.templateEntities.forEach((entity) => {
          entities.push({ value: entity, label: entity });
        });
      }
    });
  }
  const initialValues = {
    type: "NOTIFICATION",
    mailName: "",
    entities: [],
    templates: [],
    entity: "",
    notificationMessage: "",
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
    history.push("/notification-management");
  };

  const addEmailSchema = Yup.object().shape({
    mailName: Yup.string()
      .trim()
      .notOneOf(
        ["null", "NULL", "Null", "Undefined", "undefined"],
        "Please enter Email name"
      )
      .required("Please enter Email name"),
    notificationMessage: Yup.string()
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
          selectedNotification && params?.id !== undefined
            ? selectedNotification
            : initialValues
        }
        validationSchema={addEmailSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          if (selectedNotification && params?.id !== undefined) {
            dispatch(
              updateNotficationAsync(
                values,
                setSubmitting,
                resetForm,
                redirectBack
              )
            );
          } else {
            dispatch(
              addNotificationsync(
                values,
                setSubmitting,
                resetForm,
                redirectBack
              )
            );
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          setFieldValue,
          setFieldTouched,
        }) => (
          <Card>
            <CardHeader
              title={
                <div className="form-group m-0 d-flex align-items-center">
                  <Link
                    className="btn btn-link px-0"
                    to="/notification-management"
                  >
                    <SVG
                      className="h-50 align-self-center"
                      src={toAbsoluteUrl(
                        "/media/svg/icons/Navigation/Arrow-left.svg"
                      )}
                    />
                    Back
                  </Link>
                  <span className="pl-2">
                    {selectedNotification ? "Edit Template" : "Add Template"}
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
                        placeholder="Select Template"
                        className={`form-control border-0 p-0 `}
                        isDisabled={
                          selectedNotification && params?.id !== undefined
                        }
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

                    <>
                      <div className="form-group">
                        <label className="pho_14_500">Entity</label>
                        <Select
                          value={{
                            value: values.entity,
                            label: values.entity,
                          }}
                          onChange={(e) => {
                            // Set field value
                            setFieldValue("entity", e.value);
                          }}
                          placeholder="Select"
                          className={`form-control border-0 p-0 `}
                          classNamePrefix="phoSelect"
                          options={
                            selectedNotification && params?.id
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
                          let notificationMessage = "";

                          if (values.entity && values.entity.length > 0) {
                            const string = values.notificationMessage.replace(
                              /<\/?[^>]+(>|$)/g,
                              ""
                            );
                            // Add current entity into email body
                            notificationMessage =
                              string + "${" + values.entity + "}";

                            // Set field value
                            setFieldValue(
                              "notificationMessage",
                              notificationMessage
                            );
                          }
                        }}
                      >
                        Append
                      </Button>
                    </>

                    <div className="form-group">
                      <label className="form-label">Notification Message</label>
                      <textarea
                        className={
                          errors.notificationMessage &&
                          touched.notificationMessage
                            ? "form-control re_inputRouded is-invalid"
                            : "form-control re_inputRouded"
                        }
                        rows={5}
                        value={values.notificationMessage}
                        onChange={(e) => {
                          setFieldTouched("notificationMessage", true);
                          // Set field value
                          setFieldValue("notificationMessage", e.target.value);
                        }}
                      />
                      {touched.notificationMessage &&
                      errors.notificationMessage ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            {errors.notificationMessage}
                          </div>
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group d-flex flex-wrap justify-content-center align-items-center mb-0 mt-4">
                      <div className="mr-5 mb-1 mt-2">
                        <Link
                          className="btn btn-outline-blue"
                          to="/notification-management"
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
                          {selectedNotification && params?.id !== undefined
                            ? "Update"
                            : "Submit"}
                          {isSubmitting && (
                            <div className="ml-3 basic-verification-loader text-center">
                              <CircularProgress />
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
export default AddNotificationTemplate;
