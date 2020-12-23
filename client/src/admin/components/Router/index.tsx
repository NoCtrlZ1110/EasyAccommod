import * as React from 'react';

import {Route} from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import utils from '../../utils/utils';

export const RouterAppAdmin = () => {
    const AppLayout = utils.getRoute('/admin').component;
    return (
            <ProtectedRoute path="/admin" render={(props: any) => <AppLayout {...props} exact/>}/>
    );
};
export const RouterUserAdmin = () => {
    const UserLayout = utils.getRoute('/admin/user').component;
    return (
            <Route path="/admin/user" render={(props: any) => <UserLayout {...props} />}/>
    );
};

