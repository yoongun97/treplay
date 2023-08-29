import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const SuggestSignup = () => {
  return (
    <SuggestContainer>
      <SuggestInner>
        <h2>
          <span>회원가입</span>을 통하여
          <br />
          <span>최고의 또갈집</span>을 확인해보세요
        </h2>
        <ImageBox></ImageBox>
        <BubbleBox>
          <span>회원가입 후 최고의 여행스팟을 공유해 주세요!</span>
        </BubbleBox>
        <StyledButton to={"/signup"}>
          <span>회원가입 하러가기</span>
          <img
            src={`${process.env.PUBLIC_URL}/icon/arrow_blue.svg`}
            alt="arrow_blue_icon"
          />
        </StyledButton>
      </SuggestInner>
    </SuggestContainer>
  );
};

export default SuggestSignup;

const SuggestContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 90px);
  background: url(${process.env.PUBLIC_URL}/image/suggest_bg.png) no-repeat
    center / 100%;
`;
const SuggestInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  & > h2 {
    font-size: 32px;
    font-weight: 600;
    line-height: 46px;
    color: #222;
  }

  & > h2 > span {
    color: #0a58be;
  }
`;
const ImageBox = styled.div`
  width: 260px;
  height: 260px;
  margin: 60px 0;
  border-radius: 50%;
  background-color: #fff;
`;
const BubbleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 79px;
  margin-bottom: 20px;
  background: url(${process.env.PUBLIC_URL}/image/suggest_bubble.png) no-repeat
    center / 100%;

  & > span {
    transform: translateY(-5px);
    font-size: 18px;
    font-weight: 400;
    color: #fff;
  }
`;
const StyledButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  width: 500px;
  height: 60px;
  border-radius: 60px;
  border: 1px solid #0a58be;
  background-color: #fff;
  transition: 0.3s;

  font-size: 18px;
  font-weight: 500;
  color: #0a58be;
`;
