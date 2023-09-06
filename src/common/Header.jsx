import { useAtom } from "jotai";
import React from "react";
import { userAtom } from "../store/userAtom";
import { Link, useParams } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { styled } from "styled-components";
import Swal from "sweetalert2";

const Header = () => {
  const { nation } = useParams();
  const [user] = useAtom(userAtom);
  const auth = getAuth();

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        Swal.fire({ title: "로그아웃에 성공했습니다.", icon: "success" });
      })
      .catch((error) => {
        Swal.fire({
          title: "로그아웃에 실패하였습니다. 다시 시도해 주세요",
          icon: "error",
        });
      });
  };
  return (
    // params에 국가가 있으면 관광명소/맛집/숙박 보이게 함...
    <HeaderContainer>
      <HomeLink to={"/"}></HomeLink>
      {nation && (
        <CategoryContainer>
          <Link to={`/${nation}/관광명소`}>관광명소</Link>
          <Link to={`/${nation}/맛집`}>맛집</Link>
          <Link to={`/${nation}/숙박`}>숙박</Link>
        </CategoryContainer>
      )}
      {user ? (
        <LoginContainer>
          <Link to={`/mypage/${user.uid}`}>내프로필</Link>
          <span onClick={logoutHandler}>로그아웃</span>
        </LoginContainer>
      ) : (
        <LoginContainer>
          <Link to={`/login`}>로그인</Link>
          <Link to={"/signup"}>회원가입</Link>
        </LoginContainer>
      )}
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 90px;
  padding: 0px 320px;
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #e5e5e5;
  }
`;

const HomeLink = styled(Link)`
  display: block;
  width: 142px;
  height: 46px;
  background: url(${process.env.PUBLIC_URL}/image/logo.png) no-repeat center /
    contain;
`;

const CategoryContainer = styled.div`
  flex-grow: 1;
  font-size: 18px;
  font-weight: 500;
  text-align: right;

  & > a {
    margin-right: 50px;
  }

  & > a:last-child {
    margin-right: 0;
  }
`;

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 100px;
  font-size: 14px;
  font-weight: 400;
  color: #bfbfbf;

  & > a {
    color: #bfbfbf;
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
    background-color: #bfbfbf;
    transform: translateY(-50%);
  }
  & > a:last-child,
  & > span {
    padding-left: 16px;
    cursor: pointer;
  }
`;
