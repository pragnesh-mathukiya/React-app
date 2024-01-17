import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import AddCMS from "./addCms";
import {
  Card,
  CardHeader,
  CardBody,
} from "../../../../../_metronic/_partials/controls";
import { Link } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../_metronic/_helpers";

export const CmsPageDetail = () => {
  const { selectedCMS, reDirect } = useSelector(
    (state) => state.cms,
    shallowEqual
  );

  return (
    <>
      <Card>
        <CardHeader
          title={
            <>
              <div className="form-group m-0 d-flex align-items-center">
                <Link className="btn btn-link px-0" to="/cms-pages">
                  <SVG
                    className="h-50 align-self-center"
                    src={toAbsoluteUrl(
                      "/media/svg/icons/Navigation/Arrow-left.svg"
                    )}
                  />
                  Back
                </Link>
                <span className="pl-2">
                  {selectedCMS._id ? "Edit CMS" : "Add CMS"}
                </span>
              </div>
            </>
          }
        ></CardHeader>
        <CardBody>
          <AddCMS selectedCMS={selectedCMS} reDirect={reDirect} />
        </CardBody>
      </Card>
    </>
  );
};
