import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

function SavedList({ savedPosts, allLikedData }) {
  return (
    <ListContainer>
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
          <ListBox key={post.id} to={`/detail/${post.id}`}>
            <ImageBox style={imageStyle}></ImageBox>
            <h4>{post.placeName}</h4>
            <h5> {post.author}</h5>
            <p>
              <span># </span>
              {post.postOneLineContent}
            </p>
            <LikesContainer>
              <LikesBox>
                <img
                  src={`${process.env.PUBLIC_URL}/icon/like_icon.svg`}
                  alt="likesIcon"
                ></img>
                <span>{likedCount.length}</span>
              </LikesBox>
              <DislikesBox>
                <img
                  src={`${process.env.PUBLIC_URL}/icon/dislike_icon.svg`}
                  alt="dislikesIcon"
                ></img>
                <span>{dislikedCount.length}</span>
              </DislikesBox>
            </LikesContainer>
          </ListBox>
        );
      })}
    </ListContainer>
  );
}

export default SavedList;

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 70px;
  row-gap: 80px;
  width: 1280px;
`;

const ListBox = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 380px;
  text-align: left;

  & > h4 {
    margin-top: 20px;
    font-size: 20px;
    font-weight: 500;
    line-height: 26px;
    color: #222;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & > h5 {
    width: 100%;
    padding: 5px 0;
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & > p {
    padding-bottom: 8px;
    font-size: 13px;
    font-weight: 300;
    line-height: 26px;
    color: #777;
  }
`;

const ImageBox = styled.div`
  width: 380px;
  height: 380px;
  border-radius: 30px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const LikesContainer = styled.div`
  display: flex;
  align-items: center;
  height: 38px;
  padding: 0px 20px;
  border-radius: 10px;
  border: 1px solid #222;
  & > div {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 300;
  }

  & > div > img {
    margin-right: 12px;
  }
`;

const LikesBox = styled.div`
  position: relative;
  padding-right: 10px;
  color: #0a58be;

  &::after {
    content: "";
    position: absolute;
    top: auto;
    bottom: auto;
    right: 0;
    width: 1px;
    height: 16px;
    background-color: #222;
  }
`;
const DislikesBox = styled.div`
  padding-left: 10px;
  color: #fcd71e;
`;
