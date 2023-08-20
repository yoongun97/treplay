import React, { useState } from 'react';
import PlaceMap from '../../components/PlaceMap';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

function DetailPage() {
  const { id } = useParams();
  const [comment, setComment] = useState('');
  const [commentArray, setCommentArray] = useState([]);

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

  if (isLoading) {
    return <div>데이터 가져오는 중...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }
  //댓글 등록
  const commentChange = (e) => setComment(e.target.value);

  const commentSubmit = (e) => {
    e.preventDefault();
    if (comment === '') {
      return;
    }
    setCommentArray((commentList) => [comment, ...commentList]);
    setComment('');
  };
  //댓글삭제
  const handleDelete = (id) => {
    setCommentArray((commentList) => {
      const newCommentList = [...commentList];
      newCommentList.splice(id, 1);
      return newCommentList;
    });
  };

  return (
    <>
      <div
        style={{
          maxWidth: '1200px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: '0 auto 0 auto',
        }}
      >
        <h2>{post?.placeName}</h2>
        <button style={{ margin: ' 20px 5% 20px auto' }}>공유하기</button>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '0 auto 0 auto',
          }}
        >
          <div style={{ display: 'flex', marginLeft: 'auto' }}>
            <button>수정</button>
            <button>삭제</button>
          </div>
          <img
            style={{
              width: '400px',
              height: '400px',
            }}
            src="https://cdn.pixabay.com/photo/2023/08/02/14/25/dog-8165447_640.jpg"
            alt="디테일 이미지"
          />
          <p>{post?.postContent}</p>
          <PlaceMap postAddress={post?.placeLocation} />
        </div>
        <div>
          <div style={{ display: 'flex' }}>
            <button>또가요</button>
            <button>안가요</button>
          </div>
          <div style={{ display: 'flex' }}>
            <div
              style={{ width: '50%', height: '20px', backgroundColor: 'Red' }}
            >
              50%
            </div>
            <div
              style={{ width: '50%', height: '20px', backgroundColor: 'Blue' }}
            >
              50%
            </div>
          </div>
        </div>
        {/* 댓글창 */}
        <span
          style={{ width: '800px', height: '300px', border: '1px solid black' }}
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
            {commentArray.map((value, id) => (
              <div key={id}>
                {value}
                <button onClick={() => handleDelete(id)}>삭제</button>
              </div>
            ))}
          </div>
        </span>
      </div>
    </>
  );
}

export default DetailPage;
