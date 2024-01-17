import React from "react";
import { Link } from "react-router-dom";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";

function InstructionsSent() {
  return (
    <div className="col-xl-4">
      <div className="wt_box">
        <div className="login-form login-forgot" style={{ display: "block" }}>
          <div className="text-center mb-10 mb-lg-10">
            <img
              alt="Logo"
              className="mb-5 mt-4"
              width="150px"
              src={toAbsoluteUrl("/media/logos/logo.png")}
            />
            <h3 className="fn_s_32 color_blk f-w-500 mt-5">
              Instructions Sent
            </h3>
            <p className="opacity60 fn_s_14 color_blk f-w-400">
              We have sent instructions on username@contact.com. Please check
              and follow the steps.
            </p>
          </div>
          <form className="form def_form">
            <div className="form-group mb-0 mt-5">
              <div className="row">
                <div className="col-md-12 text-center">
                  <Link
                    to="/auth"
                    className="bckbtn fn_s_14 color_blue f-w-500 uppercase"
                  >
                    Back to Login
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default InstructionsSent;
