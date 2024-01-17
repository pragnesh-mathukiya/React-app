import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Col, Row, Button } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useHistory } from "react-router-dom";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CircularProgress from "@material-ui/core/CircularProgress";
import { updateNotficationAsync } from "../redux/notificationManagementApi";
import {
  Card,
  CardHeader,
  CardBody,
} from "./../../../../_metronic/_partials/controls";
import * as Yup from "yup";

const EditNotificationTemplate = () => {
  const { selectedNotification, isLoading } = useSelector(
    (state) => state.notificationManagement,
    shallowEqual
  );
  const history = useHistory();
  const dispatch = useDispatch();
  if (!selectedNotification) {
    return <Redirect to="/notification-management" />;
  }

  const redirectBack = () => {
    history.push("/notification-management");
  };
  const addNotificationSchema = Yup.object().shape({
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
        "Please enter valid Notification message"
      )
      .required("Please enter Notification message"),
  });
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={selectedNotification}
        validationSchema={addNotificationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          dispatch(
            updateNotficationAsync(
              values,
              setSubmitting,
              resetForm,
              redirectBack
            )
          );
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
          <Row className="justify-content-center">
            <Col lg={8}>
              <Card>
                <CardHeader title="Edit Template"></CardHeader>
                <CardBody>
                  <Form>
                    <div className="form-group">
                      <label className="form-label">Mail Name</label>
                      <input
                        placeholder="Enter Name"
                        type="text"
                        disabled={true}
                        name="mailName"
                        className={
                          errors.mailName && touched.mailName
                            ? "form-control re_inputRouded is-invalid"
                            : "form-control re_inputRouded"
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.mailName}
                      />
                      {touched.mailName && errors.mailName ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">{errors.mailName}</div>
                        </div>
                      ) : null}
                    </div>
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
                    {isSubmitting ? (
                      <div className="basic-verification-loader text-center">
                        <CircularProgress />
                      </div>
                    ) : (
                      <div className="text-center">
                        <Button
                          variant="blue"
                          className="px-5 defpddng "
                          size="lg"
                          type="submit"
                        >
                          Update
                        </Button>
                      </div>
                    )}
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        )}
      </Formik>
    </>
  );
};
export default EditNotificationTemplate;
