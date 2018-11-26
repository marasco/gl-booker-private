import React from 'react';
import { Route, Router } from 'react-router-dom';
import App from './App';
import history from './history';
import BookResults from './components/bookResults';
import Profile from './components/profile';
import Treatment from './components/treatment';





export const makeMainRoutes = () => {
  return (
    <Router history={history} component={App}>
      <div>
        <Route path="/" render={(props) => <App {...props} />} />
        <Route path="/book" render={(props) => <BookResults {...props} />} />
        <Route path="/myaccount" render={(props) => <Profile {...props} />} />
        <Route path="/treatment" render={(props) => <Treatment {...props} />} />
      </div>
    </Router>
  );
}