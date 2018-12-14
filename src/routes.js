import React from 'react';
import { Route, Router } from 'react-router-dom';
import App from './App';
import history from './history';
import Profile from './components/profile';
import Checkout from './components/checkout';
import ResetPassword from './components/resetPassword';
import Auth from './components/auth';
import Appointments from './components/appointments';

export const makeMainRoutes = () => {
  return (
    <Router history={history} component={App}>
      <div>
        <Route path="/" render={(props) => <App {...props} />} />
        <Route path="/signin" render={(props) => <Auth {...props} />} />
        <Route path="/myaccount" render={(props) => <Profile {...props} />} />
        <Route path="/checkout" render={(props) => <Checkout {...props} />} />
        <Route path="/reset-password" render={(props) => <ResetPassword {...props} />} />
        <Route path="/appointments" render={(props) => <Appointments {...props} />} />
      </div>
    </Router>
  );
}
