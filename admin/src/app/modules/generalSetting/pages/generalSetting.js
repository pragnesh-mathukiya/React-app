import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
import { getGeneralSettingAsync } from "../redux/generalSettingApi";
import { Card, CardHeader } from "../../../../_metronic/_partials/controls";
// import { GeneralSettingActions } from "../redux/generalSettingAction";
import AddGeneralSetting from "./generalSettingPage/addGeneralSetting";

export function GeneralSettingPages() {
  // const { selectedGeneralSetting } = useSelector(
  //   (state) => state.generalSetting,
  //   shallowEqual
  // );
  const dispatch = useDispatch();
  //const history = useHistory();
  useEffect(() => {
    dispatch(getGeneralSettingAsync());
  }, [dispatch]);

  // const onSelectSetting = (setting) => {
  //   dispatch(GeneralSettingActions.setSelectedGeneralSetting(setting));
  // };

  return (
    <>
      <Card>
        <CardHeader title="General Setting"></CardHeader>
        <AddGeneralSetting />
      </Card>
    </>
  );
}
