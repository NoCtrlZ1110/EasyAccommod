import './UserLayout.less';
import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import { userRouter } from '../Router/router.config';
import utils from '../../utils/utils';

class UserLayout extends React.Component<any> {
  render() {
    const {
      location: { pathname },
    } = this.props;

    return (
      <DocumentTitle title={utils.getPageTitle(pathname)}>
            <Switch>
              {userRouter
                .filter((item: any) => !item.isLayout)
                .map((item: any, index: number) => (
                  <Route key={index} path={item.path} component={item.component} exact={item.exact} />
                ))}
              <Redirect from="/admin/user" to="/admin/user/login" />
            </Switch>
      </DocumentTitle>
    );
  }
}

export default UserLayout;
