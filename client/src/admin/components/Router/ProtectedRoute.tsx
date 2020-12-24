import * as React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {getUserId} from "../../../services/auth";

const ProtectedRoute = ({path, component: Component, permission, render, ...rest}: any) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (localStorage.getItem('user') == null) {
                    return (
                        <Redirect
                            to={{
                                pathname: '/admin/user/login',
                                state: {from: props.location},
                            }}
                        />
                    );
                }
                if (getUserId() !== 1) {
                    return (
                        <Redirect
                            to={{
                                pathname: '/admin/user/login',
                                state: {from: props.location},
                            }}
                        />
                    );
                }
                return Component ? <Component {...props} /> : render(props);
            }}
        />
    );
}

export default ProtectedRoute;
