import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import AddGeneralSetting from "./addGeneralSetting";
import {
  Card,
  CardHeader,
  CardBody,
} from "../../../../../_metronic/_partials/controls";
export const GeneralSettingPageDetail = () => {
  const { selectedGeneralSetting, reDirect } = useSelector(
    (state) => state.generalSetting,
    shallowEqual
  );
  return (
    <>
      <Card>
        <CardHeader
          title={
            <>
              <div className="form-group m-0 d-flex align-items-center">
                <span className="pl-2">
                General Setting
                </span>
              </div>
            </>
          }
        ></CardHeader>
        <CardBody>
          <AddGeneralSetting selectedGeneralSetting={selectedGeneralSetting} reDirect={reDirect} />
        </CardBody>
      </Card>
    </>
  );
};
