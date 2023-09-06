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
} from "firebase/firestore";
import * as s from "./StyledComments";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../../store/userAtom";


function Comments({ id }) {
  const queryClient = useQueryClient();

  const [user] = useAtom(userAtom);
  const navigate = useNavigate();

  const [comment, setComment] = useState("");


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
  const commentChange = (e) => {
    setComment(e.target.value);
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

  //댓글 등록
  const commentChange = (e) => {
    setComment(e.target.value);
  };

  const commentSubmit = async (e) => {
    e.preventDefault();

    if (comment.trim() === '') {
      return alert('댓글을 입력해주세요');
    }

    if (!user) {
      navigate("/suggest"); // 로그인 페이지 경로로 변경
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
      window.confirm('댓글을 삭제하시겠습니까?');
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
    if (e.target.value.trim().length === 0) {
      alert('한 글자 이상 입력해주세요');
    }
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
    <s.Container>
      <h4>댓글 작성</h4>
      <s.CommentInputForm onSubmit={commentSubmit}>
        <textarea
          type="text"
          placeholder="댓글을 입력해주세요"
          value={comment}
          onChange={commentChange}
        />
        <input type="submit" value="등록" />
      </s.CommentInputForm>
      <s.CommentsContainer>
        {post.comments?.map((comment) => (
          <s.CommentBox key={comment.id}>
            {editingCommentId === comment.id ? (
              <>
                <s.EditTextArea
                  value={editedComment}
                  onChange={updateEditedComment}
                />
                <s.FinishEditButtonContainer>
                  <button onClick={() => saveEditedComment(comment.id)}>
                    저장
                  </button>
                  <button onClick={cancelEditComment}>취소</button>
                </s.FinishEditButtonContainer>
              </>
            ) : (
              <>
                <img src={comment.photoURL}></img>
                <s.TextContainer>
                  <p>{comment.author}</p>
                  {/* 줄 바꿈 함수 추가 */}
                  <p>{lineChangeText(comment.comment)}</p>
                  {currentUser && comment.userId === currentUser.uid && (
                    <s.StartEditButtonContainer>
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
                    </s.StartEditButtonContainer>
                  )}
                </s.TextContainer>
              </>
            )}
          </s.CommentBox>
        ))}
      </s.CommentsContainer>
    </s.Container>
  );
}

export default Comments;
