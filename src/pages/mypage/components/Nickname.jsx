import React from "react";
import { userAtom } from "../../../store/userAtom";
import { useAtom } from "jotai";
import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../firebaseConfig";
import { styled } from "styled-components";

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
        return alert("변경사항 없이 저장합니다!");
      } else if (!!newNickname === false) {
        return alert("닉네임을 입력해 주세요");
      } else if (usedNickname.length > 0) {
        return alert(
          "이미 사용 중인 닉네임입니다. 다른 닉네임을 사용해 주세요."
        );
      } else if (usedNickname.length === 0) {
        setIsEditorActived(false);

        // 1. firebase auth 정보 업데이트
        updateProfile(auth.currentUser, {
          displayName: newNickname,
        });
        // 2. firestore users db 정보 업데이트
        const userRef = doc(db, "users", `${ownData.id}`);
        await updateDoc(userRef, { nickname: newNickname });

        fetchData();

        return alert("닉네임 수정 완료!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* SNS 이용자는 닉네임 못 바꾸게 함 */}
      {ownData === undefined ? (
        <NickNameContainer>
          <NickNameContainerInner>
            <DisabledInput type="text" value={user.displayName} disabled />
          </NickNameContainerInner>
          <p>SNS 로그인 사용 시 닉네임을 수정할 수 없습니다.</p>
        </NickNameContainer>
      ) : (
        <NickNameContainerInner>
          {/* 닉네임 인풋 */}
          {isEditorActived ? (
            <AbledInput
              maxLength={10}
              type="text"
              value={newNickname}
              onChange={(e) => {
                setNewNickname(e.target.value);
              }}
            />
          ) : (
            <DisabledInput type="text" value={user.displayName} disabled />
          )}
          {/* 닉네임 수정 버튼 */}
          {isEditorActived ? (
            <EditButton
              onClick={() => {
                endEditNameHandler();
              }}
            ></EditButton>
          ) : (
            <EditButton
              onClick={() => {
                startEditNameHandler();
              }}
            ></EditButton>
          )}
        </NickNameContainerInner>
      )}
    </>
  );
};

export default Nickname;
const NickNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > p {
    margin-top: 16px;
    color: #777;
    font-size: 14px;
    font-weight: 300;
  }
`;
const NickNameContainerInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 40px;
  border-radius: 60px;
  border: 1px solid #0a58be;
  background-color: #fff;
  & > input {
    width: 120px;
    height: 22px;
    border: none;
    outline: none;
    background-color: #fff;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
  }
`;
const AbledInput = styled.input`
  color: #999;
`;
const DisabledInput = styled.input`
  color: #0a58be;
  text-align: center;
`;

const EditButton = styled.button`
  width: 20px;
  height: 20px;
  margin-left: 10px;
  border: none;
  background: url(${process.env.PUBLIC_URL}/icon/write_icon_blue.svg) no-repeat
    center / 100%;
`;
