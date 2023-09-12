import React, { useState } from "react";
import * as m from "./StyledModal";

function NicknameModal({
  nickname,
  inputs,
  setInputs,
  setIsModalOpen,
  isUsedNickname,
  nicknameCheckHandler,
}) {
  const [checkNickname, setCheckNickname] = useState(nickname);
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
            e.preventDefault();
            await nicknameCheckHandler(checkNickname);
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
                setInputs({ ...inputs, nickname: checkNickname });
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
