import React from "react";
import * as s from "./StyledFindIDPW";

function FindIDPW() {
  return (
    <s.FindContainer>
      <s.FindTitle>아이디/비밀번호 찾기</s.FindTitle>
      <s.BtnBox>
        <s.IdBtn>아이디찾기</s.IdBtn>
        <s.PWBtn>비밀번호 찾기</s.PWBtn>
      </s.BtnBox>
      <s.InputBox>
        <s.InputTitle>연락처</s.InputTitle>
        <s.InputCheck>
          <s.InfoInput />
          <s.CheckBtn>본인인증</s.CheckBtn>
        </s.InputCheck>
      </s.InputBox>
      <s.InputBox>
        <s.InputTitle>인증번호</s.InputTitle>
        <s.InputCheck>
          <s.InfoInput />
          <s.CheckBtn>본인인증</s.CheckBtn>
        </s.InputCheck>
      </s.InputBox>
      <s.FindBtn>아이디 찾기</s.FindBtn>
    </s.FindContainer>
  );
}

export default FindIDPW;
