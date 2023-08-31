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
import TopButton from "../../common/TopButton";
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

  const date = post?.date.toDate();
  const dateOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const postDate = date.toLocaleString("ja-KR", dateOptions);
  const postTime = date.toLocaleString("en-KR", timeOptions);

  return (
    <DetailContainer>
      <DetailContainerInner>
        <h2>{post?.placeName}</h2>
        <InfoContainer>
          <DateContainer>
            <span>{postDate}</span>
            <span> | </span>
            <span>{postTime}</span>
          </DateContainer>
          <ButtonContainer>
            <ReactButtonContainer>
              <Bookmark />
              <button onClick={copyUrl} value={post.id}>
                <img
                  src={`${process.env.PUBLIC_URL}/icon/share_icon.svg`}
                  alt="bookmark_icon"
                ></img>
              </button>
            </ReactButtonContainer>
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
          </ButtonContainer>
        </InfoContainer>
        <ImageCarousel postImgs={post?.postImgs} />
        <ContentsContainer>
          <p>{post?.postContent}</p>
          <p># {post?.postOneLineContent}</p>
        </ContentsContainer>
        <PlaceMap postAddress={post?.placeLocation} />
        <Likes />
        {/* 댓글창 */}
      </DetailContainerInner>
      <Comments id={id} />
    </DetailContainer>
  );
}

export default DetailPage;

const DetailContainer = styled.div`
  position: relative;
`;

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
const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const DateContainer = styled.div`
  & > span {
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    color: #777;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const ReactButtonContainer = styled.div`
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

const EditButtonContainer = styled.div`
  & > button {
    width: 56px;
    height: 28px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 300;
  }

  & > button:first-child {
    margin: 10px;
    background-color: #fff;
    color: #e5e5e5;
    border: 1px solid #e5e5e5;
  }

  & > button:last-child {
    color: #fff;
    background-color: #222;
  }
`;

const ContentsContainer = styled.div`
  position: relative;
  padding-bottom: 40px;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  word-break: keep-all;

  & > p:nth-child(2) {
    margin-top: 20px;
    font-size: 14px;
    color: #777;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: #e5e5e5;
  }
`;
