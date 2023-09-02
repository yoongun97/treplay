import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MoreInfoButton from "../MoreInfoButton";
import * as s from "./StyledBestPlace";

const BestPlace = ({ posts, allLikedData }) => {
  const { nation } = useParams();
  const [bestPost, setBestPost] = useState();

  const nationPosts = posts.filter((post) => post.nation === nation);

  const findMostLikedPost = () => {
    const likeCounts = {};

    // 좋아요가 "like"인 경우의 개수를 카운트

    nationPosts.forEach((post) => {
      const nationLikedData = allLikedData.filter(
        (data) => data.postId === post.id
      );

      nationLikedData.forEach((item) => {
        if (item.state === "like") {
          if (!likeCounts[item.postId]) {
            likeCounts[item.postId] = 1;
          } else {
            likeCounts[item.postId]++;
          }
        }
      });
    });

    let bestPostId = null;
    let maxLikeCount = 0;

    // 가장 많은 개수를 가진 postId를 찾음
    for (const postId in likeCounts) {
      if (likeCounts[postId] > maxLikeCount) {
        maxLikeCount = likeCounts[postId];
        bestPostId = postId;
      }
    }

    const [bestPost] = posts.filter((post) => post.id === bestPostId);
    setBestPost(bestPost);
  };

  useEffect(() => {
    findMostLikedPost();
  }, [{ nation }]);

  return (
    <s.BestPlaceContainer>
      <h2>베스트 또갈집</h2>
      <s.BestPlaceBox>
        <s.ImageBox $imageurl={bestPost?.postImgs[0]}></s.ImageBox>
        {/* 경고문 발생한 거 해결 위해 $붙임 */}
        <s.PhrasesBox>
          <h4>
            [{bestPost?.category}] {bestPost?.placeName}
          </h4>
          <div>
            <span>{bestPost?.postContent}</span>
          </div>
          <MoreInfoButton to={`/detail/${bestPost?.id}`}></MoreInfoButton>
        </s.PhrasesBox>
      </s.BestPlaceBox>
    </s.BestPlaceContainer>
  );
};

export default BestPlace;
