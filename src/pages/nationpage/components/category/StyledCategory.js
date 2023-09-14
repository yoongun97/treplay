import { Link } from "react-router-dom";
import { styled } from "styled-components";
export const CategoryContainer = styled.div`
  margin: 140px 0;
  text-align: center;
`;

export const CategoryButtonBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 80px auto;
  gap: 90px;
`;

export const CategoryBox = styled(Link)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background-color: #999;

  font-size: 20px;
  font-weight: 500;
  color: white;

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  &:first-child {
    background-image: url(${process.env.PUBLIC_URL}/image/tourPlace.jpg);
    background-position: bottom;
  }

  &:nth-child(2) {
    background-image: url(${process.env.PUBLIC_URL}/image/food.jpg);
    background-position: top;
  }
  &:last-child {
    background-image: url(${process.env.PUBLIC_URL}/image/hotel.jpg);
    background-position: bottom;
  }

  & > span {
    display: none;
    z-index: 10;
    transition: 0.3s;
  }

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    transition: 0.3s;
  }

  &:hover::after {
    background-color: rgba(0, 0, 0, 0.6);
  }

  &:hover > span {
    display: inline-block;
  }
`;
