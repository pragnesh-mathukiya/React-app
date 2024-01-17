/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";
import { getRolePermissionAsync } from "../../../../../app/modules/adminManagement/redux";
import { useDispatch } from "react-redux";

export function AsideMenuList({ layoutProps }) {
  const location = useLocation();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu && "menu-item-active"} menu-item-open `
      : "";
  };

  const dispatch = useDispatch();
  // const { rolePermissionList } = useSelector(
  //   (state) => state.admin,
  //   shallowEqual
  // );

  useEffect(() => {
    dispatch(getRolePermissionAsync());
  }, []);

  var isEmail = true;
  var isFaq = true;
  var isSiteConfig = true;
  var isCMS = true;
  var isSubadmin = true;
  var isSms = true;

  let ls = localStorage.getItem("persist:v706-demo1-auth");
  let data = JSON.parse(ls);
  if (data?.user !== "null") {
    let permission = JSON.parse(data?.user);
    if (permission && permission.permissions && permission.permissions.length >= 0) {
      permission.permissions.find((element) => {
        if (element === "email-management-module") {
          isEmail = true;
        } else if (element === "faq-management-module") {
          isFaq = true;
        } else if (element === "site-config-module") {
          isSiteConfig = true;
        } else if (element === "cms-pages-module") {
          isCMS = true;
        } else if (element === "admin-module") {
          isSubadmin = true;
        } else if (element === "sms-management-module") {
          isSms = true;
        }
      });
    }
  }

  return (
    <>
      {/* begin::Menu Nav */}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/*begin::1 Level*/}
        <li className={`menu-item ${getMenuItemActive("/dashboard", false)}`}>
          <NavLink className="menu-link" to="/dashboard">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text">Dashboard</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}

        {/*begin::1 Level*/}

        {isSubadmin === true ? (
          <li className={`menu-item ${getMenuItemActive("/admin", false)}`}>
            <NavLink className="menu-link" to="/admin">
              <span className="svg-icon menu-icon">
                <SVG src={toAbsoluteUrl("/media/svg/icons/General/User.svg")} />
              </span>
              <span className="menu-text">Admin Management</span>
            </NavLink>
          </li>
        ) : (
          ""
        )}

        {isEmail === true ? (
          <li className={`menu-item ${getMenuItemActive("/email-management", false)}`}>
            <NavLink className="menu-link" to="/email-management">
              <span className="svg-icon menu-icon">
                <SVG src={toAbsoluteUrl("/media/svg/icons/Communication/Mail.svg")} />
              </span>
              <span className="menu-text">Email Management</span>
            </NavLink>
          </li>
        ) : (
          ""
        )}

        {isSms === true ? (
          <li className={`menu-item ${getMenuItemActive("/sms-management", false)}`}>
            <NavLink className="menu-link" to="/sms-management">
              <span className="svg-icon menu-icon">
                <SVG src={toAbsoluteUrl("/media/svg/icons/Communication/Mail.svg")} />
              </span>
              <span className="menu-text">SMS Management</span>
            </NavLink>
          </li>
        ) : (
          ""
        )}

        {isFaq === true ? (
          <li className={`menu-item ${getMenuItemActive("/faq-management", false)}`}>
            <NavLink className="menu-link" to="/faq-management">
              <span className="svg-icon menu-icon">
                <SVG src={toAbsoluteUrl("/media/svg/icons/custom/information.svg")} />
              </span>
              <span className="menu-text">FAQ Management</span>
            </NavLink>
          </li>
        ) : (
          ""
        )}

        {isCMS === true ? (
          <li className={`menu-item ${getMenuItemActive("/cms-pages", false)}`}>
            <NavLink className="menu-link" to="/cms-pages">
              <span className="svg-icon menu-icon">
                <SVG src={toAbsoluteUrl("/media/svg/icons/custom/cms.svg")} />
              </span>
              <span className="menu-text">CMS Pages</span>
            </NavLink>
          </li>
        ) : (
          ""
        )}

        {isSiteConfig === true ? (
          <li className={`menu-item ${getMenuItemActive("/site-configuration", false)}`}>
            <NavLink className="menu-link" to="/site-configuration">
              <span className="svg-icon menu-icon">
                <SVG src={toAbsoluteUrl("/media/svg/icons/General/Settings-2.svg")} />
              </span>
              <span className="menu-text">Site Configuration</span>
            </NavLink>
          </li>
        ) : (
          ""
        )}

      </ul>
      {/* end::Menu Nav */}
    </>
  );
}
