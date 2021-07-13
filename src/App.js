import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import thunk from 'redux-thunk';
import rootReducer from './reducers'
import Unavailable from "./features/login/Unavailable";
import Login from "./features/login/Login";
import history from './history';
import AuthenticatedApp from "./AuthenticatedApp";

const store = createStore(rootReducer, applyMiddleware(thunk));

class App extends Component {
  render() {
    if (typeof(Storage) !== "undefined") {
      return (
        <Provider store={store}>
          <Router history={history}>
            <Switch>
              <Route exact path="/" component={ Login } />
              <AuthenticatedApp />
            </Switch>
          </Router>
        </Provider>
      )
    } else {
      return (
        <Router>
          <Switch>
            <Route exact path="/unavailable" component={ Unavailable } />
          </Switch>
        </Router>
      )
    }
  }
}

export default App;
