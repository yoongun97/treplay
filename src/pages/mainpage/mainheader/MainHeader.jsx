import { useAtom } from "jotai";
import React from "react";
import { userAtom } from "../../../store/userAtom";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import * as s from "./StyledMainHeader";
import Swal from "sweetalert2";

const MainHeader = () => {
  const [user] = useAtom(userAtom);
  const auth = getAuth();

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        Swal.fire({ title: "로그아웃 되었습니다", icon: "success" });
      })
      .catch(() => {
        Swal.fire({
          title: "로그아웃에 실패하였습니다. 다시 시도해 주세요",
          icon: "success",
        });
      });
  };

  return (
    <s.HeaderContainer>
      {!!user ? (
        <>
          <s.HomeLink to={"/"}></s.HomeLink>
          <s.LoginContainer>
            <Link to={`/mypage`}>내프로필</Link>
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
