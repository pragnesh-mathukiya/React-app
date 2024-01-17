import React, { useEffect } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import BasePage from "./BasePage";
import { Logout, AuthPage } from "./modules/Auth";
import ErrorsPage from "./modules/ErrorsExamples/ErrorsPage";
import { getEnvironmentsAsync } from "../app/modules/GetEnvironment/getEnvironmentApi";
import { Layout, LayoutSplashScreen } from "../_metronic/layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Routes() {
  const dispatch = useDispatch();

  const { isAuthorized } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.authToken && auth.user,
      // tokenVerified: auth.tokenVerified,
    }),
    shallowEqual
  );

  const { envLoading } = useSelector((state) => state.environnment);

  useEffect(() => {
    dispatch(getEnvironmentsAsync());
  }, [dispatch]);

  if (envLoading) {
    return <LayoutSplashScreen />;
  }

  return (
    <>
      <Switch>
        {!isAuthorized ? (
          /*Render auth page when user at `/auth` and not authorized.*/
          <Route>
            <AuthPage />
          </Route>
        ) : (
          /*Otherwise redirect to root page (`/`)*/
          <Redirect from="/auth" to="/" />
        )}

        <Route path="/error" component={ErrorsPage} />
        <Route path="/logout" component={Logout} />
        {!isAuthorized ? (
          /*Redirect to `/auth` when user is not authorized*/
          <Redirect to="/auth/login" />
        ) : (
          <Layout>
            <BasePage />
          </Layout>
        )}
      </Switch>
      <ToastContainer autoClose={3000} />
    </>
  );
}
