import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import { db } from "../../../firebaseConfig";
import { styled } from "styled-components";

function MyList({ myPosts, setMyPosts, allLikedData }) {
  // 게시물 삭제
  const deletePostHandler = (post) => {
    if (window.confirm("정말 삭제하시겠습니까?") === true) {
      deleteMutation.mutate(post);
      return alert("글이 삭제되었습니다!");
    } else {
      return;
    }
  };
  const deleteMutation = useMutation(
    async (post) => {
      const postRef = doc(db, "posts", post.id);
      await deleteDoc(postRef);
    },
    {
      onMutate: (post) => {
        // 삭제 전 게시물을 myPosts에서 제거하여 새로운 배열 생성
        const updatedPosts = myPosts.filter((p) => p.id !== post.id);
        setMyPosts(updatedPosts);
      },
    }
  );

  return (
    <ListContainer>
      {myPosts?.map((post) => {
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
          <ListBoxContainer>
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
            <DeleteButton
              onClick={() => {
                deletePostHandler(post);
              }}
            ></DeleteButton>
          </ListBoxContainer>
        );
      })}
    </ListContainer>
  );
}

export default MyList;

const ListBoxContainer = styled.div`
  position: relative;
`;

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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & > p {
    padding-bottom: 8px;
    font-size: 14px;
    font-weight: 300;
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

const DeleteButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 25px;
  height: 25px;
  margin: 10px;
  border: none;
  outline: none;
  background-color: none;
  background: url(${process.env.PUBLIC_URL}/icon/delete_icon.svg) no-repeat
    center / 100%;
`;
