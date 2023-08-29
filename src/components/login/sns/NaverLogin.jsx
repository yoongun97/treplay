import React from "react";
import { SnsBtn, SnsImg, SnsMent } from "../StyledLogin";

function NaverLogin() {
  return (
    <SnsBtn>
      <SnsImg
        src={`${process.env.PUBLIC_URL}/image/naver_icon.png`}
        alt="naver_icon"
      />
      <SnsMent>네이버 로그인</SnsMent>
    </SnsBtn>
  );
}

export default NaverLogin;
