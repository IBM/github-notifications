import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import thunk from 'redux-thunk';
import rootReducer from './reducers'
import Notifications from './features/notifications/Notifications';
import history from './history';

const store = createStore(rootReducer, applyMiddleware(thunk));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Notifications}/>
          </Switch>
        </Router>
      </Provider>
    )
  }
}

export default App;
