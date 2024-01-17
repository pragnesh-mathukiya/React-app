import { combineReducers } from "redux";
import * as auth from "../app/modules/Auth/redux/authReducer";
import * as environnment from "../app/modules/GetEnvironment/getEnvironmentReducer";
import * as emailManagement from "../app/modules/emailManagement/redux";
import * as profile from "../app/modules/profileSettings/redux";
import * as dashboard from "../app/modules/dashboards/redux";
import * as notificationManagement from "../app/modules/notificationManagement/redux";
import * as cms from "../app/modules/cmsPages/redux";
import * as faqManagement from "../app/modules/faqManagement/redux";
import snackBarReducer from "../app/modules/snackBar/snackbarReducer";
import * as generalSetting from "../app/modules/generalSetting/redux";
import * as siteConfiguration from "../app/modules/siteConfiguration/redux";
import * as AdminsManagement from "../app/modules/adminManagement/redux";
import * as SmsManagement from "../app/modules/smsManagement/redux";

export const rootReducer = combineReducers({
  snackBar: snackBarReducer,
  environnment: environnment.reducer,
  dashboard: dashboard.reducer,
  auth: auth.reducer,
  emailManagement: emailManagement.reducer,
  faqManagement: faqManagement.reducer,
  notificationManagement: notificationManagement.reducer,
  profile: profile.reducer,
  cms: cms.reducer,
  generalSetting: generalSetting.reducer,
  site: siteConfiguration.reducer,
  admin: AdminsManagement.reducer,
  smsManagement: SmsManagement.reducer,
});
