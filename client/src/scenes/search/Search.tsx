import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { TitleLine } from '../../components/title_line/TitleLine';
import { SearchBar } from '../../components/search_bar/SearchBar';
import { SearchResult } from './SearchResult';

export const SearchPage: React.FC = () => {
  return (
    <Switch>
      <Route path='/search/result'>
        <SearchResult />
      </Route>
      <Route path='/search' exact>
        <div className='container'>
          <div style={{ height: 60 }} />
          <h1 className='m-4'>Tìm kiếm tại đây</h1>
          <TitleLine width={500} />
          <div style={{ height: 60 }} />
          <SearchBar />
        </div>
      </Route>
    </Switch>
  );
};
