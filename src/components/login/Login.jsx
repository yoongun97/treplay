import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import * as s from "./StyledLogin";
import FacebookLogin from "./sns/FacebookLogin";
import GoogleLogin from "./sns/GoogleLogin";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      if (!email) {
        alert("이메일을 입력해주세요.");
        return;
      }
      if (!password) {
        alert("비밀번호를 입력해주세요.");
        return;
      }
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      alert("로그인에 성공하셨습니다.");

      navigate("/");
    } catch (error) {
      alert(getErrorMessage(error.code));
    }
  };

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/user-not-found":
      case "auth/missing-email":
        return "잘못된 이메일입니다.";
      case "auth/missing-password":
        return "잘못된 비밀번호입니다.";
      case "auth/weak-password":
        return "비밀번호는 6글자 이상이어야 합니다.";
      case "auth/network-request-failed":
        return "네트워크 연결에 실패 하였습니다.";
      case "auth/invalid-email":
        return "잘못된 이메일 형식입니다. email@email.com 형식으로 작성해 주세요";
      case "auth/internal-error":
        return "잘못된 요청입니다.";
      default:
        return "로그인에 실패하였습니다.";
    }
  };

  return (
    <div className="LoginContainer">
      <div>
        <div>Logo img</div>
        <s.InputForm>
          <div className="EmailInputBox">
            <span>이메일: </span>
            <input
              type="email"
              value={email}
              placeholder="이메일을 입력해 주세요 (ex: treplay@treplay.com)"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              autoFocus
              autoComplete="email"
            />
          </div>
          <div className="PasswordInputBox">
            <span>비밀번호: </span>
            <input
              type="password"
              value={password}
              placeholder="비밀번호를 입력해 주세요"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              autoComplete="password"
            />
          </div>
          <button
            type="submit"
            onClick={(e) => {
              loginHandler(e);
            }}
          >
            로그인
          </button>
        </s.InputForm>
        <div className="LinkContainer">
          <Link to="/signup">회원가입</Link>
        </div>
      </div>

      <div className="SocialLoginContainer">
        <p>SNS 계정으로 로그인 하기</p>
        <s.SnsContainer>
          <GoogleLogin />
          <FacebookLogin />
          <div>Naver</div>
        </s.SnsContainer>
      </div>
    </div>
  );
}

export default Login;
