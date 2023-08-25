import React from "react";
import { Link, useParams } from "react-router-dom";
import { styled } from "styled-components";

const EventBanner = () => {
  const { nation } = useParams();

  return (
    <EventBannerContainer>
      <ImageBox>이미지</ImageBox>
      <EventBannerBoxContainer>
        <EventBannerBox>
          <h4>#먹방대전! 또갈 맛집 투표하기</h4>
          <p>
            {nation}에서 기억에 남는 맛집이 있나요? <br /> 최고의 맛집에
            또가요를 남겨 주세요
          </p>
          <LinkBox to={`/${nation}/맛집`}>
            <span>보러가기</span>
            <img src="icon/right_arrow_white.svg" alt="more_icon" />
          </LinkBox>
        </EventBannerBox>
        <EventBannerBox>
          <h4>#나만의 또갈집 자랑하기</h4>
          <p>
            {nation}이라면 역시 이곳! <br /> 나의 원픽 추천 장소를 자랑해
            주세요!
          </p>
          <LinkBox to={`/create`}>
            <span>자랑하기</span>
            <img src="icon/right_arrow_white.svg" alt="more_icon" />
          </LinkBox>
        </EventBannerBox>
      </EventBannerBoxContainer>
    </EventBannerContainer>
  );
};

export default EventBanner;

const EventBannerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 225px;
  background-color: #4b6be6;
`;

const ImageBox = styled.div`
  width: 230px;
  height: 200px;
  margin-right: 130px;
  background-color: #fff;
`;

const EventBannerBoxContainer = styled.div`
  display: flex;
  gap: 140px;
`;

const EventBannerBox = styled.div`
  height: 165px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 30px 0px;
  & > h4 {
    color: #fcd71e;
    font-size: 24px;
    font-weight: 600;
  }
  & > p {
    color: #fff;
    font-size: 18px;
    font-weight: 300;
    line-height: 1.5;
  }
`;

const LinkBox = styled(Link)`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 5px 5px 18px;
  width: 100px;
  height: 36px;
  border: 1px solid #fff;
  border-radius: 30px;
  color: #fff;
  font-size: 14px;
  font-weight: 300;
  text-align: center;
`;
