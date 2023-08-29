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

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user] = useAtom(userAtom);

  const {
    data: post,
    isLoading,
    isError,
    error,
  } = useQuery('post', async () => {
    const postRef = doc(db, 'posts', id);
    const docSnapshot = await getDoc(postRef);

    if (docSnapshot.exists()) {
      return { id: docSnapshot.id, ...docSnapshot.data() };
    } else {
      throw new Error('해당 ID의 데이터를 찾을 수 없습니다.');
    }
  });

  // url 복사
  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('링크가 복사되었습니다.');
    } catch (error) {
      console.error('링크 복사 중 오류 발생:', error);
      alert('링크 복사 중 오류가 발생했습니다.');
    }
  };

  // 게시물 삭제
  const deleteMutation = useMutation(async (post) => {
    const postRef = doc(db, 'posts', post.id);
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
    <>
      <div
        style={{
          maxWidth: '1200px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          margin: '0 auto 0 auto',
        }}
      >
        <h2>{post?.placeName}</h2>
        <button
          style={{ margin: ' 20px 5% 20px auto' }}
          onClick={copyUrl}
          value={post.id}
        >
          공유하기
        </button>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '0 auto 0 auto',
          }}
        >
          {user.uid === post?.uid ? (
            <div style={{ display: 'flex', marginLeft: 'auto' }}>
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
            </div>
          ) : (
            <></>
          )}
        </div>
        <ImageCarousel postImgs={post?.postImgs} />

        <div
          style={{
            maxWidth: '1200px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '30px auto 0 auto',
          }}
        >
          <p>{post?.postContent}</p>
          <PlaceMap postAddress={post?.placeLocation} />
        </div>
        <div>
          <Bookmark />
          <Likes />
        </div>
        {/* 댓글창 */}
        <Comments id={id} />
      </div>
    </>
  );
}

export default DetailPage;
