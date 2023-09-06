import { Link } from "react-router-dom";
import { styled } from "styled-components";

export const PreviewContainer = styled.div`
  padding: 140px 0;
  text-align: center;
  background-color: #f2f8ff;
`;

export const CategoryButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CategoryButton = styled.div`
  width: 130px;
  height: 54px;
  margin: 30px 0 80px;

  /* selected가 현재 선택한 카테고리를 뜻함. 이게 true이면 파랗게 만듦 */
  background-color: ${(props) => (props.selected ? "#0A58BE" : "#e4e8e9")};
  color: ${(props) => (props.selected ? "#fff" : "#878d94")};
  font-size: 20px;
  font-weight: 400;
  line-height: 54px;
  text-align: center;
  transition: 0.3s;
  cursor: pointer;

  &:first-child {
    border-top-left-radius: 60px;
    border-bottom-left-radius: 60px;
    border-right: 1px solid #d7d7d7;
  }

  &:last-child {
    border-top-right-radius: 60px;
    border-bottom-right-radius: 60px;
    border-left: 1px solid #d7d7d7;
  }

  /* 현재 선택된 버튼은 hover 되지 않도록 함 */
  &:hover {
    background-color: ${(props) => (props.selected ? "#0A58BE" : "#d5dadc")};
  }
`;

export const PreviewListContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 70px;
`;

export const PreviewListBox = styled(Link)`
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
    font-size: 13px;
    font-weight: 300;
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
  border: 1px solid #222;
  & > div {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 300;
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
