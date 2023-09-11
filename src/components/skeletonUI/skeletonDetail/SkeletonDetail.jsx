import React from "react";
import * as s from "./StyledSkeletonDetail";
import Bookmark from "../../bookmark/Bookmark";
import Likes from "../../likes/Likes";

function SkeletonDetail() {
  return (
    <s.DetailContainer>
      <s.DetailContainerInner>
        <h2>장소명</h2>
        <s.InfoContainer>
          <s.DateContainer>
            <span>날짜</span>
            <span> | </span>
            <span>시간</span>
          </s.DateContainer>
          <s.ButtonContainer>
            <s.ReactButtonContainer>
              <Bookmark />
              <button>
                <img
                  src={`${process.env.PUBLIC_URL}/icon/share_icon.svg`}
                  alt="share_icon"
                ></img>
              </button>
            </s.ReactButtonContainer>
          </s.ButtonContainer>
        </s.InfoContainer>
        <s.ImageBox />

        <s.ContentsContainer>
          {/* 줄 바꿈 함수 추가 */}
          <p>내용</p>

          <p>한줄평</p>
        </s.ContentsContainer>
        <s.MapContainer />
        <Likes />
      </s.DetailContainerInner>
    </s.DetailContainer>
  );
}

export default SkeletonDetail;
