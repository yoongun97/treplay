import React from "react";
import * as s from "./StyledSkeletonCard";

function SkeletonCard() {
  return (
    <s.PostsContainer>
      <s.PostBox>
        <s.ImageBox />
        <h4>로딩중</h4>
        <h5 />
        <p>
          <span># </span>
        </p>
        <s.LikesContainer>
          <s.LikesBox>
            <img
              src={`${process.env.PUBLIC_URL}/icon/like_icon.svg`}
              alt="likesIcon"
            ></img>
            <span />
          </s.LikesBox>
          <s.DislikesBox>
            <img
              src={`${process.env.PUBLIC_URL}/icon/dislike_icon.svg`}
              alt="dislikesIcon"
            ></img>
            <span />
          </s.DislikesBox>
        </s.LikesContainer>
      </s.PostBox>
      <s.PostBox>
        <s.ImageBox />
        <h4>로딩중</h4>
        <h5 />
        <p>
          <span># </span>
        </p>
        <s.LikesContainer>
          <s.LikesBox>
            <img
              src={`${process.env.PUBLIC_URL}/icon/like_icon.svg`}
              alt="likesIcon"
            ></img>
            <span />
          </s.LikesBox>
          <s.DislikesBox>
            <img
              src={`${process.env.PUBLIC_URL}/icon/dislike_icon.svg`}
              alt="dislikesIcon"
            ></img>
            <span />
          </s.DislikesBox>
        </s.LikesContainer>
      </s.PostBox>
      <s.PostBox>
        <s.ImageBox />
        <h4>로딩중</h4>
        <h5 />
        <p>
          <span># </span>
        </p>
        <s.LikesContainer>
          <s.LikesBox>
            <img
              src={`${process.env.PUBLIC_URL}/icon/like_icon.svg`}
              alt="likesIcon"
            ></img>
            <span />
          </s.LikesBox>
          <s.DislikesBox>
            <img
              src={`${process.env.PUBLIC_URL}/icon/dislike_icon.svg`}
              alt="dislikesIcon"
            ></img>
            <span />
          </s.DislikesBox>
        </s.LikesContainer>
      </s.PostBox>
    </s.PostsContainer>
  );
}

export default SkeletonCard;
