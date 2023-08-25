import React from "react";
import Slider from "react-slick";
import "./slick.css";
import { styled } from "styled-components";

function SampleArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "none" }}
      onClick={onClick}
    />
  );
}

function MainCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    pauseOnHover: true,
    nextArrow: <SampleArrow />,
    prevArrow: <SampleArrow />,
    appendDots: (dots) => <ul style={{ listStyle: "none" }}>{dots}</ul>,
    dotsClass: "dots_custom",
  };
  return (
    <div>
      <StyledSlider
        {...settings}
        style={{
          height: "700px",
          width: "100%",
        }}
      >
        <ImageContainer>
          <img src="image/mainBanner01.jpg" alt="MainCarousel1" />
        </ImageContainer>
        <ImageContainer>
          <img src="image/mainBanner02.jpg" alt="MainCarousel2" />
        </ImageContainer>
        <ImageContainer>
          <img src="image/mainBanner03.jpg" alt="MainCarousel3" />
        </ImageContainer>
      </StyledSlider>
    </div>
  );
}

export default MainCarousel;

const StyledSlider = styled(Slider)`
  display: flex;
  justify-content: center;

  & > ul {
    position: absolute;
    bottom: 24px;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
