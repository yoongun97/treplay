import { styled } from "styled-components";

export const DetailContainer = styled.div``;

export const DetailContainerInner = styled.div`
  width: 1280px;
  margin: 0 auto;

  & > h2 {
    margin: 140px 0 60px;
    color: #222;
    text-align: center;
    font-size: 28px;
    font-weight: 700;
  }
`;
export const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
export const DateContainer = styled.div`
  & > span {
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    color: #777;
  }
`;
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
export const ReactButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  & > button {
    width: 24px;
    height: 24px;
    background-color: transparent;
    border: none;
  }
`;

export const EditButtonContainer = styled.div`
  & > button {
    width: 56px;
    height: 28px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 400;
  }

  & > button:first-child {
    margin: 10px;
    background-color: #fff;
    color: #e5e5e5;
    border: 1px solid #e5e5e5;
  }

  & > button:last-child {
    color: #fff;
    background-color: #222;
  }
`;

export const ContentsContainer = styled.div`
  position: relative;
  padding-bottom: 40px;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  word-break: keep-all;

  & > p:nth-child(2) {
    margin-top: 20px;
    font-size: 14px;
    color: #777;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: #e5e5e5;
  }
`;
