import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import { DashboardPage } from "./pages/DashboardPage";
import { EmailManagement } from "./modules/emailManagement";
import { ProfileSettings } from "./modules/profileSettings";
import AddTemplate from "./modules/emailManagement/pages/AddTemplate";
import { CmsPages } from "./modules/cmsPages";
import { CmsPageDetail } from "./modules/cmsPages";
import AddNotificationTemplate from "./modules/notificationManagement/pages/AddNotification";
import { NotificationManagement } from "./modules/notificationManagement/pages/notificationManagement";
import { FaqManagement } from "./modules/faqManagement/pages/faqManagement";
import UpdateFAQ from "./modules/faqManagement/pages/updateFAQ";
import { GeneralSettingPages } from "./modules/generalSetting/pages/generalSetting";
import CreateFaqManagement from "./modules/faqManagement/pages/faqManagementDetail/createFaqManagement";
import { SiteConfiguration } from "./modules/siteConfiguration";
import { AdminsManagement } from "./modules/adminManagement";
import UpdateSubAdmin from "./modules/adminManagement/pages/createAdmin";
import { SmsManagement } from "./modules/smsManagement";
import AddSmsTemplate from "./modules/smsManagement/pages/AddTemplate";

export default function BasePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact from="/" to="/dashboard" />}
        <ContentRoute
          path="/dashboard"
          component={DashboardPage}
          title="Dashboard"
        />
        <ContentRoute
          path="/profile-settings"
          component={ProfileSettings}
          title="Profile Settings"
        />
        <ContentRoute
          exact
          path="/admin"
          component={AdminsManagement}
          title="Admin Management"
        />
        <ContentRoute
          exact
          path="/admin/add-admin"
          component={UpdateSubAdmin}
          title="Add Admin"
        />
        <ContentRoute
          exact
          path="/admin/edit-admin/:id"
          component={UpdateSubAdmin}
          title="Update Admin"
        />
        <ContentRoute
          exact
          path="/site-configuration"
          component={SiteConfiguration}
          title="Site Configuration"
        />
        <ContentRoute
          exact
          path="/email-management"
          component={EmailManagement}
          title="Email Management"
        />
        <ContentRoute
          exact
          path="/email-management/add-template"
          component={AddTemplate}
          title="Add Email"
        />
        <ContentRoute
          exact
          path="/email-management/edit-template/:id"
          component={AddTemplate}
          title="Update Email"
        />
        <ContentRoute
          exact
          path="/notification-management"
          component={NotificationManagement}
          title="Notification Management"
        />
        <ContentRoute
          exact
          path="/notification-management/add-template"
          component={AddNotificationTemplate}
          title="Add Notification Template"
        />
        <ContentRoute
          exact
          path="/notification-management/edit-template/:id"
          component={AddNotificationTemplate}
          title="Update Notification Template"
        />
        <ContentRoute
          exact
          path="/cms-pages"
          component={CmsPages}
          title="CMS Management"
        />
        <ContentRoute
          path="/cms-pages/cms-page-detail"
          component={CmsPageDetail}
          title="Update CMS Detail"
        />
        <ContentRoute
          path="/cms-pages/cms-page-detail"
          component={CmsPageDetail}
          title="Update CMS Detail"
        />
        <ContentRoute
          exact
          path="/faq-management"
          component={FaqManagement}
          title="FAQ Management"
        />
        <ContentRoute
          exact
          path="/faq-management/add-faq"
          component={CreateFaqManagement}
          title="Add FAQ"
        />
        <ContentRoute
          exact
          path="/faq-management/edit-faq"
          component={UpdateFAQ}
          title="Update FAQ"
        />
        <ContentRoute
          exact
          path="/general-setting"
          component={GeneralSettingPages}
          title="General Setting"
        />
        <ContentRoute
          exact
          path="/sms-management"
          component={SmsManagement}
          title="SMS Management"
        />
        <ContentRoute
          exact
          path="/sms-management/add-template"
          component={AddSmsTemplate}
          title="Add SMS Template"
        />
        <ContentRoute
          exact
          path="/sms-management/edit-template/:id"
          component={AddSmsTemplate}
          title="Update SMS Template"
        />
        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  );
}
