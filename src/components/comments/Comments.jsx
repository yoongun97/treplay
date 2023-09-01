import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { auth, db } from '../../firebaseConfig';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
} from 'firebase/firestore';
import { styled } from 'styled-components';

function Comments({ id }) {
  const queryClient = useQueryClient();

  const [comment, setComment] = useState('');

  const [, setComments] = useState([]);
  const currentUser = auth.currentUser;

  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState('');

  const {
    data: post,
    isLoading,
    isError,
    error,
  } = useQuery('post', async () => {
    const postRef = doc(db, 'posts', id);
    const docSnapshot = await getDoc(postRef);
    //firebase 에서 댓글 불러오기
    if (docSnapshot.exists()) {
      const commentsRef = query(
        collection(db, 'comments'),
        where('postId', '==', id)
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

  // 댓글 내용에 줄바꿈 처리를 추가
  const lineChangeText = (text) => {
    return text.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };

  const commentSubmit = async (e) => {
    e.preventDefault();
    if (comment === '') {
      return;
    }

    try {
      const newComment = {
        comment: comment,
        postId: id,
        userId: currentUser.uid,
        author: currentUser.displayName,
        photoURL: currentUser.photoURL,
      };
      const docRef = await addDoc(collection(db, 'comments'), newComment);
      setComments([...post.comments, { id: docRef.id, ...newComment }]);
      setComment('');
      queryClient.invalidateQueries('post');
    } catch (error) {
      console.error('댓글 추가 에러: ', error);
    }
  };

  //댓글삭제
  const handleDeleteComment = async (commentId) => {
    try {
      await deleteDoc(doc(db, 'comments', commentId));
      setComments(post.comments.filter((comment) => comment.id !== commentId));
      queryClient.invalidateQueries('post');
    } catch (error) {
      console.error('댓글 삭제 에러: ', error);
    }
  };

  const startEditComment = (commentId, commentText) => {
    setEditingCommentId(commentId);
    setEditedComment(commentText);
  };

  const cancelEditComment = () => {
    setEditingCommentId(null);
    setEditedComment('');
  };

  const updateEditedComment = (e) => {
    setEditedComment(e.target.value);
  };

  const saveEditedComment = async (commentId) => {
    if (editedComment === '') {
      return;
    }

    try {
      await updateDoc(doc(db, 'comments', commentId), {
        comment: editedComment,
      });

      setEditingCommentId(null);
      setEditedComment('');
      queryClient.invalidateQueries('post');
    } catch (error) {
      console.error('댓글 수정 에러: ', error);
    }
  };

  return (
    <Container>
      <h4>댓글 작성</h4>
      <CommentInputForm onSubmit={commentSubmit}>
        <textarea
          type="text"
          placeholder="댓글을 입력해주세요"
          value={comment}
          onChange={commentChange}
        />
        <input type="submit" value="등록" />
      </CommentInputForm>
      <CommentsContainer>
        {post.comments?.map((comment) => (
          <CommentBox key={comment.id}>
            {editingCommentId === comment.id ? (
              <>
                <EditTextArea
                  value={editedComment}
                  onChange={updateEditedComment}
                />
                <FinishEditButtonContainer>
                  <button onClick={() => saveEditedComment(comment.id)}>
                    저장
                  </button>
                  <button onClick={cancelEditComment}>취소</button>
                </FinishEditButtonContainer>
              </>
            ) : (
              <>
                <img src={comment.photoURL}></img>
                <TextContainer>
                  <p>{comment.author}</p>
                  {/* 줄 바꿈 함수 추가 */}
                  <div>{lineChangeText(comment.comment)}</div>
                  {currentUser && comment.userId === currentUser.uid && (
                    <StartEditButtonContainer>
                      <button
                        onClick={() =>
                          startEditComment(comment.id, comment.comment)
                        }
                      >
                        수정
                      </button>
                      <button onClick={() => handleDeleteComment(comment.id)}>
                        삭제
                      </button>
                    </StartEditButtonContainer>
                  )}
                </TextContainer>
              </>
            )}
          </CommentBox>
        ))}
      </CommentsContainer>
    </Container>
  );
}

export default Comments;
const Container = styled.div`
  width: 100%;
  padding: 140px 320px;
  background-color: #f2f8ff;

  & > h4 {
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 30px;
  }
`;
const CommentInputForm = styled.form`
  width: 100%;
  height: 160px;
  position: relative;

  & > textarea {
    width: 100%;
    height: 160px;
    padding: 16px;
    border: 1px solid #e5e5e5;
    overflow: auto;
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    color: #222;
  }

  & > input {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 80px;
    height: 40px;
    border: none;
    background-color: #0a58be;
    font-size: 16px;
    font-weight: 400;
    color: #fff;
    cursor: pointer;
  }
`;
const CommentsContainer = styled.div`
  width: 100%;
  background-color: #f2f8ff;

  & > div:nth-child(2n) {
    background-color: #fff;
  }
`;
const CommentBox = styled.div`
  position: relative;
  display: flex;
  gap: 16px;
  padding: 30px 16px;
  color: #222;
  & > img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: transparent;
  }
`;
const TextContainer = styled.div`
  & > p:first-of-type {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 12px;
  }
  & > p:last-of-type {
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
  }
`;
const EditTextArea = styled.textarea`
  width: calc(100% - 135px);
  height: 100px;
  padding: 10px;
  border: 1px solid #e5e5e5;
  overflow: auto;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #222;
`;
const StartEditButtonContainer = styled.div`
  position: absolute;
  top: 30px;
  right: 16px;
  & > button {
    width: 56px;
    height: 28px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 400;
  }
  & > button:first-child {
    margin-right: 10px;
    border: 1px solid #e5e5e5;
    background-color: #fff;
    color: #bfbfbf;
  }
  & > button:last-child {
    border: 1px solid #222;
    background-color: #222;
    color: #fff;
  }
`;
const FinishEditButtonContainer = styled.div`
  position: absolute;
  top: 30px;
  right: 16px;
  & > button {
    width: 56px;
    height: 28px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 400;
  }
  & > button:first-child {
    margin-right: 10px;
    border: 1px solid #222;
    background-color: #222;
    color: #fff;
  }
  & > button:last-child {
    border: 1px solid #e5e5e5;
    background-color: #fff;
    color: #bfbfbf;
  }
`;
