import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import * as s from "./StyledSignup";
import { addDoc, collection } from "firebase/firestore";
import Modal from "../modal/Modal";

function Signup() {
  // input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // 중복확인 버튼 확인
  const [toCheck, setToCheck] = useState("");

  // 모달 여닫기
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 체크박스
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

  const navigate = useNavigate();

  // 회원가입 함수
  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      if (!email) {
        alert("이메일을 입력해 주세요.");
        return;
      }
      if (!password) {
        alert("비밀번호를 입력해 주세요.");
        return;
      }
      if (password !== confirmPassword) {
        alert(getErrorMessage("auth/wrong-password"));
        return;
      }
      if (!name) {
        alert("이름을 입력해 주세요");
        return;
      }
      if (!nickname) {
        alert("닉네임을 입력해 주세요");
        return;
      }
      if (!phoneNumber) {
        alert("전화번호를 입력해 주세요");
        return;
      }
      if (isNaN(phoneNumber) === true) {
        alert("번호는 '-'를 제외한 숫자만 입력해 주세요");
        return;
      }
      if (isChecked1 === false || isChecked2 === false) {
        alert("약관에 동의해 주세요");
        return;
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        updateProfile(auth.currentUser, {
          displayName: nickname,
        });
        const newUser = {
          uid: userCredential.user.uid,
          email,
          nickname,
          name,
          phoneNumber,
        };

        const collectionRef = collection(db, "users");
        await addDoc(collectionRef, newUser);
        alert("회원가입에 성공하셨습니다.");
        navigate("/");
      }
    } catch (error) {
      alert(getErrorMessage(error.code));
    }
  };

  // 에러코드에 해당하는 오류메시지 return
  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/user-not-found":
      case "auth/missing-email":
        return "잘못된 이메일입니다.";
      case "auth/missing-password":
        return "잘못된 비밀번호입니다.";
      case "auth/wrong-password":
        return "비밀번호가 일치하지 않습니다.";
      case "auth/email-already-in-use":
        return "이미 사용 중인 이메일입니다.";
      case "auth/weak-password":
        return "비밀번호는 6글자 이상이어야 합니다.";
      case "auth/invalid-email":
        return "잘못된 이메일 형식입니다.";
      case "auth/network-request-failed":
        return "네트워크 연결에 실패 하였습니다.";
      case "auth/internal-error":
        return "잘못된 요청입니다.";
      default:
        return "회원가입에 실패하셨습니다.";
    }
  };

  // 약관동의 체크박스 handler
  const checkboxHandler = (checkbox) => {
    if (checkbox === 1) {
      setIsChecked1(!isChecked1);
    } else if (checkbox === 2) {
      setIsChecked2(!isChecked2);
    }
  };

  return (
    <s.SignupContainer>
      <s.SignupTitle>회원가입</s.SignupTitle>
      <s.ProfileImgBox>
        <s.ProfileImg
          src="https://images.unsplash.com/photo-1536164261511-3a17e671d380?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fCVFRCU5NCU4NCVFQiVBMSU5QyVFRCU5NSU4NHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
          alt="프로필 이미지"
        />
        <s.ProfileImgBtn>
          <s.ProfileEditImg
            src="https://cdn-icons-png.flaticon.com/128/45/45010.png"
            alt="이미지 수정"
          />
        </s.ProfileImgBtn>
      </s.ProfileImgBox>

      <form>
        <s.InputBox>
          <s.InputTitle>아이디(이메일): </s.InputTitle>
          <s.InputCheck>
            <s.InfoInput
              type="email"
              value={email}
              placeholder="이메일주소"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              autoFocus
              autoComplete="email"
            />
            <s.CheckBtn
              disabled={!email}
              onClick={(e) => {
                e.preventDefault();
                setToCheck("이메일");
                setIsModalOpen(true);
              }}
            >
              중복확인
            </s.CheckBtn>
          </s.InputCheck>
        </s.InputBox>
        <s.InputBox>
          <s.InputTitle>이름 </s.InputTitle>
          <s.InputCheck>
            <s.InfoInput
              type="text"
              value={name}
              placeholder="이름을 입력해 주세요."
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </s.InputCheck>
        </s.InputBox>
        <s.InputBox>
          <s.InputTitle>비밀번호 </s.InputTitle>
          <s.InputCheck>
            <s.InfoInput
              type="password"
              value={password}
              placeholder="6자리 이상 입력해주세요."
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              autoComplete="password"
            />
          </s.InputCheck>
        </s.InputBox>
        <s.InputBox>
          <s.InputTitle>비밀번호 </s.InputTitle>
          <s.InputCheck>
            <s.InfoInput
              type="password"
              value={confirmPassword}
              placeholder="비밀번호 확인"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              autoComplete="password"
            />
          </s.InputCheck>
        </s.InputBox>
        <s.ErrorBox>
          <s.ErrorMark
            src="https://cdn-icons-png.flaticon.com/128/9503/9503179.png"
            alt="경고이미지"
          />
          <s.ErrorMsg>비밀번호가 일치 하지 않습니다.</s.ErrorMsg>
        </s.ErrorBox>
        <s.InputBox>
          <s.InputTitle>닉네임 </s.InputTitle>
          <s.InputCheck>
            <s.InfoInput
              type="text"
              value={nickname}
              placeholder="닉네임을 입력해 주세요."
              onChange={(e) => {
                setNickname(e.target.value);
              }}
            />
            <s.CheckBtn
              disabled={!nickname}
              onClick={(e) => {
                e.preventDefault();
                setToCheck("닉네임");
                setIsModalOpen(true);
              }}
            >
              중복확인
            </s.CheckBtn>
          </s.InputCheck>
        </s.InputBox>
        <s.InputBox>
          <s.InputTitle>연락처 </s.InputTitle>
          <s.InputCheck>
            <s.InfoInput
              type="tel"
              value={phoneNumber}
              placeholder="'-'없이 숫자만 입력해 주세요"
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
            <s.CheckBtn onClick={() => {}}>본인인증</s.CheckBtn>
          </s.InputCheck>
        </s.InputBox>
        <s.InputBox>
          <s.InputTitle>인증번호 </s.InputTitle>
          <s.InputCheck>
            <s.InfoInput
              type="number"
              // value={}
              onChange={() => {}}
            />
            <s.CheckBtn onClick={() => {}}>확인</s.CheckBtn>
          </s.InputCheck>
        </s.InputBox>
        <s.AgreementContainer>
          <s.AgreementTitleBox>
            <s.AgreementCheckBox
              style={{ marginTop: "14px", marginBottom: "14px" }}
              type="checkbox"
              checked={isChecked1}
              onChange={() => {
                checkboxHandler(1);
              }}
            />
            <s.AgreementTitle>이용약관 동의</s.AgreementTitle>
          </s.AgreementTitleBox>
          <s.AgreementBox>
            <s.AgreementSubtitleBox>
              <s.AgreementCheckBox
                type="checkbox"
                checked={isChecked1}
                onChange={() => {
                  checkboxHandler(1);
                }}
              />
              <s.AgreementSubtitle>이용약관(필수)</s.AgreementSubtitle>
            </s.AgreementSubtitleBox>
            <s.AgreementContentBox>
              <s.AgreementContent readOnly>
                김용택 / 달이 떴다고 전화를 주시다니요
                <br />
                달이 떴다고 전화를 주시다니요
                <br />
                이 밤 너무나 신나고 근사해요
                <br />
                내 마음에도 생전 처음 보는
                <br />
                환한 달이 떠오르고
                <br />
                산 아래 작은 마을이 그려집니다.
                <br />
                간절한 이 그리움들을
                <br />
                사무쳐오는 이 연정들을
                <br />
                달빛에 실어
                <br />
                당신께 보냅니다.
                <br />
                세상에
                <br />
                강변에 달빛이 곱다고
                <br />
                전화를 다 주시다니요
                <br />
                흐르는 물 어디쯤 눈부시게 부서지는 소리
                <br />
                문득 들려옵니다.
              </s.AgreementContent>
            </s.AgreementContentBox>
          </s.AgreementBox>
          <s.AgreementBox>
            <s.AgreementSubtitleBox>
              <s.AgreementCheckBox
                type="checkbox"
                checked={isChecked2}
                onChange={() => {
                  checkboxHandler(2);
                }}
              />
              <s.AgreementSubtitle>
                개인정보 수집 이용(필수)
              </s.AgreementSubtitle>
            </s.AgreementSubtitleBox>
            <s.AgreementContentBox>
              <s.AgreementContent readOnly>
                김용택 / 달이 떴다고 전화를 주시다니요
                <br />
                달이 떴다고 전화를 주시다니요
                <br />
                이 밤 너무나 신나고 근사해요
                <br />
                내 마음에도 생전 처음 보는
                <br />
                환한 달이 떠오르고
                <br />
                산 아래 작은 마을이 그려집니다.
                <br />
                간절한 이 그리움들을
                <br />
                사무쳐오는 이 연정들을
                <br />
                달빛에 실어
                <br />
                당신께 보냅니다.
                <br />
                세상에
                <br />
                강변에 달빛이 곱다고
                <br />
                전화를 다 주시다니요
                <br />
                흐르는 물 어디쯤 눈부시게 부서지는 소리
                <br />
                문득 들려옵니다.
              </s.AgreementContent>
            </s.AgreementContentBox>
          </s.AgreementBox>
        </s.AgreementContainer>
        <s.SignupBtn
          type="submit"
          onClick={(e) => {
            signupHandler(e);
          }}
        >
          가입하기
        </s.SignupBtn>
      </form>
      {isModalOpen ? (
        <Modal
          email={email}
          setEmail={setEmail}
          nickname={nickname}
          setNickname={setNickname}
          toCheck={toCheck}
          setIsModalOpen={setIsModalOpen}
        />
      ) : (
        <></>
      )}
    </s.SignupContainer>
  );
}

export default Signup;
