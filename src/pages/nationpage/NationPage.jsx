import React from "react";
import Category from "./components/Category";
import MiddleBanner from "./components/MiddleBanner";
import Preview from "./components/Preview";
import EventBanner from "./components/EventBanner";

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
      <div className="BestPlaceContainer">
        <h2>베스트 또갈집</h2>
        <div className="BestPlaceBox">
          <div className="BestPlaceImgBox">이미지</div>
          <div className="BestPlacePhrasesBox">
            <h3>[맛집] 부평 우와</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi
              libero totam cupiditate suscipit, nesciunt consequatur deleniti
              incidunt alias dolorum ullam recusandae reiciendis sed temporibus
              odio quidem consequuntur? Laboriosam, mollitia quas!
            </p>
            <button className="MoreInfoButton">
              <span>더 알아보기</span>
              <img src="" alt=">" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NationPage;
