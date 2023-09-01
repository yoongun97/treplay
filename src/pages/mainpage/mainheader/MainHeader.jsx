import { useAtom } from "jotai";
import React from "react";
import { userAtom } from "../../../store/userAtom";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import * as s from "./StyledMainHeader";

const MainHeader = () => {
  const [user] = useAtom(userAtom);
  const auth = getAuth();

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        alert("로그아웃 되었습니다");
      })
      .catch(() => {
        alert("로그아웃에 실패하였습니다. 다시 시도해 주세요");
      });
  };

  return (
    // params에 국가가 있으면 관광명소/맛집/숙박 보이게 함...
    <s.HeaderContainer>
      {!!user ? (
        <>
          <s.HomeLink to={"/"}></s.HomeLink>
          <s.LoginContainer>
            <Link to={`/mypage/${user?.uid}`}>내프로필</Link>
            <span onClick={logoutHandler}>로그아웃</span>
          </s.LoginContainer>
        </>
      ) : (
        <>
          <s.HomeLink to={"/"}></s.HomeLink>
          <s.LoginContainer>
            <Link to={`/login`}>로그인</Link>
            <Link to={"/signup"}>회원가입</Link>
          </s.LoginContainer>
        </>
      )}
    </s.HeaderContainer>
  );
};

export default MainHeader;
