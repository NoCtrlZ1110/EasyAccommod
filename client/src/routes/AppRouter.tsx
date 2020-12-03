import React from 'react';
import history from '../services/history';
import { Router, Switch, Route } from 'react-router-dom';
import { NotFound } from '../components/NotFound/NotFound';
import Home from '../scenes/Home/Home';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { Login } from '../scenes/Login/Login';
import { TEST } from '../scenes/test';

const routes = [
  {
    path: '/login',
    component: Login,
    exact: true,
  },
  {
    path: '/private',
    component: TEST,
    private: true,
  },
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '*',
    component: NotFound,
  },
];

export function AppRouter(props: any) {
  const accessToken = localStorage.getItem('accessToken');

  return (
    <Router history={history}>
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} accessToken={accessToken} />
        ))}
      </Switch>
    </Router>
  );
}

export function RouteWithSubRoutes(route: any) {
  return (
    <Route
      path={route.path}
      render={(props: any) => {
        if (route.private) {
          if (route.accessToken) {
            return (
              <>
                <Header />
                <route.component {...props} routes={route.routes} />
                <Footer />
              </>
            );
          } else {
            history.push('/login');
          }
        } else
          return (
            // pass the sub-routes down to keep nesting
            <>
              <Header />
              <route.component {...props} routes={route.routes} />
              <Footer />
            </>
          );
      }}
    />
  );
}
