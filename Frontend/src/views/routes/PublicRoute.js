import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Common from 'src/services/Common';
 
// handle the public routes
function PublicRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => !Common.getToken() ? <Component {...props} /> : <Redirect to={{ pathname: '/dashboard' }} />}
    />
  )
}
 
export default PublicRoute;