import React from "react";
import * as s from "./StyledMiddleBanner";

const MiddleBanner = () => {
  return (
    <s.MiddleBannerContainer>
      <s.ImageBox />
      <s.ImageBox />
      <s.MiddleBannerPhrasesBox>
        <h2>AD) 스파르타 코딩 클럽</h2>
        <h3>노트북 하나로 세계 어디서든!</h3>
        <div>
          <span>
            여행을 좋아하는 당신! <br />
            노트북 하나만 있다면 세계 어디서든 자유롭게 <br />
            코딩을 할 수 있다는 사실, 알고 계셨나요?
            <br /> 두 손으로 코딩을, 두 발에게는 자유를!
            <br />
            여행하는 개발자... 낭만 있잖아?! 👩‍💻👨‍💻
          </span>
        </div>
        <s.MoreInfoButton href="https://spartacodingclub.kr/" target="blank">
          <span>더 알아보기</span>
          <div></div>
        </s.MoreInfoButton>
      </s.MiddleBannerPhrasesBox>
    </s.MiddleBannerContainer>
  );
};

export default MiddleBanner;
