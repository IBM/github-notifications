import React from "react";
import { Route, Switch } from "react-router-dom";
import Notifications from "./features/notifications/Notifications";

const AuthenticatedApp = () => {
  return (
    <>
      <Switch>
        <Route exact path="/notifications" component={Notifications} />
      </Switch>
    </>
  )
}

export default AuthenticatedApp;
