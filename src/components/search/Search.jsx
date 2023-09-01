import React, { useState } from 'react';
import * as s from './StyledSearch';

const Search = ({ onSearch }) => {
  const [search, setSearch] = useState('');

  const handleSearchInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(search);
    }
  };

  const handleSearch = () => {
    onSearch(search);
  };

  return (
    <>
      <s.SearchBox>
        <input
          placeholder="찾으시는 장소를 검색해주세요"
          value={search}
          onChange={handleSearchInputChange}
          onKeyDown={handleSearchInputKeyDown}
        />
        <div>
          <div onClick={handleSearch}></div>
        </div>
      </s.SearchBox>
    </>
  );
};

export default Search;
