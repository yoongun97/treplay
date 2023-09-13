import { Link } from "react-router-dom";
import { styled } from "styled-components";
export const ListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 70px;
  row-gap: 80px;
  width: 1280px;
`;

export const ListBox = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 380px;
  text-align: left;

  & > h4 {
    margin-top: 20px;
    font-size: 20px;
    font-weight: 600;
    line-height: 26px;
    color: #222;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & > h5 {
    width: 100%;
    padding: 5px 0;
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & > p {
    padding-bottom: 8px;
    font-size: 13px;
    font-weight: 400;
    line-height: 26px;
    color: #777;
  }
`;

export const ImageBox = styled.div`
  width: 380px;
  height: 380px;
  border-radius: 30px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const LikesContainer = styled.div`
  display: flex;
  align-items: center;
  height: 38px;
  padding: 0px 20px;
  border-radius: 10px;
  border: 1px solid #777;
  & > div {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 400;
  }

  & > div > img {
    margin-right: 12px;
  }
`;

export const LikesBox = styled.div`
  position: relative;
  padding-right: 10px;
  color: #0a58be;

  &::after {
    content: "";
    position: absolute;
    top: auto;
    bottom: auto;
    right: 0;
    width: 1px;
    height: 16px;
    background-color: #222;
  }
`;
export const DislikesBox = styled.div`
  padding-left: 10px;
  color: #fcd71e;
`;
