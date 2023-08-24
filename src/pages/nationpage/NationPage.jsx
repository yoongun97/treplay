import React from "react";
import Category from "./components/Category";
import MiddleBanner from "./components/MiddleBanner";
import Preview from "./components/Preview";
import EventBanner from "./components/EventBanner";
import BestPlace from "./components/BestPlace";

function NationPage() {
  // category 파라미터를 가져옴

  return (
    <div className="Container">
      {/* 최상위 이미지 배너 슬라이드 삽입 */}
      <div className="ImageSlide">이미지 배너 슬라이드</div>
      <Category />
      <MiddleBanner />
      <Preview />
      <EventBanner />
      <BestPlace />
    </div>
  );
}

export default NationPage;
