import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

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

  return (
    <>
      <SearchBox>
        <input
          placeholder="찾으시는 장소를 검색해주세요"
          value={search}
          onChange={handleSearchInputChange}
          onKeyDown={handleSearchInputKeyDown}
        />
        <div>
          <div></div>
        </div>
      </SearchBox>
    </>
  );
};

export default Search;

const SearchBox = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 580px;
  height: 60px;
  padding-left: 20px;
  border: 1px solid #0a58be;
  border-radius: 30px;

  & > input {
    outline: none;
    border: none;
    font-size: 16px;
    font-weight: 400;
    color: #222;
    width: 480px;
    height: 100%;
    background: transparent;
  }

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    border-radius: 24px;
    background-color: #0a58be;
  }
  & > div > div {
    width: 24px;
    height: 24px;
    background-image: url(icon/search_icon.svg);
  }
`;
