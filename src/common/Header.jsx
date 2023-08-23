import { useAtom } from "jotai";
import React from "react";
import { userAtom } from "../store/userAtom";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const Header = () => {
  const [user] = useAtom(userAtom);
  const auth = getAuth();
  const navigate = useNavigate();

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        alert("로그아웃 되었습니다");
        navigate("/");
      })
      .catch(() => {
        alert("로그아웃에 실패하였습니다. 다시 시도해 주세요");
      });
  };

  return (
    <div>
      {!!user ? (
        <div>
          <Link to={"/"}>홈</Link>
          <Link to={`/mypage/${user.uid}`}>내프로필</Link>
          <span onClick={logoutHandler}>로그아웃</span>
        </div>
      ) : (
        <div>
          <Link to={"/"}>홈</Link>
          <Link to={"/login"}>로그인</Link>
          <Link to={"/signup"}>회원가입</Link>
        </div>
      )}
    </div>
  );
};

export default Header;
