import React, { useEffect, useState } from "react";
import * as m from "./StyledModal";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebaseConfig";

function NicknameModal({
  nickname,
  setNickname,
  setIsModalOpen,
  // 밖에서체크한함수,
}) {
  const [checkNickname, setCheckNickname] = useState(nickname);
  const [isUsedNickname, setIsUsedNickname] = useState(false);
  const [showMsg, setShowMsg] = useState(true);

  useEffect(() => {
    nicknameCheckHandler();
    setShowMsg(true); // Reset showMsg when the modal opens
  }, []);

  // const 하나더 = () => {
  //   밖에서체크한함수
  //   if (usedNickname.length > 0) {
  //     setIsUsedNickname(true);
  //   } else if (usedNickname.length === 0) {
  //     setIsUsedNickname(false);
  //   }
  // }
  const nicknameCheckHandler = async () => {
    // e.preventDefault();
    try {
      const q = query(collection(db, "users"));
      // 여기서 시간 걸림
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      const usedNickname = data.filter(
        (item) => item.nickname === checkNickname
      );

      if (usedNickname.length > 0) {
        setIsUsedNickname(true);
      } else if (usedNickname.length === 0) {
        setIsUsedNickname(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <m.CheckModal>
      <m.CloseBtn
        onClick={() => {
          setIsModalOpen(false);
        }}
      >
        <m.CloseImg
          src="https://cdn-icons-png.flaticon.com/128/2089/2089733.png"
          alt="닫기버튼"
        />
      </m.CloseBtn>
      <m.ModalTitle>중복 확인</m.ModalTitle>
      <m.ModalInputCheck>
        <m.ModalInput
          value={checkNickname}
          onChange={(e) => {
            setShowMsg(false);
            setCheckNickname(e.target.value);
          }}
          placeholder="닉네임을 입력해주세요"
        ></m.ModalInput>
        <m.ModalCheckBtn
          disabled={!checkNickname}
          onClick={async (e) => {
            await nicknameCheckHandler(e);
            setShowMsg(true);
          }}
        >
          중복확인
        </m.ModalCheckBtn>
      </m.ModalInputCheck>

      {showMsg ? (
        isUsedNickname === true ? (
          <m.ModalErrorBox>
            <m.ModalErrorMark
              src="https://cdn-icons-png.flaticon.com/128/9503/9503179.png"
              alt="경고이미지"
            />
            <m.ModalErrorMsg style={{ color: "#e02918" }}>
              이미 사용중인 닉네임 입니다.
            </m.ModalErrorMsg>
          </m.ModalErrorBox>
        ) : (
          <>
            <m.ModalErrorBox>
              <m.ModalErrorMark
                src="https://cdn-icons-png.flaticon.com/128/992/992481.png"
                alt="가능이미지"
              />
              <m.ModalErrorMsg>사용 가능한 닉네임 입니다.</m.ModalErrorMsg>
            </m.ModalErrorBox>
            <m.SuccessBtn
              onClick={() => {
                setNickname(checkNickname);
                setIsModalOpen(false);
              }}
            >
              사용하기
            </m.SuccessBtn>
          </>
        )
      ) : (
        <div style={{ height: "70px" }}></div>
      )}
    </m.CheckModal>
  );
}

export default NicknameModal;
