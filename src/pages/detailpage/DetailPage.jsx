import React, { useEffect, useState } from "react";
import PlaceMap from "../../components/place/PlaceMap";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db, auth } from "../../firebaseConfig";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import Likes from "../../components/likes/Likes";
import Bookmark from "../../components/bookmark/Bookmark";

function DetailPage() {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [, setComments] = useState([]);
  const currentUser = auth.currentUser;
  const {
    data: post,
    isLoading,
    isError,
    error,
  } = useQuery("post", async () => {
    const postRef = doc(db, "posts", id);
    const docSnapshot = await getDoc(postRef);
    //firebase 에서 댓글 불러오기
    if (docSnapshot.exists()) {
      const commentsRef = query(
        collection(db, "comments"),
        where("postId", "==", id)
      );
      const commentsSnapshot = await getDocs(commentsRef);
      const commentsData = [];
      commentsSnapshot.forEach((doc) => {
        commentsData.push({ id: doc.id, ...doc.data() });
      });

      return {
        id: docSnapshot.id,
        ...docSnapshot.data(),
        comments: commentsData,
        //firebase 에서 댓글 불러오기
      };
    } else {
      throw new Error("해당 ID의 데이터를 찾을 수 없습니다.");
    }
  });
  //댓글 작성,삭제 실시간으로 보여주기
  // useEffect(() => {
  //   const commentsRef = query(
  //     collection(db, 'comments'),
  //     where('postId', '==', id)
  //   );
  //   const commentsUpdate = onSnapshot(commentsRef, (snapshot) => {
  //     const commentsData = [];
  //     snapshot.forEach((doc) => {
  //       commentsData.push({ id: doc.id, ...doc.data() });
  //     });
  //     setComments(commentsData);
  //   });

  //   return () => commentsUpdate();
  // }, [id]);

  if (isLoading) {
    return <div>데이터 가져오는 중...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  //댓글 등록
  const commentChange = (e) => setComment(e.target.value);

  const commentSubmit = async (e) => {
    e.preventDefault();
    if (comment === "") {
      return;
    }

    try {
      const newComment = {
        comment: comment,
        postId: id,
        userId: currentUser.uid,
        author: currentUser.displayName,
      };
      const docRef = await addDoc(collection(db, "comments"), newComment);
      setComments([...post.comments, { id: docRef.id, ...newComment }]);
      setComment("");
      queryClient.invalidateQueries("post");
    } catch (error) {
      console.error("댓글 추가 에러: ", error);
    }
  };

  //댓글삭제
  const handleDeleteComment = async (commentId) => {
    try {
      await deleteDoc(doc(db, "comments", commentId));
      setComments(post.comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error("댓글 삭제 에러: ", error);
    }
  };

  return (
    <>
      <div
        style={{
          maxWidth: "1200px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "0 auto 0 auto",
        }}
      >
        <h2>{post?.placeName}</h2>
        <button style={{ margin: " 20px 5% 20px auto" }}>공유하기</button>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "0 auto 0 auto",
          }}
        >
          <div style={{ display: "flex", marginLeft: "auto" }}>
            <button>수정</button>
            <button>삭제</button>
          </div>
          <img
            style={{
              width: "400px",
              height: "400px",
            }}
            src="https://cdn.pixabay.com/photo/2023/08/02/14/25/dog-8165447_640.jpg"
            alt="디테일 이미지"
          />
          <p>{post?.postContent}</p>
          <PlaceMap postAddress={post?.placeLocation} />
        </div>
        <div>
          <Bookmark />
          <Likes />
        </div>
        {/* 댓글창 */}
        <span
          style={{ width: "800px", height: "300px", border: "1px solid black" }}
        >
          <form onSubmit={commentSubmit}>
            <input
              type="text"
              placeholder="댓글을 입력해주세요"
              value={comment}
              onChange={commentChange}
            />
            <input type="submit" value="등록" />
          </form>
          <div>
            {post?.comments?.map((comment) => (
              <div key={comment.id}>
                <div>
                  {comment.author}
                  <div>{comment.comment}</div>
                </div>
                {currentUser && comment.userId === currentUser.uid && (
                  <button onClick={() => handleDeleteComment(comment.id)}>
                    삭제
                  </button>
                )}
              </div>
            ))}
          </div>
        </span>
      </div>
    </>
  );
}

export default DetailPage;
