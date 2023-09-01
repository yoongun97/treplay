
import React, { useState } from "react";
import * as s from "./StyledFindIDPW";

function FindIDPW() {
  const [isFindID, setIsFindID] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <s.FindContainer>
      <s.FindTitle>아이디/비밀번호 찾기</s.FindTitle>
      <s.BtnBox>
        <s.IdBtn
          isID={isFindID}
          onClick={() => {
            setIsFindID(true);
            setIsChecked(false);
          }}
        >
          아이디찾기
        </s.IdBtn>
        <s.PWBtn
          isID={isFindID}
          onClick={() => {
            setIsFindID(false);
            setIsChecked(false);
          }}
        >
          비밀번호 찾기
        </s.PWBtn>
      </s.BtnBox>
      {!isChecked ? (
        isFindID ? (
          <>
            <s.InputBox>
              <s.InputTitle>연락처</s.InputTitle>
              <s.InputCheck>
                <s.InfoInput placeholder="'-'없이 숫자만 입력해 주세요" />
                <s.CheckBtn>본인인증</s.CheckBtn>
              </s.InputCheck>
            </s.InputBox>
            <s.InputBox>
              <s.InputTitle>인증번호</s.InputTitle>
              <s.InputCheck>
                <s.InfoInput placeholder="인증번호를 입력해주세요." />
                <s.CheckBtn>확인</s.CheckBtn>
              </s.InputCheck>
            </s.InputBox>
          </>
        ) : (
          <>
            <s.InputBox>
              <s.InputTitle>이름</s.InputTitle>
              <s.InputCheck>
                <s.InfoInput placeholder="이름을 입력해주세요" />
              </s.InputCheck>
            </s.InputBox>
            <s.InputBox>
              <s.InputTitle>아이디</s.InputTitle>
              <s.InputCheck>
                <s.InfoInput placeholder="아이디를 입력해주세요" />
              </s.InputCheck>
            </s.InputBox>
            <s.InputBox>
              <s.InputTitle>연락처</s.InputTitle>
              <s.InputCheck>
                <s.InfoInput placeholder="'-'없이 숫자만 입력해 주세요" />
                <s.CheckBtn>본인인증</s.CheckBtn>
              </s.InputCheck>
            </s.InputBox>
            <s.InputBox>
              <s.InputTitle>인증번호</s.InputTitle>
              <s.InputCheck>
                <s.InfoInput placeholder="인증번호를 입력해주세요." />
                <s.CheckBtn>확인</s.CheckBtn>
              </s.InputCheck>
            </s.InputBox>
          </>
        )
      ) : isFindID ? (
        <>
          <s.FindedTitle>
            <s.FindedName>김철수</s.FindedName>
            <s.FindedMent>님의 정보와 일치하는 아이디입니다.</s.FindedMent>
          </s.FindedTitle>
          <s.FindedID>Treplay99</s.FindedID>
        </>
      ) : (
        <>
          <s.InputBox>
            <s.InputTitle>새 비밀번호</s.InputTitle>
            <s.InputCheck>
              <s.InfoInput
                style={{ width: "95%" }}
                type="password"
                placeholder="6자리 이상 입력해주세요."
              />
            </s.InputCheck>
          </s.InputBox>
          <s.InputBox style={{ marginTop: "14px", marginBottom: "60px" }}>
            <s.InputTitle>새 비밀번호 확인</s.InputTitle>
            <s.InputCheck>
              <s.InfoInput
                style={{ width: "95%" }}
                type="password"
                placeholder="비밀번호를 위와 동일하게 입력해주세요."
              />
            </s.InputCheck>
          </s.InputBox>
          <s.ErrorBox>
            <s.ErrorMark
              src="https://cdn-icons-png.flaticon.com/128/9503/9503179.png"
              alt="경고이미지"
            />
            <s.ErrorMsg>비밀번호가 일치 하지 않습니다.</s.ErrorMsg>
          </s.ErrorBox>
        </>
      )}
      {!isChecked ? (
        isFindID ? (
          <s.FindBtn
            onClick={() => {
              setIsChecked(true);
            }}
          >
            아이디 찾기
          </s.FindBtn>
        ) : (
          <s.FindBtn
            onClick={() => {
              setIsChecked(true);
            }}
          >
            비밀번호 찾기
          </s.FindBtn>
        )
      ) : isFindID ? (
        <s.FindedBtnBox>
          <s.FindedBtn>로그인하러 가기</s.FindedBtn>
          <s.FindedBtn
            style={{
              backgroundColor: " white",
              color: "#0a58be",
              border: "1px solid #0a58be",
              marginLeft: "20px",
            }}
          >
            비밀번호 재설정
          </s.FindedBtn>
        </s.FindedBtnBox>
      ) : (
        <s.FindedBtnBox>
          <s.FindedBtn
            style={{
              backgroundColor: " white",
              color: "#0a58be",
              border: "1px solid #0a58be",
              marginRight: "20px",
            }}
          >
            취소
          </s.FindedBtn>
          <s.FindedBtn>변경</s.FindedBtn>
        </s.FindedBtnBox>
      )}
    </s.FindContainer>
  );
}

export default FindIDPW;
