import React from "react";
import * as s from "./StyledSkeletonBest";
import MoreInfoButton from "../../../pages/nationpage/components/MoreInfoButton";

function SkeletonBest() {
  return (
    <s.BestPlaceContainer>
      <h2>베스트 또갈집</h2>
      <s.BestPlaceBox>
        <s.ImageBox />
        <s.PhrasesBox>
          <MoreInfoButton />
        </s.PhrasesBox>
      </s.BestPlaceBox>
    </s.BestPlaceContainer>
  );
}

export default SkeletonBest;
