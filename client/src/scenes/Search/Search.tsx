import React from 'react';
import { TitleLine } from '../../components/title_line/TitleLine';
import { SearchBar } from '../../components/search_bar/SearchBar';

export const SearchPage: React.FC = () => {
  return (
    <div className='container'>
      <div style={{ height: 60 }} />
      <h1 className='m-4'>Tìm kiếm mọi thứ tại đây</h1>
      <TitleLine width={500} />
      <div style={{ height: 60 }} />
      <SearchBar />
    </div>
  );
};
