import { Link } from "react-router-dom";
import React from "react";
import { styled } from "styled-components";
import Footer from "../../common/Footer";
import MainHeader from "./MainHeader";

function MainPage() {
  return (
    <>
      <MainContainer>
        <MainHeader />
        <MainInner>
          <h2>어떤 여행지를 가고 싶으신가요?</h2>
          <ButtonContainer>
            <PrevButton />
            <NationContainer>
              <NationInner>
                <StyledButton to={"/한국"}>
                  <span>한국</span>
                </StyledButton>
                <StyledButton to={"/일본"}>
                  <span>일본</span>
                </StyledButton>
                <StyledButton to={"/미국"}>
                  <span>미국</span>
                </StyledButton>
              </NationInner>
            </NationContainer>
            <NextButton />
          </ButtonContainer>
        </MainInner>
      </MainContainer>
      <Footer />
    </>
  );
}

export default MainPage;

const MainContainer = styled.div`
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

const MainInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 20;

  & > h2 {
    color: white;
    font-size: 52px;
    font-weight: 600;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 140px;
`;

const PrevButton = styled.div`
  width: 30px;
  height: 30px;
  background-image: url(${process.env.PUBLIC_URL}/icon/left_arrow_white.svg);
  cursor: pointer;
`;

const NextButton = styled.div`
  width: 30px;
  height: 30px;
  background-image: url(${process.env.PUBLIC_URL}/icon/right_arrow_white.svg);
  background-size: cover;
  cursor: pointer;
`;

const NationContainer = styled.div`
  width: 1280px;
  margin: 0 30px;
`;

const NationInner = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 70px;
`;

const StyledButton = styled(Link)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 380px;
  height: 380px;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  cursor: pointer;

  &:first-child {
    background-image: url(${process.env.PUBLIC_URL}/image/korea.jpg);
  }

  &:nth-child(2) {
    background-image: url(${process.env.PUBLIC_URL}/image/japan.jpg);
  }

  &:nth-child(3) {
    background-image: url(${process.env.PUBLIC_URL}/image/america.jpg);
  }

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: transparent;

    transition: 0.3s;
  }
  &:hover {
    & > span {
      display: inline-block;
    }

    &::after {
      background-color: rgba(0, 0, 0, 0.6);
    }
  }
  & > span {
    display: none;
    font-size: 32px;
    font-weight: 500;
    color: #fff;
    z-index: 30;
    transition: 0.3s;
  }
`;
