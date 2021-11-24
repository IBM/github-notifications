import React from "react";
import { Route, Switch } from "react-router-dom";
import Notifications from "./features/notifications/Notifications";
import Authored from "./features/authored/Authored";
import MentionedNotifications from "./features/mentions/MentionedNotifications";
import ReviewRequestedNotifications from "./features/review-requested/ReviewRequestedNotifications";
import Details from "./features/details/Details";

const AuthenticatedApp = () => {
  return (
    <>
      <Switch>
        <Route exact path="/notifications" component={Notifications} />
        <Route exact path="/authored" component={Authored} />
        <Route exact path="/mentions" component={MentionedNotifications} />
        <Route exact path="/review-requested" component={ReviewRequestedNotifications} />
        <Route exact path="/details" component={Details} />
      </Switch>
    </>
  )
}

export default AuthenticatedApp;
