import React from "react";
import { Link, useParams } from "react-router-dom";
import Category from "./components/Category";

function NationPage() {
  // category 파라미터를 가져옴
  const { nation } = useParams();

  return (
    <div className="Container">
      {/* 최상위 이미지 배너 슬라이드 삽입 */}
      <div className="ImageSlide">이미지 배너 슬라이드</div>
      <Category />
      <div className="MiddleBannerContainer">
        <div>이미지1</div>
        <div>이미지2</div>
        <div className="MiddleBannerPhrasesBox">
          <h3>모여봐요 또갈집</h3>
          <h4>또 다른 프로필을 구경해 보세요</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime
            numquam ducimus, possimus porro saepe vel assumenda! Eveniet maiores
            sed animi aperiam, nulla deserunt voluptatem quod, saepe sunt soluta
            possimus esse?
          </p>
          <button className="MoreInfoButton">
            <span>더 알아보기</span>
            <img src="" alt=">" />
          </button>
        </div>
      </div>
      <div className="PreviewContainer">
        <h2>구경해봐요 또갈집</h2>
        <div className="PreviewButtonBox">
          <button>숙소</button>
          <button>맛집</button>
          <button>관광명소</button>
        </div>
        <div className="PreviewListContainer">
          <div className="PreviewListBox">
            <div>이미지</div>
            <div>likes</div>
            <div>dislikes</div>
          </div>
        </div>
      </div>
      <div className="EventBannerContainer">
        <div>이미지</div>
        <div className="EventBannerLeftBox">
          <h3>#먹방대전! 또갈 맛집 투표하기</h3>
          <p>
            {nation}에서 기억에 남는 맛집이 있나요? <br /> 최고의 맛집에
            또가요를 남겨 주세요
          </p>
          <Link to={`/${nation}/맛집`}>보러가기</Link>
        </div>
        <div className="EventBannerRightBox">
          <h3>#나만의 또갈집 자랑하기</h3>
          <p>
            {nation}이라면 역시 이곳! <br /> 나의 원픽 추천 장소를 자랑해
            주세요!
          </p>
          <Link to={`/create`}>자랑하기</Link>
        </div>
      </div>
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
