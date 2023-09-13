import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const SuggestLogin = () => {
  // Clean Up 함수를 이용해 페이지 언마운트 시 스크롤 가장 위로
  useEffect(() => {
    return () => {
      window.scrollTo(0, 0);
    };
  }, []);

  return (
    <SuggestContainer>
      <SuggestInner>
        <h2>
          <span>로그인</span>하시고
          <br />
          <span>최고의 또갈집</span>을 공유해 주세요
        </h2>
        <ImageBox></ImageBox>
        <BubbleBox>
          <span>로그인 후 최고의 여행스팟을 공유해 주세요!</span>
        </BubbleBox>
        <StyledButton to={"/login"}>
          <span>로그인 하러가기</span>
          <span></span>
        </StyledButton>
      </SuggestInner>
    </SuggestContainer>
  );
};

export default SuggestLogin;

const SuggestContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 90px);
  min-height: 800px;
  background: url(${process.env.PUBLIC_URL}/image/suggest_bg.png) no-repeat
    center / cover;
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
  width: 300px;
  height: 300px;
  margin: 60px 0;
  border-radius: 50%;
  background: url(${process.env.PUBLIC_URL}/image/suggest_image.jpg) no-repeat
    center / cover;
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

  &:hover {
    background-color: #0a58be;
    color: #fff;
  }

  & > span:last-child {
    width: 23px;
    height: 16px;
    background: url(${process.env.PUBLIC_URL}/icon/arrow_blue.svg) no-repeat
      center / 100%;
    transition: 0.3s;
  }
  &:hover > span:last-child {
    background-image: url(${process.env.PUBLIC_URL}/icon/arrow_white.svg);
  }
`;
