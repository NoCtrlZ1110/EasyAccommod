import { Switch, Route, Redirect } from 'react-router-dom';

import React from 'react';
import { PostDetail } from './PostDetail';
import { NotFound } from '../../components/not_found/NotFound';
import { CreatePost } from '../create_post/CreatePost';

export const Post: React.FC = () => {
  return (
    <div className='container'>
      <Switch>
        <Route path='/post/detail/:id' exact>
          <PostDetail />
        </Route>
        <Route path='/post/create' exact>
          <CreatePost />
        </Route>
        <Route path='*' exact>
          <Redirect to='/' />
        </Route>
      </Switch>
    </div>
  );
};
