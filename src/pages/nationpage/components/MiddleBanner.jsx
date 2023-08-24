import React from "react";
import { styled } from "styled-components";

const MiddleBanner = () => {
  return (
    <MiddleBannerContainer>
      <ImageBox>이미지1</ImageBox>
      <ImageBox>이미지2</ImageBox>
      <MiddleBannerPhrasesBox>
        <h2>모여봐요 또갈집</h2>
        <h3>또 다른 프로필을 구경해 보세요</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime
          numquam ducimus, possimus porro saepe vel assumenda! Eveniet maiores
          sed animi aperiam, nulla deserunt voluptatem quod, saepe sunt soluta
          possimus esse?
        </p>
        <MoreInfoButton>
          <span>더 알아보기</span>
          <span>{`>`}</span>
        </MoreInfoButton>
      </MiddleBannerPhrasesBox>
    </MiddleBannerContainer>
  );
};

export default MiddleBanner;

const MiddleBannerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 140px 0;
  background-color: #f2f8ff;
`;
const ImageBox = styled.div`
  width: 400px;
  height: 400px;
  border-radius: 30px;
  background-color: #999;

  &:first-child {
    margin-right: 20px;
  }
`;

const MiddleBannerPhrasesBox = styled.div`
  width: 330px;
  margin-left: 80px;

  & > h3 {
    margin: 16px 0px 12px;
    color: #222;
    font-weight: 500;
    font-size: 22px;
  }

  & > p {
    margin-bottom: 16px;
    font-size: 16px;
    font-weight: 300;
    color: #878d94;
  }
`;

const MoreInfoButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 180px;
  height: 52px;
  border-radius: 60px;
  border: 1px solid #0a58be;
  background-color: #fff;
  color: #0a58be;
  font-size: 18px;
  font-weight: 400;
  transition: 0.3s;

  &:hover {
    background-color: #0a58be;
    color: #fff;
  }
`;
