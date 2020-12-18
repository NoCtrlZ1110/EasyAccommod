import Search from 'antd/lib/input/Search';
import React from 'react';
import { ReactComponent as Filter } from '../../assets/svgs/filter.svg';
import { Button } from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const SearchBar: React.FC = () => {
  const height = 55;

  return (
    <div className="search-bar mx-3">
      <Search
        height={height}
        addonBefore={
          <Button
            className="filter-btn"
            icon={<Filter fill="#4285F4" height={30} width={30} />}
            style={{
              height: height,
              width: height,
              border: '3px solid #4285F4;',
            }}
          ></Button>
        }
        placeholder="input search text"
        allowClear
        enterButton={
          <Button type="primary" style={{ height: height }}>
            <span style={{ fontSize: 18, marginRight: 10 }}>Tìm kiếm</span>
            <FontAwesomeIcon icon={faSearch} size="lg" />
          </Button>
        }
        onSearch={() => {}}
      ></Search>
    </div>
  );
};
