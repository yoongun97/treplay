import React, { useState } from "react";
import PlaceMap from "../../components/place/PlaceMap";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import Likes from "../../components/likes/Likes";
import Bookmark from "../../components/bookmark/Bookmark";
import Comments from "../../components/comments/Comments";
import { useAtom } from "jotai";
import { userAtom } from "../../store/userAtom";
import ImageCarousel from "../../components/imageslide/ImageCarousel";
import { styled } from "styled-components";

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user] = useAtom(userAtom);

  const {
    data: post,
    isLoading,
    isError,
    error,
  } = useQuery("post", async () => {
    const postRef = doc(db, "posts", id);
    const docSnapshot = await getDoc(postRef);

    if (docSnapshot.exists()) {
      return { id: docSnapshot.id, ...docSnapshot.data() };
    } else {
      throw new Error("해당 ID의 데이터를 찾을 수 없습니다.");
    }
  });

  // url 복사
  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("링크가 복사되었습니다.");
    } catch (error) {
      console.error("링크 복사 중 오류 발생:", error);
      alert("링크 복사 중 오류가 발생했습니다.");
    }
  };

  // 게시물 삭제
  const deleteMutation = useMutation(async (post) => {
    const postRef = doc(db, "posts", post.id);
    await deleteDoc(postRef);
    navigate(`/${post?.nation}/${post?.category}`);
  });

  if (isLoading) {
    return <div>데이터 가져오는 중...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <DetailContainer>
      <DetailContainerInner>
        <h2>{post?.placeName}</h2>
        <ButtonContainer>
          <Bookmark />
          <button onClick={copyUrl} value={post.id}>
            <img
              src={`${process.env.PUBLIC_URL}/icon/share_icon.svg`}
              alt="bookmark_icon"
            ></img>
          </button>
        </ButtonContainer>
        {user.uid === post?.uid ? (
          <EditButtonContainer>
            <button
              onClick={() => {
                navigate(`/edit/${id}`);
              }}
            >
              수정
            </button>
            <button
              onClick={() => {
                deleteMutation.mutate(post);
              }}
            >
              삭제
            </button>
          </EditButtonContainer>
        ) : (
          <></>
        )}
        <ImageCarousel postImgs={post?.postImgs} />
        <div>
          <p>{post?.postContent}</p>
          <p>{post?.postOneLineContent}</p>
          <PlaceMap postAddress={post?.placeLocation} />
        </div>
        <div>
          <Likes />
        </div>
        {/* 댓글창 */}
        <Comments id={id} />
      </DetailContainerInner>
    </DetailContainer>
  );
}

export default DetailPage;

const DetailContainer = styled.div``;

const DetailContainerInner = styled.div`
  width: 1280px;
  margin: 0 auto;

  & > h2 {
    margin: 140px 0 60px;
    color: #222;
    text-align: center;
    font-size: 28px;
    font-weight: 600;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  & > button {
    width: 24px;
    height: 24px;
    background-color: transparent;
    border: none;
  }
`;

const EditButtonContainer = styled.div``;
