import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MoreInfoButton from "../MoreInfoButton";
import * as s from "./StyledBestPlace";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import SkeletonBest from "../../../../components/skeletonUI/sknationbest/SkeletonBest";

const BestPlace = ({ fetch }) => {
  const { nation } = useParams();
  const [bestPost, setBestPost] = useState();

  useEffect(() => {
    if (data && data.posts && allLikedData) {
      const nationPosts = data.posts.filter((post) => post.nation === nation);

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
      findMostLikedPost();
    }
  }, [{ nation }]);

  // 리액트 쿼리로 로딩/에러 처리
  const { data, isLoading, iserror, error } = useQuery("userData", fetch);

  if (isLoading) {
    return <SkeletonBest />;
  }
  if (iserror) {
    return Swal.fire({
      title: `에러 발생! Error Code: ${error.message}`,
      icon: "error",
    });
  }

  const { posts, allLikedData } = data;

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
