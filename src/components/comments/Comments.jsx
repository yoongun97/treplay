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
  Timestamp,
} from 'firebase/firestore';
import * as s from './StyledComments';
import { useAtom } from 'jotai';
import { userAtom } from '../../store/userAtom';
import Swal from 'sweetalert2';

const profileImage = `${process.env.PUBLIC_URL}/image/baseprofile.jpeg`;

function Comments({ id }) {
  const queryClient = useQueryClient();

  const [user] = useAtom(userAtom);

  const [comment, setComment] = useState('');

  const [, setComments] = useState([]);
  const currentUser = auth.currentUser;
  console.log({ currentUser });

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
  const commentSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim() === '') {
      return Swal.fire({ title: '댓글을 입력해주세요', icon: 'warning' });
    }

    try {
      const newComment = {
        comment: comment,
        postId: id,
        userId: currentUser.uid,
        author: currentUser.displayName,
        photoURL: currentUser.photoURL || null,
        createdAt: Timestamp.now(),
      };

      const docRef = await addDoc(collection(db, 'comments'), newComment);
      setComments([...post.comments, { id: docRef.id, ...newComment }]);
      setComment('');
      queryClient.invalidateQueries('post');
      console.log({ newComment });
    } catch (error) {
      Swal.fire({ title: '댓글이 추가되지 않았습니다', icon: 'warning' });
    }
  };

  //댓글삭제
  const handleDeleteComment = async (commentId) => {
    const result = await Swal.fire({
      title: '댓글을 삭제하시겠습니까?',
      showCancelButton: true, // 취소 버튼 표시
      confirmButtonText: '삭제', // 확인 버튼 텍스트
      showCloseButton: true, // 닫기 버튼 표시
    });

    if (result.isConfirmed) {
      try {
        await deleteDoc(doc(db, 'comments', commentId));
        setComments(
          post.comments.filter((comment) => comment.id !== commentId)
        );
        queryClient.invalidateQueries('post');
      } catch (error) {
        Swal.fire({ title: '댓글이 삭제되지 않았습니다', icon: 'warning' });
      }
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
      Swal.fire({ title: '한 글자 이상 입력해주세요', icon: 'warning' });
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
        {post.comments
          ?.filter((comment) => comment.createdAt)
          ?.sort((a, b) => {
            return b.createdAt.toMillis() - a.createdAt.toMillis();
          })
          .map((comment) => (
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
                  {comment.photoURL ? (
                    <img src={comment.photoURL} alt="프로필 이미지" />
                  ) : (
                    <img src={profileImage} alt="기본 이미지" />
                  )}
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
