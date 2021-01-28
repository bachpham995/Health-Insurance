import React, { Component, useState, useEffect, useContext } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './scss/style.scss';
import PrivateRoute from './views/routes/PrivateRoute';
import PublicRoute from './views/routes/PublicRoute';
import Common from 'src/services/Common';
import AxiosClient from 'src/api/AxiosClient'
import {
  CSpinner
  , CRow
  , CImg,
  CToast,
  CToaster,
  CToastBody,
  CToastHeader,
  CModal,
  CModalHeader,
  CModalBody,
  CProgress
} from '@coreui/react';


// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));
const ForgetPassword = React.lazy(() => import('./views/pages/forgetpassword/ForgetMail'));
const ChangePassword = React.lazy(() => import('./views/pages/forgetpassword/ChangePassword'));

function App() {
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState(null);
  const FetchLoginUser = async (mounted) => {
    let user = Common.getUser();
    await AxiosClient.get("/Employees/User/" + user.userName, {
      headers: { "content-type": "text/plain" }
    }).then(res => {
      // console.log('Get data successfully: ', res);
      // console.log("Data Header:", Object.keys(res));
      if (mounted) {
        setUser(res);
      }
    }).catch(err => {
      console.log('Failed to Get data: ', err);
    });
  }

  useEffect(async () => {
    const token = Common.getToken();
    if (!token) {
      return;
    }

    let mounted = true;

    await AxiosClient.post("/Security/ValidateToken?token=" + Common.getToken(), {},
      {
        headers: { 'Authorization': `Bearer ${token}` }
      }).then(res => {
        //setUserSession(res, response.data.user);
        // console.log(res);
        FetchLoginUser(mounted);
        setAuthLoading(false);
      }).catch(error => {
        Common.removeUserSession();
        setAuthLoading(false);
      });
    return () => mounted = false;
  }, []);

  if (authLoading && Common.getToken()) {
    // return (<div className="d-flex align-items-center">
    //   <strong>Loading...</strong>
    //   <CSpinner
    //     color="primary"
    //     style={{ width: '4rem', height: '4rem' }}
    //   />
    // </div>)
    return (<CRow className="custom-container">
      <CImg className="custom-background" src="https://coolbackgrounds.io/images/backgrounds/index/ranger-4df6c1b6.png" />
      <CModal show={authLoading} centered size="sm" closeOnBackdrop={false}>
        <CModalBody>
          <b className="loading-font">Loading</b>
          <CSpinner color="primary" style={{ width: '4rem', height: '4rem' }}></CSpinner>

        </CModalBody>
      </CModal>
    </CRow>)
  }

  return (
    <BrowserRouter>
      <React.Suspense fallback={authLoading}>
        <Switch>
          {/* <div id="userId">{user?.employeeId}</div> */}
          {/* <Route exact path="/login" name="Login Page" render={props => <Login {...props} />} />
            <Route exact path="/register" name="Register Page" render={props => <Register {...props} />} />
            <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
            <Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} />
            <Route path="/" name="Home" render={props => <TheLayout {...props} />} /> */}
          <PublicRoute exact name="Login" path="/login" component={Login} />
          <PublicRoute exact name="Forget Password" path="/forgetpassword" component={ForgetPassword} />
          <PublicRoute exact name="Change Password" path="/changepassword/:token" component={ChangePassword} />
          <PrivateRoute path="/" name="Home" component={() => <TheLayout user={user} />} />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
}


export default App;
