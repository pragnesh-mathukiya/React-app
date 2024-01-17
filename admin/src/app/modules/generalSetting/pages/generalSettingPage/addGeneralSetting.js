import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateGeneralSettingAsync } from "../../redux/generalSettingApi";

import { CircularProgress } from "@material-ui/core";
import { regexValidation } from "../../../../../_metronic/_helpers";

const AddGeneralSetting = ({ isLoading }) => {
  const { selectedGeneralSetting } = useSelector(
    (state) => state.generalSetting,
    shallowEqual
  );

  const dispatch = useDispatch();
  const AddGeneralSettingFormSchema = () =>
    Yup.object().shape({
      discord: Yup.string()
        .trim()
        .matches(regexValidation.URL_REGEX, "Enter correct url!")
        .required("Discord Channel is required"),
      twitter: Yup.string()
        .trim()
        .matches(regexValidation.URL_REGEX, "Enter correct url!")
        .required("Twitter url is required"),
      opensea: Yup.string()
        .trim()
        .matches(regexValidation.URL_REGEX, "Enter correct url!")
        .required("OpenSea url is required"),
      ownerAddress: Yup.string()
        .trim()
        .required("Owner Address is required"),
    });

  const formik = useFormik({
    initialValues: {
      discord: selectedGeneralSetting.discord || "",
      twitter: selectedGeneralSetting.twitter || "",
      opensea: selectedGeneralSetting.opensea || "",
      ownerAddress: selectedGeneralSetting.ownerAddress || "",
    },
    enableReinitialize: true,
    validationSchema: AddGeneralSettingFormSchema,
    onSubmit: (values) => {
      if (selectedGeneralSetting.discord) {
        return dispatch(
          updateGeneralSettingAsync(selectedGeneralSetting._id, values)
        );
      }
    },
  });

  // const config = {
  //   allowedContent: true,
  // };

  return (
    <>
      <div className="tblmrgn mt-10 lwpddng cstm_pddng">
        <div className="row justify-content-center">
          <div className="col-xl-8 ">
            <form
              className="form def_form frmwtpddng"
              onSubmit={formik.handleSubmit}
            >
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label className="form-label">Owner Wallet Address</label>
                    <input
                      placeholder="Owner Wallet Address"
                      type="text"
                      autoComplete="off"
                      className={`form-control`}
                      {...formik.getFieldProps("ownerAddress")}
                      name="ownerAddress"
                    />
                    {formik.touched.ownerAddress &&
                    formik.errors.ownerAddress ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          {formik.errors.ownerAddress}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label className="form-label">Discord Channel Url</label>
                    <input
                      placeholder="Discord Channel Url"
                      type="text"
                      autoComplete="off"
                      className={`form-control`}
                      {...formik.getFieldProps("discord")}
                      name="discord"
                    />
                    {formik.touched.discord && formik.errors.discord ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          {formik.errors.discord}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label className="form-label">Twitter Url</label>
                    <input
                      placeholder="Twitter Url"
                      type="text"
                      autoComplete="off"
                      className={`form-control`}
                      {...formik.getFieldProps("twitter")}
                      name="twitter"
                    />
                    {formik.touched.twitter && formik.errors.twitter ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          {formik.errors.twitter}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label className="form-label">OpenSea Url</label>
                    <input
                      placeholder="OpenSea Url"
                      autoComplete="off"
                      type="text"
                      className={`form-control`}
                      {...formik.getFieldProps("opensea")}
                      name="opensea"
                    />
                    {formik.touched.opensea && formik.errors.opensea ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          {formik.errors.opensea}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="form-group d-flex flex-wrap justify-content-center align-items-center mb-0 mt-4">
                <div className="form-group mr-5 mb-1 mt-2">
                  <button
                    type="submit"
                    className="btn btn-blue spinnerBtn"
                    disabled={isLoading}
                  >
                    <span>Save</span>
                    {isLoading && (
                      <div className="ml-3 basic-verification-loader text-center">
                        <CircularProgress />
                      </div>
                    )}
                  </button>
                  <br />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddGeneralSetting;
