import React from "react";
import Slider from "react-slick";
import { styled } from "styled-components";
import "./detailSlick.css";

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <StyleNextButton className={className} onClick={onClick}>
      <img
        src={`${process.env.PUBLIC_URL}/icon/slider_right.svg`}
        alt="slider_icon"
      ></img>
    </StyleNextButton>
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <StylePrevButton className={className} onClick={onClick}>
      <img
        src={`${process.env.PUBLIC_URL}/icon/slider_left.svg`}
        alt="slider_icon"
      ></img>
    </StylePrevButton>
  );
}

function ImageCarousel({ postImgs }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    appendDots: (dots) => <ul style={{ listStyle: "none" }}>{dots}</ul>,
    dotsClass: "dots_custom",
  };
  return (
    <SliderContainer>
      <Slider {...settings}>
        {postImgs.map((img, index) => (
          <ImageBox key={index}>
            <img src={img} alt="디테일 이미지" />
          </ImageBox>
        ))}
      </Slider>
    </SliderContainer>
  );
}

export default ImageCarousel;

const SliderContainer = styled.div`
  margin-bottom: 40px;

  & > div {
    position: relative;
  }
  & > div > ul {
    position: absolute;
    bottom: -10px;
  }
`;

const StyleNextButton = styled.button`
  width: 24px;
  height: 24px;

  &::before {
    display: none;
  }
  &::after {
    content: "";
    background: url(${process.env.PUBLIC_URL}/icon/slider_left.svg) no-repeat
      center / 100%;
  }
`;

const StylePrevButton = styled.button`
  width: 24px;
  height: 24px;

  &::before {
    display: none;
  }
  &::after {
    content: "";
    background: url(${process.env.PUBLIC_URL}/icon/slider_right.svg) no-repeat
      center / 100%;
  }
`;

const ImageBox = styled.div`
  justify-content: center;
  align-items: center;
  width: 1280px;
  margin: 20px 0;
  border-radius: 8px;

  & > img {
    width: auto;
    height: 700px;
    margin: 0 auto;
    border-radius: 8px;
  }
`;
