import React from "react";
import * as s from "./StyledSavedList";

function SavedList({ savedPosts, allLikedData }) {
  return (
    <s.ListContainer>
      {savedPosts?.map((post) => {
        const likedCount = allLikedData?.filter(
          (data) => data.postId === post.id && data.state === "like"
        );
        const dislikedCount = allLikedData?.filter(
          (data) => data.postId === post.id && data.state === "dislike"
        );
        const imageUrl = post.postImgs[0];
        const imageStyle = {
          backgroundImage: `url(${imageUrl})`,
        };
        return (
          <s.ListBox key={post.id} to={`/detail/${post.id}`}>
            <s.ImageBox style={imageStyle}></s.ImageBox>
            <h4>{post.placeName}</h4>
            <h5> {post.author}</h5>
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
          </s.ListBox>
        );
      })}
    </s.ListContainer>
  );
}

export default SavedList;
