import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as s from "./StyledPreview";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import SkeletonPreview from "../../../../components/skeletonUI/skeletonPreivew/SkeletonPreview";

const Preview = ({ selectedCategory, setSelectedCategory, fetch }) => {
  const { nation } = useParams();
  const [selectedPosts, setSelectedPosts] = useState([]);

  const { data, isLoading, iserror, error } = useQuery("userData", fetch);

  useEffect(() => {
    const fetchData = async () => {
      if (data) {
        const filteredPosts = await data.posts.filter(
          (post) => post.nation === nation && post.category === "숙박"
        );
        setSelectedPosts(filteredPosts);
      }
    };

    fetchData();
  }, [data]);

  if (isLoading) {
    return <SkeletonPreview />;
  }
  if (iserror) {
    return Swal.fire({
      title: `에러 발생! Error Code: ${error.message}`,
      icon: "error",
    });
  }

  const { posts, allLikedData } = data;

  const selectListHandler = async (category) => {
    const filteredPosts = await posts.filter(
      (post) => post.nation === nation && post.category === category
    );
    setSelectedPosts(filteredPosts);
  };

  return (
    <s.PreviewContainer>
      <h2>구경해봐요 또갈집</h2>
      <s.CategoryButtonContainer>
        <s.CategoryButton
          onClick={() => {
            selectListHandler("숙박");
            setSelectedCategory("숙박");
          }}
          selected={selectedCategory === "숙박"}
        >
          숙박
        </s.CategoryButton>
        <s.CategoryButton
          onClick={() => {
            selectListHandler("맛집");
            setSelectedCategory("맛집");
          }}
          selected={selectedCategory === "맛집"}
        >
          맛집
        </s.CategoryButton>
        <s.CategoryButton
          onClick={() => {
            selectListHandler("관광명소");
            setSelectedCategory("관광명소");
          }}
          selected={selectedCategory === "관광명소"}
        >
          관광명소
        </s.CategoryButton>
      </s.CategoryButtonContainer>
      <s.PreviewListContainer>
        {selectedPosts.map((post, index) => {
          if (index <= 2) {
            const imageUrl = post.postImgs[0];
            const imageStyle = {
              backgroundImage: `url(${imageUrl})`,
            };
            const likedCount = allLikedData?.filter(
              (data) => data.postId === post.id && data.state === "like"
            );
            const dislikedCount = allLikedData?.filter(
              (data) => data.postId === post.id && data.state === "dislike"
            );
            return (
              <s.PreviewListBox to={`/detail/${post.id}`} key={post.id}>
                <s.ImageBox style={imageStyle}></s.ImageBox>
                <h4>{post.placeName}</h4>
                <h5>{post.placeLocation}</h5>
                <p>
                  <span># </span>
                  {post.postOneLineContent}
                </p>
                <s.LikesContainer>
                  <s.LikesBox>
                    <img
                      src={`${process.env.PUBLIC_URL}/icon/like_icon.svg`}
                      alt="likesIcon"
                    ></img>
                    <span>{likedCount.length}</span>
                  </s.LikesBox>
                  <s.DislikesBox>
                    <img
                      src={`${process.env.PUBLIC_URL}/icon/dislike_icon.svg`}
                      alt="dislikesIcon"
                    ></img>
                    <span>{dislikedCount.length}</span>
                  </s.DislikesBox>
                </s.LikesContainer>
              </s.PreviewListBox>
            );
          }
          return null;
        })}
      </s.PreviewListContainer>
    </s.PreviewContainer>
  );
};

export default Preview;
