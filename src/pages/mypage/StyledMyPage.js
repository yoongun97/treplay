import { styled } from "styled-components";
export const MypageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 140px;
`;
export const UserInfoInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 140px 0 140px;
  background-color: #f2f8ff;
  & > h3 {
    text-align: center;
    font-size: 32px;
    font-weight: 600;
  }
`;
export const ListContainer = styled.div`
  width: 1280px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ChangeButtonContainer = styled.div`
  display: flex;
`;

export const ChangeButton = styled.div`
  width: 150px;
  height: 54px;
  margin: 140px 0 60px;

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
  }

  &:last-child {
    border-top-right-radius: 60px;
    border-bottom-right-radius: 60px;
  }

  /* 현재 선택된 버튼은 hover 되지 않도록 함 */
  &:hover {
    background-color: ${(props) => (props.selected ? "#0A58BE" : "#d5dadc")};
  }
`;

export const AllDeleteBtn = styled.button`
  background-color: transparent;
  border: none;
  width: 65px;
  height: 26px;
  font-size: 18px;
  color: #777777;
  margin-top: 168px;
`;

export const ListContainerInner = styled.div``;
