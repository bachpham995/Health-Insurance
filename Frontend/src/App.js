import React, { Component, useState, useEffect, } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './scss/style.scss';
import PrivateRoute from './views/routes/PrivateRoute';
import PublicRoute from './views/routes/PublicRoute';
import Common from 'src/services/Common';
import AxiosClient from 'src/api/AxiosClient'
import { CSpinner } from '@coreui/react';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

function App() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = Common.getToken();
    if (!token) {
      return;
    }

    AxiosClient.post("/Security/ValidateToken?token=" + Common.getToken(), {},
      {
        headers: { 'Authorization': `Bearer ${token}` }
      }).then(res => {
        //setUserSession(res, response.data.user);
        console.log(res);
        setAuthLoading(false);
      }).catch(error => {
        Common.removeUserSession();
        setAuthLoading(false);
      });
  }, []);

  if (authLoading && Common.getToken()) {
    return (<div className="d-flex align-items-center">
      <strong>Loading...</strong>
      <CSpinner
        color="primary"
        style={{width:'4rem', height:'4rem'}}
      />
    </div>)
  }

  return (
    <BrowserRouter>
      <React.Suspense fallback={authLoading}>
        <Switch>
          {/* <Route exact path="/login" name="Login Page" render={props => <Login {...props} />} />
            <Route exact path="/register" name="Register Page" render={props => <Register {...props} />} />
            <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
            <Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} />
            <Route path="/" name="Home" render={props => <TheLayout {...props} />} /> */}
          <PublicRoute exact name="Login" path="/login" component={Login} />
          <PrivateRoute path="/" name="Home" component={TheLayout} />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
}


export default App;
