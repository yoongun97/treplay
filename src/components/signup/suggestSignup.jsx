import React from 'react';
import { styled } from 'styled-components';

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
        <StyledButton>
          <span>회원가입 하러가기</span>
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
`;
const SuggestInner = styled.div`
  text-align: center;
  & > h2 {
    width: 375px;
  }
`;
const ImageBox = styled.div``;
const BubbleBox = styled.div`
  width: 600px;
  height: 79px;
  background: url(${process.env.PUBLIC_URL}/image/suggest_bubble.png) no-repeat
    center / 100%;
`;
const StyledButton = styled.div``;
