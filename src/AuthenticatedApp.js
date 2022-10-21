import React from "react";
import { Route, Switch } from "react-router-dom";
import Notifications from "./features/notifications/Notifications";
import Details from "./features/details/Details";

const AuthenticatedApp = () => {
  return (
    <>
      <Switch>
        <Route exact path="/notifications" component={Notifications} />
        <Route exact path="/details" component={Details} />
      </Switch>
    </>
  )
}

export default AuthenticatedApp;
