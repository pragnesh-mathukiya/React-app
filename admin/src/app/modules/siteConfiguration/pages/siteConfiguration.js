import React, { useState, useEffect } from "react";
import EmailConfiguration from "./emailConfiguration";
import SmsConfiguration from "./smsConfiguration";
import { Tabs, Tab } from "react-bootstrap";
import {
  Card,
  CardHeader,
  CardBody,
} from "../../../../_metronic/_partials/controls";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { getAllConfigAsync } from "../redux/siteApi";

export function SiteConfiguration() {
  const [selectedTab, setSelectedTab] = useState("email");

  const handleSelect = (key) => {
    setSelectedTab(key);
  };

  const dispatch = useDispatch();

  const { isLoading, cofigDetail, setDetail } = useSelector(
    (state) => state.site,
    shallowEqual
  );

  useEffect(() => {
    dispatch(getAllConfigAsync());
  }, [dispatch, setDetail]);

  return (
    <>
      <Card>
        <CardHeader title="Site Configuration"></CardHeader>
        <CardBody>
          <Tabs
            defaultActiveKey="email"
            id="OrderManagementTab"
            className="def_tab"
            onSelect={handleSelect}
          >
            <Tab eventKey="email" title="Email">
              <div className="p-6">
                <EmailConfiguration
                  selectedTab={selectedTab}
                  isLoading={isLoading}
                  email={cofigDetail ? cofigDetail.email : {}}
                />
              </div>
            </Tab>

            <Tab eventKey="sms" title="Sms">
              <div className="p-6">
                <SmsConfiguration
                  selectedTab={selectedTab}
                  isLoading={isLoading}
                  sms={cofigDetail ? cofigDetail.sms : {}}
                />
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </>
  );
}
