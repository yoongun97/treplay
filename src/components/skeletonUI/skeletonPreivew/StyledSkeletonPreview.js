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
  font-weight: ${(props) => (props.selected ? "500" : "400")};
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
