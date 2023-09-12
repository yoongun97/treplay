import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { useMutation } from "react-query";
import { db } from "../../../../firebaseConfig";
import * as s from "./StyledMyList";
import Swal from "sweetalert2";

function MyList({ myPosts, setMyPosts, allLikedData }) {
  // 게시물 삭제
  const deletePostHandler = async (post) => {
    const result = await Swal.fire({
      title: "정말 삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "예",
      cancelButtonText: "아니오",
    });

    if (result.isConfirmed) {
      deleteMutation.mutate(post);
      return Swal.fire({ title: "글이 삭제되었습니다!", icon: "success" });
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
    <s.ListContainer>
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
          <s.ListBoxContainer key={post.id}>
            <s.ListBox to={`/detail/${post.id}`}>
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
            <s.DeleteButton
              onClick={() => {
                deletePostHandler(post);
              }}
            ></s.DeleteButton>
          </s.ListBoxContainer>
        );
      })}
    </s.ListContainer>
  );
}

export default MyList;
