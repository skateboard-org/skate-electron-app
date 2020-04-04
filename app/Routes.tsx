import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import CounterPage from './containers/CounterPage';
import SkatePage from './containers/SkatePage';

export default function Routes() {
  // '/' or HOME should be the last route
  return (
    <App>
      <Switch>
        <Route path={routes.COUNTER} component={CounterPage} />
        <Route path={routes.HOME} component={SkatePage} />
      </Switch>
    </App>
  );
}
