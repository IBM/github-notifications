import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import thunk from 'redux-thunk';
import rootReducer from './reducers'
import Notifications from './features/notifications/Notifications';
import Details from "./features/details/Details";
import MentionedNotifications from "./features/mentions/MentionedNotifications";
import ReviewRequestedNotifications from "./features/review-requested/ReviewRequestedNotifications";
import history from './history';

const store = createStore(rootReducer, applyMiddleware(thunk));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Notifications} />
            <Route exact path="/mentions" component={MentionedNotifications} />
            <Route exact path="/review-requested" component={ReviewRequestedNotifications} />
            <Route exact path="/details" component={Details} />
          </Switch>
        </Router>
      </Provider>
    )
  }
}

export default App;
