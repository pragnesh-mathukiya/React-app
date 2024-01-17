import React, { useContext, useMemo } from "react";
import { Dropdown } from "react-bootstrap";
import objectPath from "object-path";
import { useHtmlClassService } from "../../../_core/MetronicLayout";
import { toAbsoluteUrl } from "../../../../_helpers";
import { DropdownTopbarItemToggler } from "../../../../_partials/dropdowns";
import { logoutAsync } from "../../../../../app/modules/Auth/redux/authApi";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Link } from "react-router-dom";
import { Web3Context } from "../../../../../app/web3/contexts/web3Context";
import { toast } from "react-toastify";

export function UserProfileDropdown() {
  const dispatch = useDispatch();
  const { networkDetails, handleConnect } = useContext(Web3Context);

  const { user, isLoading } = useSelector((state) => state.auth, shallowEqual);

  const uiService = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      light:
        objectPath.get(uiService.config, "extras.user.dropdown.style") ===
        "light",
    };
  }, [uiService]);

  const logoutClick = () => {
    dispatch(logoutAsync());
  };

  const handleClickCopy = () => {
    if (window.clipboardData && window.clipboardData.setData) {
      return "-";
    } else if (
      document.queryCommandSupported &&
      document.queryCommandSupported("copy")
    ) {
      var textarea = document.createElement("textarea");
      textarea.textContent = networkDetails.address;
      textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in MS Edge.
      document.body.appendChild(textarea);
      textarea.select();
      try {
        return document.execCommand("copy"); // Security exception may be thrown by some browsers.
      } catch (ex) {
        console.warn("Copy to clipboard failed.", ex);
        return false;
      } finally {
        document.body.removeChild(textarea);
        toast.info("Address copied.");
      }
    }
  };

  return (
    <Dropdown drop="down" alignRight>
      <Dropdown.Toggle
        as={DropdownTopbarItemToggler}
        id="dropdown-toggle-user-profile"
      >
        <div
          className={
            "btn btn-icon w-auto btn-clean d-flex align-items-center btn-lg px-2"
          }
        >
          <span className="text-muted font-weight-bold font-size-base d-none d-md-inline mr-1">
            Hi,
          </span>{" "}
          <span className="text-dark-50 font-weight-bolder font-size-base d-none d-md-inline mr-3">
            {user.name}
          </span>
          <span className="symbol symbol-35 symbol-light-success">
            <img
              alt="Pic"
              className="hidden"
              src={
                user.profilePicture
                  ? user.profilePicture
                  : toAbsoluteUrl("/media/users/download.png")
              }
              height="35"
              width="35"
            />
          </span>
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu className="p-0 m-0 dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-xl">
        <>
          {!layoutProps.light && (
            <div
              className="d-flex align-items-center justify-content-between flex-wrap p-8 bgi-size-cover bgi-no-repeat rounded-top"
              style={{
                backgroundImage: `url(${toAbsoluteUrl(
                  "/media/misc/bg-1.jpg"
                )})`,
              }}
            >
              <div className="symbol bg-white-o-15 mr-3">
                <span className="symbol symbol-80 symbol-primary d-table m-auto">
                  <img
                    alt="Pic"
                    className="hidden"
                    src={
                      user.profilePicture
                        ? user.profilePicture
                        : toAbsoluteUrl("/media/users/download.png")
                    }
                  />
                </span>
              </div>
              <div className="text-white m-0 flex-grow-1 mr-3 font-size-h5">
                {user.name}
              </div>
              {/* <span className="label label-success label-lg font-weight-bold label-inline">
                {user.emailId}
              </span> */}
            </div>
          )}
        </>

        <div className="navi navi-spacer-x-0 pt-5">
          <Link to="/profile-settings" className="navi-item px-8">
            <div className="navi-link">
              <div className="navi-icon mr-2">
                <i className="flaticon2-calendar-3 text-success" />
              </div>
              <div className="navi-text">
                <div className="font-weight-bold">Profile Setting</div>
                <div className="text-muted">Account settings</div>
              </div>
            </div>
          </Link>

          {networkDetails.address !== "" &&
            user.roleId !== undefined &&
            user.roleId === 1 && (
              <div className="navi-item px-8">
                <div className="navi-link">
                  <div className="navi-icon mr-2">
                    <i className="fas fa-wallet text-warning"></i>
                  </div>
                  <div className="navi-text">
                    <div
                      className="text-muted"
                      onClick={() => handleClickCopy()}
                    >
                      {" "}
                      {networkDetails.address}
                    </div>
                  </div>
                </div>
              </div>
            )}
          <div className="navi-separator mt-3"></div>

          <div className="navi-footer  px-8 py-5">
            <button
              className="btn btn-light-primary font-weight-bold"
              onClick={logoutClick}
              disabled={isLoading}
            >
              Sign Out
              {isLoading && (
                <span className="ml-3 spinner spinner-white"></span>
              )}
            </button>

            {/* {networkDetails.address === "" &&
              user.roleId !== undefined &&
              user.roleId === 1 && (
                <button
                  className="btn btn-light-primary font-weight-bold"
                  onClick={() => handleConnect()}
                >
                  Connect Wallet
                </button>
              )} */}
          </div>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
}
