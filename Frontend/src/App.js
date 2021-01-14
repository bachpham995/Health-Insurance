import React, { Component, useState, useEffect, } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './scss/style.scss';
import PrivateRoute from './views/routes/PrivateRoute';
import PublicRoute from './views/routes/PublicRoute';
import Common from 'src/services/Common';
import AxiosClient from 'src/api/AxiosClient'
import { CSpinner } from '@coreui/react';


// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

function App() {
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState(null); 
  const FetchLoginUser = async () => {
    await AxiosClient.get("/Employees/User/"+Common.getUser(),{
      headers: { "content-type" : "text/plain" }
    }).then(res => {
      // console.log('Get data successfully: ', res);
      // console.log("Data Header:", Object.keys(res));      
      setUser(res);
    }).catch(err => {
      console.log('Failed to Get data: ', err);
    });
  } 

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
        FetchLoginUser();
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
        style={{ width: '4rem', height: '4rem' }}
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
          <PublicRoute exact name="Register" path="/register" component={Register} />
          <PrivateRoute path="/" name="Home" component={()=><TheLayout user={user}/>} />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
}


export default App;
