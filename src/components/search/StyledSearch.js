import { styled } from "styled-components";
import { Link } from "react-router-dom";
export const SearchBox = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 580px;
  height: 60px;
  margin-bottom: 60px;
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
    background-image: url(${process.env.PUBLIC_URL}/icon/search_icon.svg);
  }
`;
