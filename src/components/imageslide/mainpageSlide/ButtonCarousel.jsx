import React from "react";
import Slider from "react-slick";
import { styled } from "styled-components";
import { Link } from "react-router-dom";

export default function ButtonCarousel() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  return (
    <div>
      <NationContainer>
        <Slider {...settings}>
          <StyledButton
            to={"/한국"}
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/image/korea.jpg`,
            }}
          >
            <span>한국</span>
          </StyledButton>
          <StyledButton
            to={"/일본"}
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/image/japan.jpg`,
            }}
          >
            <span>일본</span>
          </StyledButton>
          <StyledButton
            to={"/미국"}
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/image/america.jpg`,
            }}
          >
            <span>미국</span>
          </StyledButton>
          <StyledButton
            to={"/한국"}
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/image/korea.jpg`,
            }}
          >
            <span>한국2</span>
          </StyledButton>
          <StyledButton
            to={"/일본"}
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/image/japan.jpg`,
            }}
          >
            <span>일본2</span>
          </StyledButton>
          <StyledButton
            to={"/미국"}
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/image/america.jpg`,
            }}
          >
            <span>미국2</span>
          </StyledButton>
        </Slider>
      </NationContainer>
    </div>
  );
}

const NationContainer = styled.div`
  width: 1280px;
  margin: 0 30px;
  align-items: center;
  gap: 70px;
`;

const NationInner = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 70px;
`;

const StyledButton = styled(Link)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 380px;
  height: 380px;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  cursor: pointer;

  &:first-child {
    background-image: url(${process.env.PUBLIC_URL}/image/korea.jpg);
  }
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: transparent;

    transition: 0.3s;
  }
  &:hover {
    & > span {
      display: inline-block;
    }

    &::after {
      background-color: rgba(0, 0, 0, 0.6);
    }
  }
  & > span {
    display: none;
    font-size: 32px;
    font-weight: 600;
    color: #fff;
    z-index: 30;
    transition: 0.3s;
  }
`;
