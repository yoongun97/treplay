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
    speed: 1000,
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
    <div className="CarouselContainer">
      <StyledSlider
        {...settings}
        style={{
          height: "700px",
          width: "100%",
        }}
      >
        <ImageContainer>
          <img
            src={`${process.env.PUBLIC_URL}/image/mainBanner01.jpg`}
            alt="MainCarousel1"
          ></img>
        </ImageContainer>
        <ImageContainer>
          <img
            src={`${process.env.PUBLIC_URL}/image/mainBanner02.jpg`}
            alt="MainCarousel2"
          ></img>
        </ImageContainer>
        <ImageContainer>
          <img
            src={`${process.env.PUBLIC_URL}/image/mainBanner03.jpg`}
            alt="MainCarousel3"
          ></img>
        </ImageContainer>
      </StyledSlider>
    </div>
  );
}

export default MainCarousel;

const StyledSlider = styled(Slider)`
  position: relative;
  display: flex;
  justify-content: center;
  & > div {
    width: 100%;
    height: 100%;
  }

  & > ul {
    position: absolute;
    bottom: -24px;
    left: 0;
    right: 0;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  & > img {
    object-fit: cover;
  }
`;
