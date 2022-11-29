import React, { Component } from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';
import rootReducer from './reducers'
import Unavailable from "./features/login/Unavailable";
import Login from "./features/login/Login";
import history from './history';
import AuthenticatedApp from "./AuthenticatedApp";

class App extends Component {
  constructor(props) {
    super(props);
    const sagaMiddleware = createSagaMiddleware();
    const middleWare = [sagaMiddleware];
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    if (process.env.NODE_ENV === 'development') {
      middleWare.push(logger);
    }
    this.store = createStore(rootReducer, composeEnhancers(
      applyMiddleware(...middleWare)
    ));
    sagaMiddleware.run(rootSaga);
  }
  render() {
    if (typeof(Storage) !== "undefined") {
      return (
        <Provider store={this.store}>
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
        <Router history={history}>
          <Switch>
            <Route exact path="/unavailable" component={ Unavailable } />
          </Switch>
        </Router>
      )
    }
  }
}

export default App;
