import React from "react";
import { Link, useParams } from "react-router-dom";
import { styled } from "styled-components";

const Category = () => {
  const { nation } = useParams();
  return (
    <CategoryContainer>
      <h2>카테고리별 핫 플레이스</h2>
      <CategoryButtonBox>
        <CategoryBox to={`/${nation}/관광명소`}>
          <span>관광명소</span>
        </CategoryBox>
        <CategoryBox to={`/${nation}/맛집`}>
          <span>맛집</span>
        </CategoryBox>
        <CategoryBox to={`/${nation}/숙박`}>
          <span>숙박</span>
        </CategoryBox>
      </CategoryButtonBox>
    </CategoryContainer>
  );
};

export default Category;

const CategoryContainer = styled.div`
  margin: 140px 0;
  text-align: center;
`;

const CategoryButtonBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 80px auto;
  gap: 90px;
`;

const CategoryBox = styled(Link)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background-color: #999;

  font-size: 20px;
  font-weight: 400;
  color: white;

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  &:first-child {
    background-image: url(image/tourPlace.jpg);
    background-position: bottom;
  }

  &:nth-child(2) {
    background-image: url(image/food.jpg);
    background-position: top;
  }
  &:last-child {
    background-image: url(image/hotel.jpg);
    background-position: bottom;
  }

  & > span {
    z-index: 10;
  }

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 60%;
    background-color: rgba(0, 0, 0, 0.6);

    transition: 0.3s;
  }

  &:hover::after {
    background-color: transparent;
  }

  &:hover > span {
    display: none;
  }
  /* 추후 수정방향에 따라 변경필요 */
`;
