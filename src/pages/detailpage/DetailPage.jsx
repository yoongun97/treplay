import React, { useState } from 'react';
import PlaceMap from '../../components/place/PlaceMap';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import Likes from '../../components/likes/Likes';
import Bookmark from '../../components/bookmark/Bookmark';
import Comments from '../../components/comments/Comments';
import { useAtom } from 'jotai';
import { userAtom } from '../../store/userAtom';
import ImageCarousel from '../../components/imageslide/ImageCarousel';
import * as s from "./StyledDetailPage";


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
    navigate(-1);
  });

  if (isLoading) {
    return <div>데이터 가져오는 중...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  const date = post?.date.toDate();
  const dateOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  const postDate = date.toLocaleString('ja-KR', dateOptions);
  const postTime = date.toLocaleString('en-KR', timeOptions);

  // 댓글 내용에 줄바꿈 처리를 추가
  const lineChangeText = (text) => {
    return text.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };
  return (
    <s.DetailContainer>
      <s.DetailContainerInner>
        <h2>{post?.placeName}</h2>
        <s.InfoContainer>
          <s.DateContainer>
            <span>{postDate}</span>
            <span> | </span>
            <span>{postTime}</span>
          </s.DateContainer>
          <s.ButtonContainer>
            <s.ReactButtonContainer>
              <Bookmark />
              <button onClick={copyUrl} value={post.id}>
                <img
                  src={`${process.env.PUBLIC_URL}/icon/share_icon.svg`}
                  alt="bookmark_icon"
                ></img>
              </button>
            </s.ReactButtonContainer>
            {user.uid === post?.uid ? (
              <s.EditButtonContainer>
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
              </s.EditButtonContainer>
            ) : (
              <></>
            )}
          </s.ButtonContainer>
        </s.InfoContainer>
        <ImageCarousel postImgs={post?.postImgs} />

        <ContentsContainer>
          {/* 줄 바꿈 함수 추가 */}
          <p>{lineChangeText(post?.postContent)}</p>

          <p># {post?.postOneLineContent}</p>
        </s.ContentsContainer>
        <PlaceMap postAddress={post?.placeLocation} />
        <Likes />
        {/* 댓글창 */}

      </DetailContainerInner>
      <Comments id={id} />
    </DetailContainer>

  );
}

export default DetailPage;
