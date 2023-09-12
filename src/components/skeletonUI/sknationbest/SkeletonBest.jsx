import React from "react";
import * as s from "./StyledSkeletonBest";
import MoreInfoButton from "../../../pages/nationpage/components/MoreInfoButton";

function SkeletonBest() {
  return (
    <s.BestPlaceContainer>
      <h2>베스트 또갈집</h2>
      <s.BestPlaceBox>
        <s.ImageBox />
        {/* 경고문 발생한 거 해결 위해 $붙임 */}
        <s.PhrasesBox>
          <MoreInfoButton />
        </s.PhrasesBox>
      </s.BestPlaceBox>
    </s.BestPlaceContainer>
  );
}

export default SkeletonBest;
