import { styled } from "styled-components";

export const LikesContainer = styled.div`
  margin-bottom: 140px;
  text-align: center;
`;
export const BarContainer = styled.div`
  width: 1080px;
  height: 40px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
`;
export const LikesBar = styled.div`
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
export const DislikesBar = styled.div`
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
  }

  & > button > div > span:first-child {
    width: 20px;
    height: 20px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
`;
export const LikesButton = styled.button`
  border: 1px solid ${(props) => (props.disabled ? "#0a58be" : "#0a58be")};
  color: ${(props) => (props.disabled ? "#fff" : "#0a58be")};
  background-color: ${(props) => (props.disabled ? "#0a58be" : "#fff")};

  & > p {
    color: ${(props) => (props.disabled ? "#fff" : "#222")};
  }

  & > div > span:first-child {
    background-image: ${(props) =>
      props.disabled
        ? `url(${process.env.PUBLIC_URL}/icon/like_icon_white.svg)`
        : `url(${process.env.PUBLIC_URL}/icon/like_icon.svg)`};
  }
`;
export const DislikesButton = styled.button`
  border: 1px solid ${(props) => (props.disabled ? "#fcd71e" : "#fcd71e")};
  color: ${(props) => (props.disabled ? "#222" : "#fcd71e")};
  background-color: ${(props) => (props.disabled ? "#fcd71e" : "#fff")};

  & > p {
    color: ${(props) => (props.disabled ? "#222" : "#222")};
  }

  & > div > span:first-child {
    background-image: ${(props) =>
      props.disabled
        ? `url(${process.env.PUBLIC_URL}/icon/dislike_icon_black.svg)`
        : `url(${process.env.PUBLIC_URL}/icon/dislike_icon.svg)`};
  }
`;
