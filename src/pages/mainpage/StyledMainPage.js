import { styled } from "styled-components";
export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 800px;
  background: url(${process.env.PUBLIC_URL}/image/mainBg.jpg) no-repeat top
    center / cover;
  z-index: 1;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 10;
  }
`;

export const MainInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 20;

  & > h2 {
    color: white;
    font-size: 48px;
    font-weight: 700;
  }
`;
