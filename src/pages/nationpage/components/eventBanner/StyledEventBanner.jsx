import { Link } from "react-router-dom";
import { styled } from "styled-components";

export const EventBannerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 225px;
  background-color: #4b6be6;
`;

export const ImageBox = styled.div`
  width: 480px;
  height: 261px;
  margin-right: 130px;
  background: url(${process.env.PUBLIC_URL}/image/banner_image_icon.png)
    no-repeat center / 100%;
`;

export const EventBannerBoxContainer = styled.div`
  display: flex;
  gap: 140px;
`;

export const EventBannerBox = styled.div`
  height: 165px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 30px 0px;
  & > h4 {
    color: #fcd71e;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: -20px;
  }
  & > p {
    color: #fff;
    font-size: 18px;
    font-weight: 400;
    line-height: 1.5;
  }
`;

export const LinkBox = styled(Link)`
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
  font-weight: 400;
  text-align: center;
  transition: 0.3s;

  &:hover {
    border: 1px solid #fcd71e;
    color: #fcd71e;
  }

  & > div {
    width: 24px;
    height: 24px;
    background: url(${process.env.PUBLIC_URL}/icon/right_arrow_white.svg)
      no-repeat center / 100%;
    transition: 0.3s;
  }

  &:hover > div {
    background: url(${process.env.PUBLIC_URL}/icon/right_arrow_yellow.svg)
      no-repeat center / 100%;
  }
`;
