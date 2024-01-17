import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import ProfileBasicDetails from "./profileBasicDetails";
import ProfileChangePassword from "./profileChangePassword";
import {
  Card,
  CardBody,
  CardHeader,
} from "./../../../../_metronic/_partials/controls";

export function ProfileSettings() {
  const [selectedTab, setSelectedTab] = useState("basic-details");
  const handleSelect = (key) => {
    setSelectedTab(key);
  };
  return (
    <>
      <Card>
        <CardHeader title="Profile Settings"></CardHeader>
        <CardBody>
          <Tabs
            defaultActiveKey="basic-details"
            id="OrderManagementTab"
            className="def_tab"
            onSelect={handleSelect}
          >
            <Tab eventKey="basic-details" title="Basic Details">
              <div className="p-6">
                <ProfileBasicDetails selectedTab={selectedTab} />
              </div>
            </Tab>

            <Tab eventKey="change-password" title="Change Password">
              <div className="p-6">
                <ProfileChangePassword  selectedTab={selectedTab}/>
              </div>
            </Tab>
          
          </Tabs>
        </CardBody>
      </Card>
    </>
  );
}
