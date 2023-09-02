import { Link } from "react-router-dom";
import { styled } from "styled-components";

export const CategoryPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1280px;
  margin: 180px auto 140px;
  text-align: center;
`;

export const PhrasesContainer = styled.div`
  margin: 0 auto;

  & > h2 {
    font-size: 28px;
    font-weight: 600;
  }

  & > h3 {
    margin: 20px 0 60px;
    font-size: 24px;
    font-weight: 500;
    color: #222;
  }
`;
export const MiddleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 30px;
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 12px;

  & > button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    width: 105px;
    height: 34px;
    border-radius: 30px;
    font-size: 16px;
    font-weight: 400;
  }
`;
export const OnButton = styled.button`
  border: 1px solid #0a58be;
  background-color: #0a58be;
  color: #fff;
`;
export const OffButton = styled.button`
  border: 1px solid #e5e5e5;
  background-color: #fff;
  color: #bfbfbf;
`;
export const WriteButton = styled(Link)`
  align-self: flex-end;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  width: 100px;
  height: 40px;
  border-radius: 8px;
  background-color: #0a58be;
  color: #fff;
  text-align: center;
`;

export const PostsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 70px;
  row-gap: 80px;
  width: 1280px;
`;
export const PostBox = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 380px;
  text-align: left;

  & > h4 {
    margin-top: 20px;
    font-size: 20px;
    font-weight: 500;
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
    font-size: 14px;
    font-weight: 300;
    line-height: 26px;
    color: #777;
  }
`;

export const ImageBox = styled.img`
  width: 380px;
  height: 380px;
  object-fit: cover;
`;
