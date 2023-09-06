import React from 'react';
import { userAtom } from '../../../../store/userAtom';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../../firebaseConfig';
import * as s from './StyledNickname';
import Swal from 'sweetalert2';

const Nickname = ({ ownData, allData, fetchData }) => {
  const [user] = useAtom(userAtom);
  const [isEditorActived, setIsEditorActived] = useState(false);
  // 입력 받는 새로운 닉네임
  const [newNickname, setNewNickname] = useState(user?.displayName);

  // 닉네임 수정 버튼 클릭 핸들러
  const startEditNameHandler = () => {
    setIsEditorActived(true);
  };

  // 닉네임 중복 검사 및 수정 완료 핸들러
  const endEditNameHandler = async () => {
    try {
      const usedNickname = allData.filter(
        (item) => item.nickname === newNickname
      );
      if (newNickname === user.displayName) {
        setIsEditorActived(false);
        return Swal.fire({
          title: '변경사항 없이 저장합니다!',
          icon: 'success',
        });
      } else if (!!newNickname === false) {
        return Swal.fire({ title: '닉네임을 입력해 주세요', icon: 'warning' });
      } else if (usedNickname.length > 0) {
        return Swal.fire({
          title: '이미 사용 중인 닉네임입니다. 다른 닉네임을 사용해 주세요.',
          icon: 'warning',
        });
      } else if (usedNickname.length === 0) {
        setIsEditorActived(false);

        // 1. firebase auth 정보 업데이트
        updateProfile(auth.currentUser, {
          displayName: newNickname,
        });
        // 2. firestore users db 정보 업데이트
        const userRef = doc(db, 'users', `${ownData.id}`);
        await updateDoc(userRef, { nickname: newNickname });

        fetchData();

        return Swal.fire({ title: '닉네임 수정 완료!', icon: 'success' });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* SNS 이용자는 닉네임 못 바꾸게 함 */}
      {ownData === undefined ? (
        <s.NickNameContainer>
          <s.NickNameContainerInner>
            <s.DisabledInput type="text" value={user.displayName} disabled />
          </s.NickNameContainerInner>
          <p>SNS 로그인 사용 시 닉네임을 수정할 수 없습니다.</p>
        </s.NickNameContainer>
      ) : (
        <s.NickNameContainerInner>
          {/* 닉네임 인풋 */}
          {isEditorActived ? (
            <s.AbledInput
              maxLength={10}
              type="text"
              value={newNickname}
              onChange={(e) => {
                setNewNickname(e.target.value);
              }}
            />
          ) : (
            <s.DisabledInput type="text" value={user.displayName} disabled />
          )}
          {/* 닉네임 수정 버튼 */}
          {isEditorActived ? (
            <s.EditButton
              onClick={() => {
                endEditNameHandler();
              }}
            ></s.EditButton>
          ) : (
            <s.EditButton
              onClick={() => {
                startEditNameHandler();
              }}
            ></s.EditButton>
          )}
        </s.NickNameContainerInner>
      )}
    </>
  );
};

export default Nickname;
