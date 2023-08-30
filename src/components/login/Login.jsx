import React, { useRef, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useLocation, useNavigate } from "react-router-dom";
import * as s from "./StyledLogin";
import FacebookLogin from "./sns/FacebookLogin";
import GoogleLogin from "./sns/GoogleLogin";
import NaverLogin from "./sns/NaverLogin";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // error msg 선택
  const [errorMsg, setErrorMsg] = useState("");

  // focus 줄 input 참조
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const navigate = useNavigate();
  const location = useLocation(); // useLocation 훅을 사용하여 이전 페이지 정보 가져오기

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      if (!email) {
        setErrorMsg("이메일을 입력해 주세요.");
        emailInputRef.current.focus();
        return;
      }
      if (!password) {
        setErrorMsg("비밀번호를 입력해 주세요.");
        passwordInputRef.current.focus();
        return;
      }
      await signInWithEmailAndPassword(auth, email, password);

      // 이전 페이지로 이동
      navigate(location.state?.from || "/"); // 이전 페이지 정보를 이용하여 이동
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setErrorMsg("등록되지 않은 이메일입니다.");
      } else if (error.code === "auth/invalid-email") {
        setErrorMsg("잘못된 이메일 형식입니다.");
      } else if (error.code === "auth/wrong-password") {
        setErrorMsg("비밀번호가 일치하지 않습니다.");
      } else {
        alert(getErrorMessage(error.code));
      }

      console.log(error.code);
    }
  };

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/user-not-found":
        return "가입되지 않은 이메일입니다.";
      case "auth/invalid-email":
        return "잘못된 이메일 형식입니다. email@email.com 형식으로 작성해 주세요";
      case "auth/wrong-password":
        return "비밀번호가 일치하지 않습니다.";
      case "auth/network-request-failed":
        return "네트워크 연결에 실패 하였습니다.";
      case "auth/internal-error":
        return "잘못된 요청입니다.";
      case "auth/too-many-requests":
        return "너무 많은 요청이 감지되었습니다. 잠시 뒤 다시 시도해 주세요";
      default:
        return "로그인에 실패하였습니다.";
    }
  };

  return (
    <s.LoginContainer>
      <s.EmailLoginBox>
        <s.LoginTitle>로그인</s.LoginTitle>
        <s.InputForm>
          <s.InputBox>
            <s.InfoInput
              type="email"
              value={email}
              placeholder="이메일을 입력해주세요"
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorMsg("");
              }}
              autoFocus
              autoComplete="email"
              ref={emailInputRef}
            />
          </s.InputBox>
          <s.InputBox>
            <s.InfoInput
              type="password"
              value={password}
              placeholder="비밀번호를 입력해주세요"
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorMsg("");
              }}
              autoComplete="password"
              ref={passwordInputRef}
            />
          </s.InputBox>
          {errorMsg && (
            <s.ErrorBox>
              <s.ErrorMark
                src="https://cdn-icons-png.flaticon.com/128/9503/9503179.png"
                alt="경고이미지"
              />
              <s.ErrorMsg>{errorMsg}</s.ErrorMsg>
            </s.ErrorBox>
          )}
          <s.BtnBox>
            <s.NaviBtn
              onClick={() => {
                navigate("/idpw/inquiry");
              }}
            >
              아이디 찾기
            </s.NaviBtn>
            <s.NaviBtn
              onClick={() => {
                navigate("/idpw/inquiry");
              }}
            >
              비밀번호 찾기
            </s.NaviBtn>
            <s.NaviBtn
              onClick={() => {
                navigate("/signup");
              }}
            >
              회원가입
            </s.NaviBtn>
          </s.BtnBox>
          <s.LoginBtn
            type="submit"
            onClick={(e) => {
              loginHandler(e);
            }}
          >
            로그인
          </s.LoginBtn>
        </s.InputForm>
      </s.EmailLoginBox>

      <s.SnsLoginContainer>
        <s.SnsLoginTitle>SNS 계정으로 로그인</s.SnsLoginTitle>
        <s.SnsContainer>
          <FacebookLogin />
          <GoogleLogin />
          <NaverLogin />
        </s.SnsContainer>
      </s.SnsLoginContainer>
    </s.LoginContainer>
  );
}

export default Login;
