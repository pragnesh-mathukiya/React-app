/* eslint-disable no-unused-vars */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useState, useMemo, useEffect } from "react";
import { Nav, Tab, Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import PerfectScrollbar from "react-perfect-scrollbar";
import SVG from "react-inlinesvg";
import objectPath from "object-path";
import { Link } from "react-router-dom";
import { useHtmlClassService } from "../../../_core/MetronicLayout";
import { toAbsoluteUrl } from "../../../../_helpers";
import { DropdownTopbarItemToggler } from "../../../../_partials/dropdowns";
// import socket from "../../../../../app/modules/Socket/Socket";
import { notificationListAsync } from "../../../../../app/modules/Auth/redux/authApi";
import { ReactTimeAgoC } from "../../../../../app/utils/ReactTimeAgoC";
import { getAllTicketsAsync } from "../../../../../app/modules/ticketSupportManagement/redux/tickets&SupportApi";

const perfectScrollbarOptions = {
  wheelSpeed: 2,
  wheelPropagation: false,
};

export function UserNotificationsDropdown() {
  const { user, notificationList } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [key, setKey] = useState("Alerts");
  const [isNotification, setNotification] = useState(false);
  const bgImage = toAbsoluteUrl("/media/misc/bg-1.jpg");

  const uiService = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      offcanvas:
        objectPath.get(uiService.config, "extras.notifications.layout") ===
        "offcanvas",
    };
  }, [uiService]);

  return (
    <>
      {layoutProps.offcanvas && (
        <div className="topbar-item">
          <div
            className={`btn btn-icon btn-clean btn-lg mr-1 ${isNotification &&
              "pulse pulse-primary"}`}
            id="kt_quick_notifications_toggle"
          >
            <span className="svg-icon svg-icon-xl svg-icon-primary">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Code/Compiling.svg")} />
            </span>
            <span className="pulse-ring"></span>
          </div>
        </div>
      )}
      {!layoutProps.offcanvas && (
        <Dropdown drop="down" alignRight>
          <Dropdown.Toggle
            as={DropdownTopbarItemToggler}
            id="kt_quick_notifications_toggle"
          >
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip id="user-notification-tooltip">Notifications</Tooltip>
              }
            >
              <div
                className={`btn btn-icon btn-clean btn-lg mr-1 ${isNotification &&
                  "pulse pulse-primary"}`}
                id="kt_quick_notifications_toggle"
                onClick={() => {
                  dispatch(notificationListAsync());
                  setNotification(false);
                }}
              >
                <span className="svg-icon svg-icon-xl svg-icon-primary">
                  <SVG
                    src={toAbsoluteUrl(
                      "/media/svg/icons/General/Notifications1.svg"
                    )}
                  />
                </span>
                <span className="pulse-ring"></span>
                <span className="pulse-ring" />
              </div>
            </OverlayTrigger>
          </Dropdown.Toggle>

          <Dropdown.Menu className="dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-anim-up dropdown-menu-lg">
            <form>
              {/** Head */}
              <div
                className="d-flex flex-column pt-12 bgi-size-cover bgi-no-repeat rounded-top"
                style={{ backgroundImage: `url(${bgImage})` }}
              >
                <h4 className="d-flex flex-center rounded-top">
                  <span className="text-white">Notifications</span>
                  {/* <span className="btn btn-text btn-success btn-sm font-weight-bold btn-font-md ml-2">
                    23 new
                  </span> */}
                </h4>

                <Tab.Container defaultActiveKey={key}>
                  <Nav
                    // as="ul"
                    className="nav nav-bold nav-tabs nav-tabs-line nav-tabs-line-3x nav-tabs-line-transparent-white nav-tabs-line-active-border-success mt-3 px-8"
                    // onSelect={(_key) => setKey(_key)}
                  >
                    {/* <Nav.Item className="nav-item" as="li">
                      <Nav.Link
                        eventKey="Alerts"
                        className={`nav-link show ${
                          key === "Alerts" ? "active" : ""
                        }`}
                      >
                        Alerts
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                      <Nav.Link
                        eventKey="Events"
                        className={`nav-link show ${
                          key === "Events" ? "active" : ""
                        }`}
                      >
                        Events
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                      <Nav.Link
                        eventKey="Logs"
                        className={`nav-link show ${
                          key === "Logs" ? "active" : ""
                        }`}
                      >
                        Logs
                      </Nav.Link>
                    </Nav.Item> */}
                  </Nav>

                  <Tab.Content className="tab-content">
                    <Tab.Pane eventKey="Alerts" className="p-8">
                      <PerfectScrollbar
                        options={perfectScrollbarOptions}
                        className="scroll pr-7 mr-n7"
                        style={{ maxHeight: "300px", position: "relative" }}
                      >
                        {notificationList.records &&
                          notificationList.records.map((notification) => {
                            let link = "";
                            switch (notification.categoryType) {
                              case "PAYMENT": {
                                link = "";
                                break;
                              }
                              case "SUPPORT_TICKET": {
                                link = `/ticket-support-management?refId=${notification.refId}`;
                                break;
                              }
                              default: {
                                // added for remove the warninig
                              }
                            }

                            return (
                              <div
                                className="d-flex align-items-center mb-2"
                                key={notification._id}
                              >
                                <div className="symbol symbol-40 symbol-light-info mr-5">
                                  <span className="symbol-label">
                                    <SVG
                                      src={toAbsoluteUrl(
                                        "/media/svg/icons/Communication/Mail-notification.svg"
                                      )}
                                      className="svg-icon-lg svg-icon-info"
                                    ></SVG>
                                  </span>
                                </div>
                                <div className="d-flex flex-column font-weight-bold">
                                  <Link
                                    to={link}
                                    className="text-dark text-hover-primary mb-1 font-size-lg"
                                  >
                                    {notification.message &&
                                      notification.message}
                                  </Link>
                                  <span className="text-muted">
                                    {notification.createdAt && (
                                      <ReactTimeAgoC
                                        date={new Date(notification.createdAt)}
                                      />
                                    )}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                      </PerfectScrollbar>
                    </Tab.Pane>
                    <Tab.Pane
                      eventKey="Events"
                      id="topbar_notifications_events"
                    >
                      <PerfectScrollbar
                        options={perfectScrollbarOptions}
                        className="navi navi-hover scroll my-4"
                        style={{ maxHeight: "300px", position: "relative" }}
                      >
                        <a href="#" className="navi-item">
                          <div className="navi-link">
                            <div className="navi-icon mr-2">
                              <i className="flaticon2-line-chart text-success"></i>
                            </div>
                            <div className="navi-text">
                              <div className="font-weight-bold">
                                New report has been received
                              </div>
                              <div className="text-muted">23 hrs ago</div>
                            </div>
                          </div>
                        </a>

                        <a href="#" className="navi-item">
                          <div className="navi-link">
                            <div className="navi-icon mr-2">
                              <i className="flaticon2-paper-plane text-danger"></i>
                            </div>
                            <div className="navi-text">
                              <div className="font-weight-bold">
                                Finance report has been generated
                              </div>
                              <div className="text-muted">25 hrs ago</div>
                            </div>
                          </div>
                        </a>

                        <a href="#" className="navi-item">
                          <div className="navi-link">
                            <div className="navi-icon mr-2">
                              <i className="flaticon2-user flaticon2-line- text-success"></i>
                            </div>
                            <div className="navi-text">
                              <div className="font-weight-bold">
                                New order has been received
                              </div>
                              <div className="text-muted">2 hrs ago</div>
                            </div>
                          </div>
                        </a>

                        <a href="#" className="navi-item">
                          <div className="navi-link">
                            <div className="navi-icon mr-2">
                              <i className="flaticon2-pin text-primary"></i>
                            </div>
                            <div className="navi-text">
                              <div className="font-weight-bold">
                                New customer is registered
                              </div>
                              <div className="text-muted">3 hrs ago</div>
                            </div>
                          </div>
                        </a>

                        <a href="#" className="navi-item">
                          <div className="navi-link">
                            <div className="navi-icon mr-2">
                              <i className="flaticon2-sms text-danger"></i>
                            </div>
                            <div className="navi-text">
                              <div className="font-weight-bold">
                                Application has been approved
                              </div>
                              <div className="text-muted">3 hrs ago</div>
                            </div>
                          </div>
                        </a>

                        <a href="#" className="navi-item">
                          <div className="navi-link">
                            <div className="navi-icon mr-2">
                              <i className="flaticon2-pie-chart-3 text-warning"></i>
                            </div>
                            <div className="navinavinavi-text">
                              <div className="font-weight-bold">
                                New file has been uploaded
                              </div>
                              <div className="text-muted">5 hrs ago</div>
                            </div>
                          </div>
                        </a>

                        <a href="#" className="navi-item">
                          <div className="navi-link">
                            <div className="navi-icon mr-2">
                              <i className="flaticon-pie-chart-1 text-info"></i>
                            </div>
                            <div className="navi-text">
                              <div className="font-weight-bold">
                                New user feedback received
                              </div>
                              <div className="text-muted">8 hrs ago</div>
                            </div>
                          </div>
                        </a>

                        <a href="#" className="navi-item">
                          <div className="navi-link">
                            <div className="navi-icon mr-2">
                              <i className="flaticon2-settings text-success"></i>
                            </div>
                            <div className="navi-text">
                              <div className="font-weight-bold">
                                System reboot has been successfully completed
                              </div>
                              <div className="text-muted">12 hrs ago</div>
                            </div>
                          </div>
                        </a>

                        <a href="#" className="navi-item">
                          <div className="navi-link">
                            <div className="navi-icon mr-2">
                              <i className="flaticon-safe-shield-protection text-primary"></i>
                            </div>
                            <div className="navi-text">
                              <div className="font-weight-bold">
                                New order has been placed
                              </div>
                              <div className="text-muted">15 hrs ago</div>
                            </div>
                          </div>
                        </a>

                        <a href="#" className="navi-item">
                          <div className="navi-link">
                            <div className="navi-icon mr-2">
                              <i className="flaticon2-notification text-primary"></i>
                            </div>
                            <div className="navi-text">
                              <div className="font-weight-bold">
                                Company meeting canceled
                              </div>
                              <div className="text-muted">19 hrs ago</div>
                            </div>
                          </div>
                        </a>

                        <a href="#" className="navi-item">
                          <div className="navi-link">
                            <div className="navi-icon mr-2">
                              <i className="flaticon2-fax text-success"></i>
                            </div>
                            <div className="navi-text">
                              <div className="font-weight-bold">
                                New report has been received
                              </div>
                              <div className="text-muted">23 hrs ago</div>
                            </div>
                          </div>
                        </a>

                        <a href="#" className="navi-item">
                          <div className="navi-link">
                            <div className="navi-icon mr-2">
                              <i className="flaticon-download-1 text-danger"></i>
                            </div>
                            <div className="navi-text">
                              <div className="font-weight-bold">
                                Finance report has been generated
                              </div>
                              <div className="text-muted">25 hrs ago</div>
                            </div>
                          </div>
                        </a>

                        <a href="#" className="navi-item">
                          <div className="navi-link">
                            <div className="navi-icon mr-2">
                              <i className="flaticon-security text-warning"></i>
                            </div>
                            <div className="navi-text">
                              <div className="font-weight-bold">
                                New customer comment recieved
                              </div>
                              <div className="text-muted">2 days ago</div>
                            </div>
                          </div>
                        </a>

                        <a href="#" className="navi-item">
                          <div className="navi-link">
                            <div className="navi-icon mr-2">
                              <i className="flaticon2-analytics-1 text-success"></i>
                            </div>
                            <div className="navi-text">
                              <div className="font-weight-bold">
                                New customer is registered
                              </div>
                              <div className="text-muted">3 days ago</div>
                            </div>
                          </div>
                        </a>
                      </PerfectScrollbar>
                    </Tab.Pane>
                    <Tab.Pane eventKey="Logs" id="topbar_notifications_logs">
                      <div className="d-flex flex-center text-center text-muted min-h-200px">
                        All caught up!
                        <br />
                        No new notifications.
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>
            </form>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </>
  );
}
