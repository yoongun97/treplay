import React, { useState } from 'react';
import * as s from './StyledSearch';
import Swal from 'sweetalert2';

const Search = ({ onSearch }) => {
  const [search, setSearch] = useState('');

  const handleSearchInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(search);
      if (search.trim().length === 0) {
        Swal.fire({ title: '한 글자 이상 입력해주세요', icon: 'warning' });
      } else {
        onSearch(search);
      }
    }
  };

  const handleSearch = () => {
    onSearch(search);
    if (search.trim().length === 0) {
      Swal.fire({ title: '한 글자 이상 입력해주세요', icon: 'warning' });
    } else {
      onSearch(search);
    }
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
