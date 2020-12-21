import { UserInfo } from "./UserInfo";
import { ApprovingPost } from "./ApprovingPost";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { ActivePost } from "./ActivePost";

const routes = [
    {
        path: '/profile/user-info',
        component: UserInfo,
        private: true,
    },
    {
        path: '/profile/approving-post',
        component: ApprovingPost,
        private: true,
    },
    {
        path: '/profile/active-post',
        component: ActivePost,
        private: true,
    },
];
export default function UserProfile() {
    return (
            <Switch>
                {routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))}
            </Switch>
    );
}
function RouteWithSubRoutes(route: any) {
    return (
        <Route
            path={route.path}
            render={props => (
                // pass the sub-routes down to keep nesting
                <route.component {...props} routes={route.routes} />
            )}
        />
    );
}