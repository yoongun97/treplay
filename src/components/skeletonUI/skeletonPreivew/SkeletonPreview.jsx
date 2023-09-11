import React from "react";
import SkeletonCard from "../skeletonCard/SkeletonCard";
import * as s from "./StyledSkeletonPreview";

function SkeletonPreview() {
  return (
    <s.PreviewContainer>
      <h2>구경해봐요 또갈집</h2>
      <s.CategoryButtonContainer>
        <s.CategoryButton>숙박</s.CategoryButton>
        <s.CategoryButton>맛집</s.CategoryButton>
        <s.CategoryButton>관광명소</s.CategoryButton>
      </s.CategoryButtonContainer>
      <s.PreviewListContainer>
        <SkeletonCard />
      </s.PreviewListContainer>
    </s.PreviewContainer>
  );
}

export default SkeletonPreview;
