import React from "react";
import { userAtom } from "../../../store/userAtom";
import { useAtom } from "jotai";
import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../firebaseConfig";

const Nickname = ({ ownData, allData, fetchData }) => {
  const [user] = useAtom(userAtom);
  const [isEditorActived, setIsEditorActived] = useState(false); // 입력 받는 새로운 닉네임
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
      if (!!newNickname === false) {
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
    <div>
      {/* SNS 이용자는 닉네임 못 바꾸게 함 */}
      {ownData === undefined ? (
        <div>
          <input type="text" value={user.displayName} disabled />
          <p>SNS 로그인 사용 시 닉네임을 수정할 수 없습니다.</p>
        </div>
      ) : (
        <div>
          {/* 닉네임 인풋 */}
          {isEditorActived ? (
            <input
              type="text"
              value={newNickname}
              onChange={(e) => {
                setNewNickname(e.target.value);
              }}
            />
          ) : (
            <input type="text" value={user.displayName} disabled />
          )}
          {/* 닉네임 수정 버튼 */}
          {isEditorActived ? (
            <button
              onClick={() => {
                endEditNameHandler();
              }}
            >
              완료
            </button>
          ) : (
            <button
              onClick={() => {
                startEditNameHandler();
              }}
            >
              수정
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Nickname;
