import React, { useCallback, useRef } from "react";
import Slider from "react-slick";
import { styled } from "styled-components";
import { Link } from "react-router-dom";

export default function MainCarousel() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
  };

  const slickRef = useRef(null);

  const previous = useCallback(() => slickRef.current.slickPrev(), []);
  const next = useCallback(() => slickRef.current.slickNext(), []);

  return (
    <ButtonContainer>
      <PrevButton onClick={previous} />
      <NationContainer>
        <StyledSlider {...settings} ref={slickRef}>
          <StyledButton1 to={"/한국"}>
            <span>한국</span>
          </StyledButton1>
          <StyledButton2 to={"/일본"}>
            <span>일본</span>
          </StyledButton2>
          <StyledButton3 to={"/미국"}>
            <span>미국</span>
          </StyledButton3>
          <StyledButton4 to={"/한국"}>
            <span>한국2</span>
          </StyledButton4>
          <StyledButton5 to={"/일본"}>
            <span>일본2</span>
          </StyledButton5>
          <StyledButton6 to={"/미국"}>
            <span>미국2</span>
          </StyledButton6>
        </StyledSlider>
      </NationContainer>
      <NextButton onClick={next} />
    </ButtonContainer>
  );
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 1400px;
  margin: 140px auto 0;
`;

const NationContainer = styled.div`
  margin: 0 auto;
`;

const StyledSlider = styled(Slider)`
  width: 1280px;
  transform: translateX(20px);

  & a {
    position: relative;
    display: flex !important;
    justify-content: center;
    align-items: center;
    width: 380px !important;
    height: 380px;
    border-radius: 50%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border: none;
    cursor: pointer;
    transition: 0.3s;

    & > span {
      display: none;
      font-size: 32px;
      font-weight: 500;
      color: #fff;
      z-index: 1000 !important;
    }

    &:hover > span {
      display: inline-block;
    }

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: transparent;

      transition: 0.3s;
    }
    &:hover {
      &::before {
        background-color: rgba(0, 0, 0, 0.6);
      }
    }
  }
`;

const StyledButton1 = styled(Link)`
  background-image: url(${process.env.PUBLIC_URL}/image/korea.jpg);
`;

const StyledButton2 = styled(Link)`
  background-image: url(${process.env.PUBLIC_URL}/image/japan.jpg);
`;

const StyledButton3 = styled(Link)`
  background-image: url(${process.env.PUBLIC_URL}/image/america.jpg);
`;
const StyledButton4 = styled(Link)`
  background-image: url(${process.env.PUBLIC_URL}/image/korea.jpg);
`;

const StyledButton5 = styled(Link)`
  background-image: url(${process.env.PUBLIC_URL}/image/japan.jpg);
`;

const StyledButton6 = styled(Link)`
  background-image: url(${process.env.PUBLIC_URL}/image/america.jpg);
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
