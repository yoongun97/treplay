import React, { useEffect, useState } from "react";
import * as m from "./StyledModal";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { auth } from "../../firebaseConfig";

function EmailModal({
  email,
  setEmail,
  setIsModalOpen,
  // 밖에서체크한함수,
}) {
  const [checkEmail, setCheckEmail] = useState(email);
  const [isUsedEmail, setIsUsedEmail] = useState(false);
  const [showMsg, setShowMsg] = useState(true);

  useEffect(() => {
    emailCheckHandler();

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

  const emailCheckHandler = async () => {
    // 이미 존재하는 이메일 !== 에러가 난 것
    try {
      const usedEmail = await fetchSignInMethodsForEmail(auth, checkEmail);
      console.log({ usedEmail });
      setIsUsedEmail(usedEmail.length > 0);
    } catch (error) {
      // 중복된 이메일이 있는 경우
      setIsUsedEmail(true);
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
          value={checkEmail}
          onChange={(e) => {
            setShowMsg(false);
            setCheckEmail(e.target.value);
          }}
          placeholder="이메일을 입력해주세요"
        ></m.ModalInput>
        <m.ModalCheckBtn
          disabled={!checkEmail}
          onClick={async (e) => {
            await emailCheckHandler(e);
            setShowMsg(true);
          }}
        >
          중복확인
        </m.ModalCheckBtn>
      </m.ModalInputCheck>

      {showMsg ? (
        isUsedEmail === true ? (
          <m.ModalErrorBox>
            <m.ModalErrorMark
              src="https://cdn-icons-png.flaticon.com/128/9503/9503179.png"
              alt="경고이미지"
            />
            <m.ModalErrorMsg style={{ color: "#e02918" }}>
              이미 사용중인 이메일 입니다.
            </m.ModalErrorMsg>
          </m.ModalErrorBox>
        ) : (
          <>
            <m.ModalErrorBox>
              <m.ModalErrorMark
                src="https://cdn-icons-png.flaticon.com/128/992/992481.png"
                alt="가능이미지"
              />
              <m.ModalErrorMsg>사용 가능한 이메일 입니다.</m.ModalErrorMsg>
            </m.ModalErrorBox>
            <m.SuccessBtn
              onClick={() => {
                setEmail(checkEmail);
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

export default EmailModal;
