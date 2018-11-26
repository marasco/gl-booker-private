// src/routes.js

import React from 'react';
import { Route, Router } from 'react-router-dom';
import App from './App';
import history from './history';
import Signup from './components/signup';
import BookResults from './components/bookResults';
import Profile from './components/profile';





export const makeMainRoutes = () => {
  return (
    <Router history={history} component={App}>
      <div>
        <Route path="/" render={(props) => <App {...props} />} />
        <Route path="/signup" render={(props) => <Signup {...props} />} />
        <Route path="/bookResult" render={(props) => <BookResults {...props} />} />
        <Route path="/myaccount" render={(props) => <Profile {...props} />} />
      </div>
    </Router>
  );
}