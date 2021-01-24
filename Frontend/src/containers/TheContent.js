import React, { Suspense } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'

// routes config
import { _user_routes } from '../routes';
import { _admin_routes } from '../routes';
import routes from '../routes';
import Common from 'src/services/Common';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheContent = () => {

  const getRoute = () => {
    if (Common.getToken() != null) {
      if (Common.getUser().role === 0) {
        return _admin_routes;
      } else {
        return _user_routes;
      }
    }
    return routes;
  }

  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {getRoute()?.map((route, idx) => {
              return route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}

                  render={route.props ?
                    () => (
                      <CFade>
                        <route.component {...route.props} />
                      </CFade>
                    ) :
                    props => (
                      <CFade>
                        <route.component {...props} />
                      </CFade>
                    )} />
              )
            })}
            {Common.getUser().role === 0?(<Redirect from="/" to="/dashboard" />):(<Redirect from="/" to="/user/policySearch" />)}
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)
