import { styled } from "styled-components";
export const SearchContainer = styled.div`
  width: 580px;
  margin: 60px auto;
`;

export const SearchBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding-left: 20px;
  border: 1px solid #0a58be;
  background-color: #fff;
  border-radius: 30px;

  & > input {
    outline: none;
    border: none;
    font-size: 16px;
    font-weight: 500;
    color: #222;
    width: 480px;
    height: 100%;
    background: transparent;
  }

  & > button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    border: none;
    border-radius: 24px;
    background-color: #0a58be;
  }
  & > button > span {
    width: 24px;
    height: 24px;
    background-image: url(${process.env.PUBLIC_URL}/icon/search_icon.svg);
  }
`;
export const ResultBoxContainer = styled.div`
  border-radius: 30px;
  background-color: #fff;
  cursor: pointer;
  overflow: hidden;
`;
export const ResultBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 12px;
  text-align: left;
  background-color: #fff;

  /* &:nth-child(2n) {
    background-color: #f2f8ff;
  } */

  & > span {
    display: inline-block;
    width: 24px;
    height: 24px;
    margin-right: 20px;
    background: url(${process.env.PUBLIC_URL}/icon/map_icon_gray.svg) no-repeat
      center / 100%;
  }
  & > div > p:first-child {
    color: #222;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
  }
  & > div > p:last-child {
    color: #777;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #e5e5e5;
  }

  &:first-child::after {
    display: none;
  }
`;
export const SelectedResultBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 12px;
  width: 580px;
  margin-top: 10px;
  text-align: left;

  & > span {
    display: inline-block;
    width: 24px;
    height: 24px;
    margin-right: 20px;
    background: url(${process.env.PUBLIC_URL}/icon/map_icon_blue.svg) no-repeat
      center / 100%;
  }
  & > div > p:first-child {
    color: #222;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
  }
  & > div > p:last-child {
    color: #777;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
  }
`;
