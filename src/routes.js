import React from 'react';
import { Route, Router } from 'react-router-dom';
import App from './App';
import history from './history';
import Profile from './components/profile';
import Treatment from './components/treatment';
import SignIn from './components/signin';





export const makeMainRoutes = () => {
  return (
    <Router history={history} component={App}>
      <div>
        <Route path="/" render={(props) => <App {...props} />} />
        <Route exact path="/" render={(props) => <Treatment {...props} />} />
        <Route path="/signin" render={(props) => <SignIn {...props} />} />
        <Route path="/myaccount" render={(props) => <Profile {...props} />} />
      </div>
    </Router>
  );
}