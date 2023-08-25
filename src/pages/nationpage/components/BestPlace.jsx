import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import MoreInfoButton from "./MoreInfoButton";
import { useQuery } from "react-query";

const BestPlace = ({ posts, allLikedData }) => {
  const { nation } = useParams();
  const [bestPost, setBestPost] = useState();

  const nationPosts = posts.filter((post) => post.nation === nation);

  const findMostLikedPost = async () => {
    const likeCounts = {};

    // 좋아요가 "like"인 경우의 개수를 카운트

    await nationPosts.map((post) => {
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
  }, [posts]);

  return (
    <BestPlaceContainer>
      <h2>베스트 또갈집</h2>
      <BestPlaceBox>
        <ImageBox $imageurl={bestPost?.postImgs[0]}></ImageBox>
        {/* 경고문 발생한 거 해결 위해 $붙임 */}
        <PhrasesBox>
          <h4>
            [{bestPost?.category}] {bestPost?.placeName}
          </h4>
          <div>
            <span>{bestPost?.postContent}</span>
          </div>
          <MoreInfoButton to={`/detail/${bestPost?.id}`}></MoreInfoButton>
        </PhrasesBox>
      </BestPlaceBox>
    </BestPlaceContainer>
  );
};

export default BestPlace;

const BestPlaceContainer = styled.div`
  max-width: 1920px;
  margin: 140px auto;
  text-align: center;
  & > h2 {
    margin-bottom: 80px;
  }
`;

const BestPlaceBox = styled.div`
  position: relative;
  height: 420px;
  /* 박스 두 개 겹침 현상 때문에 min-width 설정 */
`;

const ImageBox = styled.div`
  position: absolute;
  top: 0;
  left: 320px;
  width: 640px;
  height: 420px;
  background-image: url(${(props) => props.$imageurl});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const PhrasesBox = styled.div`
  position: absolute;
  top: 40px;
  right: 320px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 660px;
  height: 340px;
  padding: 46.5px 50px;
  background-color: #f2f8ff;
  text-align: left;

  & > h4 {
    margin-bottom: 12px;
    color: #222;
    font-size: 22px;
    font-weight: 500;
  }

  & > div {
    flex-grow: 1;
    color: #777777;
    font-size: 16px;
    font-weight: 300;
    line-height: 1.5;

    & > span {
      overflow: hidden;
      white-space: normal;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 6;
      -webkit-box-orient: vertical;
      word-break: keep-all;
    }
  }
`;
