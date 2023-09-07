import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 80px;
`;

export const PrevButton = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 16px;
  background: url(${process.env.PUBLIC_URL}/icon/left_arrow_gray.svg) no-repeat
    center / 100%;
  cursor: pointer;
`;
export const NextButton = styled.div`
  width: 24px;
  height: 24px;
  margin-left: 16px;
  background: url(${process.env.PUBLIC_URL}/icon/right_arrow_gray.svg) no-repeat
    center / 100%;
  cursor: pointer;
`;

export const PageNumberContianer = styled.div`
  display: flex;
  gap: 6px;
  justify-content: center;
  align-items: center;
`;

export const PageNumberButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 22px;
  height: 22px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;

  &.active {
    border-radius: 50%;
    color: #fff;
    background-color: #0a58be;
  }
`;

export const PageInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #b4b4b4;
  margin-top: 10px;
`;

export const DummyButton = styled.div`
  width: 24px;
  height: 24px;
  margin-left: 16px;
  margin-right: 16px;
  visibility: hidden; /* 화면에서 숨김 */
`;
