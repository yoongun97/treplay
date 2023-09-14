import React from "react";
import * as s from "./StyledErrorPage";

const ErrorPage = () => {
  const url = sessionStorage.getItem("url");
  return (
    <s.ErrorContainer>
      <s.ImageBox></s.ImageBox>
      <p>죄송합니다. 현재 찾을 수 없는 페이지를 요청하셨습니다.</p>
      <p>
        페이지의 주소가 잘못 입력되었거나, <br /> 주소가 변경 혹은 삭제되어
        요청하신 페이지를 찾을 수 없습니다.
      </p>
      <s.ButtonContainer>
        <s.MainButton to={"/"}>
          <span>메인으로</span>
          <div></div>
        </s.MainButton>
        <s.PrevButton to={url}>
          <span>이전으로</span>
          <div></div>
        </s.PrevButton>
      </s.ButtonContainer>
    </s.ErrorContainer>
  );
};

export default ErrorPage;
