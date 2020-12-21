import React from 'react';
import history from '../services/history';
import { Router, Switch, Route } from 'react-router-dom';
import { NotFound } from '../components/not_found/NotFound';
import Home from '../scenes/home/Home';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { Login } from '../scenes/login/Login';
import TEST from '../scenes/test';
import AccommodList from '../scenes/accommod/AccommodList';
import { SignUp } from '../scenes/sign_up/SignUp';
import { SearchPage } from '../scenes/search/Search';
import { CreatePost } from '../scenes/create_post/CreatePost';
import  Profile from '../scenes/profile/Profile';

const routes = [
  {
    path: '/login',
    component: Login,
    exact: true,
  },
  {
    path: '/signup',
    component: SignUp,
    exact: true,
  },
  {
    path: '/private',
    component: TEST,
    private: true,
  },
  {
    path: '/profile',
    component: Profile,
    private: true,
  },
  {
    path: '/accommod',
    component: AccommodList,
    private: true,
  },
  {
    path: '/post',
    component: CreatePost,
    private: true,
  },
  {
    path: '/search',
    component: SearchPage,
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
  const user = localStorage.getItem('user');
  return (
    <Router history={history}>
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} accessToken={user} />
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
                <div className="wrapper">
                  <route.component {...props} routes={route.routes} />
                </div>
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
              <div className="wrapper">
                <route.component {...props} routes={route.routes} />
              </div>
              <Footer />
            </>
          );
      }}
    />
  );
}
