import React, { useEffect, useState } from "react";
import { SnsBtn, SnsMent } from "../StyledLogin";
import { styled } from "styled-components";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

function NaverLogin() {
  const navigate = useNavigate();
  const timestamp = serverTimestamp();
  const url = sessionStorage.getItem("url");

  let naverLogin = new window.naver.LoginWithNaverId({
    clientId: `${process.env.REACT_APP_NAVER_CLIENT_ID}`,
    callbackUrl: `http://localhost:3000/login`,
    loginButton: { color: "green", type: 1, height: "30" },
  });

  const naverLoginHandler = () => {
    try {
      naverLogin.getLoginStatus(async (status) => {
        if (status) {
          const auth = getAuth();
          const email = naverLogin.user.email;
          const password = naverLogin.user.id;

          const usedEmail = await fetchSignInMethodsForEmail(auth, email);
          // 이미 존재하는 아이디가 있으면 로그인 진행
          if (usedEmail.length > 0) {
            const userCredential = await signInWithEmailAndPassword(
              auth,
              email,
              password
            );
            updateProfile(auth.currentUser, {
              displayName: naverLogin.user.nickname,
              photoURL: naverLogin.user.profile_image,
            });
            navigate(`${url}`);
            const user = userCredential.user;
            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, {
              nickname: naverLogin.user.nickname,
              email,
              uid: user.uid,
              createdAt: timestamp,
            });
          } // 이미 존재하는 아이디 없으면 회원가입 진행
          else if (usedEmail.length < 1) {
            // 여기에서 Firebase: Error (auth/email-already-in-use). 발생함 근데 아래쪽에 콘솔찍으면 또 찍혀서 미스테리임
            try {
              const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
              );
              updateProfile(auth.currentUser, {
                displayName: naverLogin.user.nickname,
                photoURL: naverLogin.user.profile_image,
              });
              const user = userCredential.user;
              const userRef = doc(db, "users", user.uid);
              await setDoc(userRef, {
                nickname: naverLogin.user.nickname,
                email,
                uid: user.uid,
                createdAt: timestamp,
              });
            } catch (e) {
              console.error(e);
            }
          }
          navigate(`${url}`);
        }
      });
    } catch (err) {
      console.log("에러발생");
    }
  };

  useEffect(() => {
    naverLogin.init();
    naverLogin.logout();
    naverLoginHandler();
  }, []);

  return (
    <SnsBtn>
      <StyledBox className="connect">
        <div id="naverIdLogin"></div>
      </StyledBox>
      <SnsMent>네이버 로그인</SnsMent>
    </SnsBtn>
  );
}

export default NaverLogin;

const StyledBox = styled.div`
  & > div {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
  }
`;
