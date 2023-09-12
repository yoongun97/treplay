import React, { useState } from "react";
import * as m from "./StyledModal";

function EmailModal({
  email,
  inputs,
  setInputs,
  setIsModalOpen,
  isUsedEmail,
  emailCheckHandler,
}) {
  const [checkEmail, setCheckEmail] = useState(email);
  // 메시지 보여주는 여부
  const [showMsg, setShowMsg] = useState(true);

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
            e.preventDefault();
            await emailCheckHandler(checkEmail);
            setShowMsg(true);
          }}
        >
          중복확인
        </m.ModalCheckBtn>
      </m.ModalInputCheck>

      {showMsg && (
        <div>
          {isUsedEmail === true ? (
            <m.ModalErrorBox>
              <m.ModalErrorMark
                src="https://cdn-icons-png.flaticon.com/128/9503/9503179.png"
                alt="경고이미지"
              />
              <m.ModalErrorMsg style={{ color: "#e02918" }}>
                이미 사용중인 이메일 입니다.
              </m.ModalErrorMsg>
            </m.ModalErrorBox>
          ) : isUsedEmail === false ? (
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
                  setInputs({ ...inputs, email: checkEmail });
                  setIsModalOpen(false);
                }}
              >
                사용하기
              </m.SuccessBtn>
            </>
          ) : (
            <m.ModalErrorBox>
              <m.ModalErrorMark
                src="https://cdn-icons-png.flaticon.com/128/9503/9503179.png"
                alt="경고이미지"
              />
              <m.ModalErrorMsg style={{ color: "#e02918" }}>
                유효하지 않은 이메일입니다.
              </m.ModalErrorMsg>
            </m.ModalErrorBox>
          )}
        </div>
      )}

      {!showMsg && <div style={{ height: "70px" }}></div>}
    </m.CheckModal>
  );
}

export default EmailModal;
