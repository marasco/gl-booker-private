import React from 'react';
import { Route, Router } from 'react-router-dom';
import App from './App';
import history from './history';
import Profile from './components/profile';
import ResetPassword from './components/resetPassword';
import Auth from './components/auth';
import Wizard from './components/wizard'

export const makeMainRoutes = () => {
  return (
    <Router history={history} component={App}>
      <div>
        <Route path="/" render={(props) => <App {...props} />} />
        <Route exact path="/" render={(props) => <Wizard {...props} />} />
        <Route path="/signin" render={(props) => <Auth {...props} />} />
        <Route path="/myaccount" render={(props) => <Profile {...props} />} />
        <Route path="/reset-password" render={(props) => <ResetPassword {...props} />} />
      </div>
    </Router>
  );
}
