import React, { useEffect } from 'react';
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
import DetailCarousel from '../../components/imageslide/detailpageSlide/DetailCarousel';
import * as s from './StyledDetailPage';
import Swal from 'sweetalert2';
import SkeletonDetail from '../../components/skeletonUI/skeletonDetail/SkeletonDetail';

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user] = useAtom(userAtom);

  const {
    data: post,
    isLoading,
    isError,
    error,
  } = useQuery(['post', id], async () => {
    const postRef = doc(db, 'posts', id);
    const docSnapshot = await getDoc(postRef);
    if (docSnapshot.exists()) {
      return { id: docSnapshot.id, ...docSnapshot.data() };
    } else {
      throw new Error('해당 ID의 데이터를 찾을 수 없습니다.');
    }
  });

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      Swal.fire({ title: '링크가 복사되었습니다.', icon: 'success' });
    } catch (error) {
      console.error('링크 복사 중 오류 발생:', error);
      Swal.fire({
        title: '링크 복사 중 오류가 발생했습니다.',
        icon: 'warning',
      });
    }
  };

  const deleteMutation = useMutation(async (post) => {
    const result = await Swal.fire({
      title: '정말 삭제하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '예',
      cancelButtonText: '아니오',
    });

    if (result.isConfirmed) {
      const postRef = doc(db, 'posts', post.id);
      await deleteDoc(postRef);
      navigate(-1);
      return Swal.fire({ title: '글이 삭제되었습니다!', icon: 'success' });
    } else {
      return;
    }
  });

  useEffect(() => {
    return () => {
      window.scrollTo(0, 0);
    };
  }, []);

  if (isLoading) {
    return <SkeletonDetail />;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  const DateTime = (date) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };

    return date.toLocaleString(['ja-KR', 'en-KR'], options);
  };

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
            <span>{DateTime(post?.date.toDate())}</span>
          </s.DateContainer>
          <s.ButtonContainer>
            <s.ReactButtonContainer>
              <Bookmark />
              <button onClick={copyUrl} value={post.id}>
                <img
                  src={`${process.env.PUBLIC_URL}/icon/share_icon.svg`}
                  alt="share_icon"
                ></img>
              </button>
            </s.ReactButtonContainer>
            {user && user.uid === post?.uid && (
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
            )}
          </s.ButtonContainer>
        </s.InfoContainer>
        <DetailCarousel postImgs={post?.postImgs} />

        <s.ContentsContainer>
          <p>{lineChangeText(post?.postContent)}</p>

          <p># {post?.postOneLineContent}</p>
        </s.ContentsContainer>
        <PlaceMap
          postAddress={post?.placeLocation}
          postPlace={post?.placeName}
        />
        <Likes />
      </s.DetailContainerInner>
      <Comments id={id} />
    </s.DetailContainer>
  );
}

export default DetailPage;
