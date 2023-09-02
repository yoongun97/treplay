import React from "react";
import { useParams } from "react-router-dom";
import * as s from "./StyledCategory";

const Category = () => {
  const { nation } = useParams();
  return (
    <s.CategoryContainer>
      <h2>카테고리별 핫 플레이스</h2>
      <s.CategoryButtonBox>
        <s.CategoryBox to={`/${nation}/관광명소`}>
          <span>관광명소</span>
        </s.CategoryBox>
        <s.CategoryBox to={`/${nation}/맛집`}>
          <span>맛집</span>
        </s.CategoryBox>
        <s.CategoryBox to={`/${nation}/숙박`}>
          <span>숙박</span>
        </s.CategoryBox>
      </s.CategoryButtonBox>
    </s.CategoryContainer>
  );
};

export default Category;
