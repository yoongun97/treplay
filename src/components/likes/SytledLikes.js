import { styled } from "styled-components";

export const LikesContainer = styled.div`
  margin-bottom: 140px;
  text-align: center;
`;
export const BarContainer = styled.div`
  width: 1280px;
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
`;
export const LikesBar = styled.div.attrs((props) => ({
  // "likes"와 "dislikes" 속성을 필터링합니다.
  likes: undefined,
  dislikes: undefined,
}))`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 1;
  width: ${(props) => props.likes}%;
  min-width: 90px;
  height: 40px;
  padding: 0 20px;
  background-color: #0a58be;
`;

export const DislikesBar = styled.div.attrs((props) => ({
  // "likes"와 "dislikes" 속성을 필터링합니다.
  likes: undefined,
  dislikes: undefined,
}))`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;
  flex-shrink: 0;
  width: ${(props) => props.dislikes}%;
  min-width: 90px;
  height: 40px;
  padding: 0 20px;
  background-color: #fcd71e;
`;
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 40px;

  & > button {
    width: 240px;
    height: 80px;
    border-radius: 60px;
    outline: none;
    font-size: 18px;
    font-weight: 500;
  }

  & > button > div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }

  & p {
    font-size: 14px;
    font-weight: 400;
    color: #222;
  }
`;
export const LikesButton = styled.button`
  border: 1px solid ${(props) => (props.disabled ? "#e5e5e5" : "#0a58be")};
  color: #0a58be;
  background-color: ${(props) => (props.disabled ? "#e5e5e5" : "#fff")};
`;
export const DislikesButton = styled.button`
  border: 1px solid ${(props) => (props.disabled ? "#e5e5e5" : "#fcd71e")};
  color: #fcd71e;
  background-color: ${(props) => (props.disabled ? "#e5e5e5" : "#fff")};
`;
