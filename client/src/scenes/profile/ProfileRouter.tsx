import { UserInfo } from './UserInfo';
import { PendingPost } from './PendingPost';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ActivePost } from './ActivePost';
import { ExpiredPost } from './ExpiredPost';

const routes = [
  {
    path: '/profile/user-info',
    component: UserInfo,
  },
  {
    path: '/profile/pending-post',
    component: PendingPost,
  },
  {
    path: '/profile/active-post',
    component: ActivePost,
  },
  {
    path: '/profile/expired-post',
    component: ExpiredPost,
  },
];
export default function UserProfile() {
  return (
    <Switch>
      {routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route} />
      ))}
      <Route path='*'>
        <Redirect to='/profile/user-info' />
      </Route>
    </Switch>
  );
}
function RouteWithSubRoutes(route: any) {
  return (
    <Route
      path={route.path}
      render={(props) => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}
