import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebaseConfig";

function MyList({ myPosts, setMyPosts, allLikedData }) {
  const navigate = useNavigate();

  // 게시물 삭제
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
    <div>
      {myPosts?.map((post) => {
        const likedCount = allLikedData?.filter(
          (data) => data.postId === post.id && data.state === "like"
        );
        const dislikedCount = allLikedData?.filter(
          (data) => data.postId === post.id && data.state === "dislike"
        );
        const postImg = post.postImgs;
        return (
          <div className="ListBox" key={post.id}>
            <div
              onClick={() => {
                navigate(`/detail/${post.id}`);
              }}
            >
              {postImg ? (
                <img src={post.postImgs} alt="이미지" width="100px" />
              ) : (
                <img src="" alt="이미지 없음" width="100px"></img>
              )}
              <div className="ContentInfo">
                <span>{post.placeName}</span>
                <span> {post.author}</span>
                <span> 또가요({likedCount.length})</span>
                <span> 안가요({dislikedCount.length})</span>
              </div>
            </div>
            <button
              onClick={() => {
                deleteMutation.mutate(post);
              }}
            >
              삭제
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default MyList;
