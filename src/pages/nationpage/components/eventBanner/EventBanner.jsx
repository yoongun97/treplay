import React from "react";
import { useParams } from "react-router-dom";
import * as s from "./StyledEventBanner";
const EventBanner = () => {
  const { nation } = useParams();

  return (
    <s.EventBannerContainer>
      <s.ImageBox></s.ImageBox>
      <s.EventBannerBoxContainer>
        <s.EventBannerBox>
          <h4>#먹방대전! 또갈 맛집 투표하기</h4>
          <p>
            {nation}에서 기억에 남는 맛집이 있나요? <br /> 최고의 맛집에
            또가요를 남겨 주세요
          </p>
          <s.LinkBox to={`/${nation}/맛집`}>
            <span>보러가기</span>
            <div></div>
          </s.LinkBox>
        </s.EventBannerBox>
        <s.EventBannerBox>
          <h4>#나만의 또갈집 자랑하기</h4>
          <p>
            {nation}이라면 역시 이곳! <br /> 나의 원픽 추천 장소를 자랑해
            주세요!
          </p>
          <s.LinkBox to={`/create`}>
            <span>자랑하기</span>
            <div></div>
          </s.LinkBox>
        </s.EventBannerBox>
      </s.EventBannerBoxContainer>
    </s.EventBannerContainer>
  );
};

export default EventBanner;
