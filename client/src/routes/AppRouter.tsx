import React from 'react';
import history from '../services/history';
import {Route, Router, Switch} from 'react-router-dom';
import {NotFound} from '../components/not_found/NotFound';
import Home from '../scenes/home/Home';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import {Login} from '../scenes/login/Login';
import TEST from '../scenes/test';
import AccommodList from '../scenes/accommod/AccommodList';
import { SignUp } from '../scenes/sign_up/SignUp';
import { SearchPage } from '../scenes/search/Search';
import Profile from '../scenes/profile_owner/Profile';
import { HomeUser } from '../scenes/home_user/HomeUser';
import { Post } from '../scenes/accommod/Post';
import { ChangePass } from '../scenes/change_pass/ChangePass';
import { Widget, addResponseMessage } from 'react-chat-widget';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore } from '../services/firebase';
import { getUser } from '../services/auth';
import firebase from 'firebase';
import ProtectedRoute from '../admin/components/Router/ProtectedRoute';
import utils from "../admin/utils/utils";

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
    path: '/change-password',
    component: ChangePass,
    private: true,
  },
  {
    path: '/post',
    component: Post,
    private: true,
  },
  {
    path: '/test',
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
    path: '/search',
    component: SearchPage,
  },
  {
    path: '/home',
    component: HomeUser,
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
  const isLogged = localStorage.getItem('accessToken') !== null;
  const AppLayout = utils.getRoute('/admin').component;
  const UserLayout = utils.getRoute('/admin/user').component;
  return (
    <>
      {isLogged && (
        <Widget
          handleNewUserMessage={handleNewUserMessage}
          profileAvatar={'/svgs/admin.svg'}
          title='Chat với admin'
          subtitle='Nhận sự trợ giúp nhanh chóng từ quản trị viên'
        />
      )}
      <Router history={history}>
        <Switch>
          <Route path={'/admin'}>
            <Switch>
              <Route path="/admin/user" render={(props: any) => <UserLayout {...props} />}/>
              <ProtectedRoute path="/admin" render={(props: any) => <AppLayout {...props} exact/>}/>
            </Switch>
          </Route>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} accessToken={user} />
          ))}
        </Switch>
      </Router>
    </>
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
                <div className='wrapper'>
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
              <div className='wrapper'>
                <route.component {...props} routes={route.routes} />
              </div>
              <Footer />
            </>
          );
      }}
    />
  );
}