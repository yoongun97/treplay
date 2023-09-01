import { useAtom } from "jotai";
import React from "react";
import { userAtom } from "../../store/userAtom";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { styled } from "styled-components";

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
    <HeaderContainer>
      {!!user ? (
        <>
          <HomeLink to={"/"}></HomeLink>
          <LoginContainer>
            <Link to={`/mypage/${user?.uid}`}>내프로필</Link>
            <span onClick={logoutHandler}>로그아웃</span>
          </LoginContainer>
        </>
      ) : (
        <>
          <HomeLink to={"/"}></HomeLink>
          <LoginContainer>
            <Link to={`/login`}>로그인</Link>
            <Link to={"/signup"}>회원가입</Link>
          </LoginContainer>
        </>
      )}
    </HeaderContainer>
  );
};

export default MainHeader;

const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 90px;
  padding: 0px 320px;
  z-index: 100;
`;

const HomeLink = styled(Link)`
  display: block;
  width: 142px;
  height: 46px;
  background: url(${process.env.PUBLIC_URL}/image/logo_white.png) no-repeat
    center / contain;
`;

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 100px;
  font-size: 14px;
  font-weight: 300;
  color: #fff;

  & > a {
    color: #fff;
  }

  & > a:first-child {
    position: relative;
    padding-right: 16px;
  }

  & > a:first-child::after {
    content: "";
    position: absolute;
    right: 0;
    top: 50%;
    width: 1px;
    height: 12px;
    background-color: #fff;
    transform: translateY(-50%);
  }
  & > a:last-child,
  & > span {
    padding-left: 16px;
    cursor: pointer;
  }
`;
