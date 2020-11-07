import React from "react";
import history from "./services/history";
import { Router, Switch, Route } from "react-router-dom";
import { TEST } from "./scenes/test";
import { NotFound } from "./components/NotFound/NotFound";
import Home from "./scenes/Home";
const routes = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/test",
    component: TEST,
    exact: true,
  },
  {
    path: "*",
    component: NotFound,
  },
];

export function AppRouter(props: any) {
  return (
    <Router history={history}>
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </Router>
  );
}

export function RouteWithSubRoutes(route: any) {
  return (
    <Route
      path={route.path}
      render={(props: any) => (
        // pass the sub-routes down to keep nesting
        <>
          <route.component {...props} routes={route.routes} />
        </>
      )}
    />
  );
}
