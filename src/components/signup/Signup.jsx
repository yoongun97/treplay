import { useRef, useState } from "react";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  updateProfile,
} from "firebase/auth";
import { auth, db, storage } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import * as s from "./StyledSignup";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import NicknameModal from "../modal/NicknameModal";
import EmailModal from "../modal/EmailModal";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";

function Signup() {
  // 사진 넣기
  const [profileImage, setProfileImage] = useState("/image/baseprofile.jpeg");
  const [selectedImage, setSelectedImage] = useState(null);
  const imageInputRef = useRef();
  // input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [checkNumber, setCheckNumber] = useState("");

  // 모달 여닫기
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 체크박스
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

  // error box 위치 상태
  const [errorBox, setErrorBox] = useState("");

  // error msg 선택
  const [errorMsg, setErrorMsg] = useState("");

  // focus 줄 input 참조
  const emailInputRef = useRef();
  const nameInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmpwInputRef = useRef();
  const nicknameInputRef = useRef();
  const phonenumberInputRef = useRef();
  const checknumberInputRef = useRef();
  const checkboxInputRef = useRef();

  // 이메일/닉네임 인지 확인
  const [toCheck, setToCheck] = useState("");

  // 중복확인 여부 확인
  const [isUsedEmail, setIsUsedEmail] = useState("duplicate");
  const [isUsedNickname, setIsUsedNickname] = useState(true);

  // 약관동의 체크박스 handler
  const checkboxHandler = (checkbox) => {
    if (checkbox === 1) {
      setIsChecked1(!isChecked1);
    } else if (checkbox === 2) {
      setIsChecked2(!isChecked2);
    } else {
      setIsChecked1(!isChecked1);
      setIsChecked2(!isChecked2);
    }
  };

  const navigate = useNavigate();

  // 회원가입 함수
  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      if (!email) {
        setIsUsedEmail("duplicate");
        setErrorBox("email");
        setErrorMsg("이메일을 입력해 주세요.");
        emailInputRef.current.focus();
        return;
      }
      if (!name) {
        setErrorBox("name");
        setErrorMsg("이름을 입력해 주세요.");
        nameInputRef.current.focus();
        return;
      }
      if (!password) {
        setErrorBox("password");
        setErrorMsg("비밀번호를 입력해 주세요.");
        passwordInputRef.current.focus();
        return;
      }
      if (password !== confirmPassword) {
        setErrorBox("confirmPassword");
        setErrorMsg(getErrorMessage("auth/wrong-password"));
        confirmpwInputRef.current.focus();
        return;
      }

      if (!nickname) {
        setIsUsedNickname(true);
        setErrorBox("nickname");
        setErrorMsg("닉네임을 입력해 주세요.");
        nicknameInputRef.current.focus();
        return;
      }
      if (!phoneNumber) {
        setErrorBox("phoneNumber");
        setErrorMsg("전화번호를 입력해 주세요.");
        phonenumberInputRef.current.focus();
        return;
      }
      if (isNaN(phoneNumber) === true) {
        setErrorBox("phoneNumber");
        setErrorMsg("번호는 '-'를 제외한 숫자만 입력해 주세요.");
        phonenumberInputRef.current.focus();
        return;
      }
      if (!checkNumber) {
        setErrorBox("checkNumber");
        setErrorMsg("인증번호를 입력해주세요.");
        checknumberInputRef.current.focus();
        return;
      }
      if (isChecked1 === false || isChecked2 === false) {
        setErrorBox("");
        alert("약관에 동의해 주세요.");
        checkboxInputRef.current.focus();
        return;
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        //이미지 넣기
        if (selectedImage) {
          const storageRef = ref(
            storage,
            `profile_images/${userCredential.user.uid}`
          );
          const imageSnapshot = await uploadBytes(storageRef, selectedImage);
          const imageUrl = await getDownloadURL(imageSnapshot.ref);

          updateProfile(auth.currentUser, {
            displayName: nickname,
            photoURL: imageUrl, //이미지 url
          });
        } else {
          updateProfile(auth.currentUser, {
            displayName: nickname,
          });
        }

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
      if (
        error.code === "auth/invalid-email" ||
        error.code === "auth/email-already-in-use"
      ) {
        setErrorBox("email");
        setErrorMsg("중복확인을 해주세요");
        emailInputRef.current.focus();
      } else if (error.code === "auth/weak-password") {
        setErrorBox("password");
        setErrorMsg(getErrorMessage(error.code));
        passwordInputRef.current.focus();
      } else {
        alert(getErrorMessage(error.code));
      }
      console.log(error.message);
    }
  };

  // 에러코드에 해당하는 오류메시지 return
  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/invalid-email":
        return "잘못된 이메일 형식입니다.";
      case "auth/email-already-in-use":
        return "이미 사용 중인 이메일입니다.";
      case "auth/weak-password":
        return "비밀번호는 6글자 이상이어야 합니다.";
      case "auth/wrong-password":
        return "비밀번호가 일치하지 않습니다.";
      case "auth/network-request-failed":
        return "네트워크 연결에 실패 하였습니다.";
      case "auth/internal-error":
        return "잘못된 요청입니다.";
      default:
        return "회원가입에 실패하셨습니다.";
    }
  };

  // 이메일 중복확인 함수
  const emailCheckHandler = async (email) => {
    try {
      const usedEmail = await fetchSignInMethodsForEmail(auth, email);
      console.log({ usedEmail });
      if (usedEmail.length > 0) {
        setIsUsedEmail("duplicate");
        setToCheck("이메일");
        setIsModalOpen(true);
      } else if (usedEmail.length === 0) {
        setIsUsedEmail("notduplicate");
        setErrorBox("email");
        setErrorMsg("사용 가능한 이메일입니다.");
      }
    } catch (error) {
      console.log(error);
      setIsUsedEmail("error");
      setErrorBox("email");
      setErrorMsg("유효하지 않은 이메일입니다.");
    }
  };

  // 닉네임 중복확인 함수
  const nicknameCheckHandler = async (nickname) => {
    try {
      const q = query(collection(db, "users"));
      // 여기서 시간 걸림
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      const usedNickname = data.filter((item) => item.nickname === nickname);

      if (usedNickname.length > 0) {
        setIsUsedNickname(true);
        setToCheck("닉네임");
        setIsModalOpen(true);
      } else if (usedNickname.length === 0) {
        setIsUsedNickname(false);
        setErrorBox("nickname");
        setErrorMsg("사용 가능한 닉네임입니다.");
      }
    } catch (error) {
      console.log(error);
      setIsUsedNickname(true);
      setErrorBox("nickname");
      setErrorMsg("유효하지 않은 닉네임입니다.");
    }
  };

  // 이미지 변경 처리 함수
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
      };
      reader.readAsDataURL(selectedImage);

      setSelectedImage(selectedImage); // 선택한 이미지 저장
    }
  };

  return (
    <s.SignupContainer isModalOpen={isModalOpen}>
      {isModalOpen && <s.Overlay isModalOpen={isModalOpen} />}
      <s.SignupTitle>회원가입</s.SignupTitle>
      <s.ProfileImgBox>
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          ref={imageInputRef}
          onChange={handleImageChange}
        />
        <s.ProfileImg src={profileImage} alt="프로필 이미지" />
        <s.ProfileImgBtn>
          <s.ProfileEditImg
            src="https://cdn-icons-png.flaticon.com/128/45/45010.png"
            alt="이미지 수정"
            onClick={() => imageInputRef.current.click()}
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
                setErrorBox("");
              }}
              ref={emailInputRef}
              autoFocus
            />
            <s.CheckBtn
              disabled={!email}
              onClick={(e) => {
                e.preventDefault();
                emailCheckHandler(email);
              }}
            >
              중복확인
            </s.CheckBtn>
          </s.InputCheck>
        </s.InputBox>
        {!isModalOpen && errorBox === "email" && (
          <s.ErrorBox>
            {isUsedEmail === "notduplicate" ? (
              <s.ErrorMark
                src="https://cdn-icons-png.flaticon.com/128/992/992481.png"
                alt="가능이미지"
              />
            ) : (
              <s.ErrorMark
                src="https://cdn-icons-png.flaticon.com/128/9503/9503179.png"
                alt="경고이미지"
              />
            )}
            <s.ErrorMsg
              error={isUsedEmail === "notduplicate" ? "false" : "true"}
            >
              {errorMsg}
            </s.ErrorMsg>
          </s.ErrorBox>
        )}
        <s.InputBox>
          <s.InputTitle>이름 </s.InputTitle>
          <s.InputCheck>
            <s.InfoInput
              type="text"
              value={name}
              placeholder="이름을 입력해 주세요."
              onChange={(e) => {
                setName(e.target.value);
                setErrorBox("");
              }}
              ref={nameInputRef}
            />
          </s.InputCheck>
        </s.InputBox>
        {errorBox === "name" && (
          <s.ErrorBox>
            <s.ErrorMark
              src="https://cdn-icons-png.flaticon.com/128/9503/9503179.png"
              alt="경고이미지"
            />
            <s.ErrorMsg>{errorMsg}</s.ErrorMsg>
          </s.ErrorBox>
        )}
        <s.InputBox>
          <s.InputTitle>비밀번호 </s.InputTitle>
          <s.InputCheck>
            <s.InfoInput
              style={{ width: "95%" }}
              type="password"
              value={password}
              placeholder="6자리 이상 입력해주세요."
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorBox("");
              }}
              ref={passwordInputRef}
            />
          </s.InputCheck>
        </s.InputBox>
        {errorBox === "password" && (
          <s.ErrorBox>
            <s.ErrorMark
              src="https://cdn-icons-png.flaticon.com/128/9503/9503179.png"
              alt="경고이미지"
            />
            <s.ErrorMsg>{errorMsg}</s.ErrorMsg>
          </s.ErrorBox>
        )}
        <s.InputBox>
          <s.InputTitle>비밀번호</s.InputTitle>
          <s.InputCheck>
            <s.InfoInput
              style={{ width: "95%" }}
              type="password"
              value={confirmPassword}
              placeholder="비밀번호 확인"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setErrorBox("");
              }}
              ref={confirmpwInputRef}
            />
          </s.InputCheck>
        </s.InputBox>
        {errorBox === "confirmPassword" && (
          <s.ErrorBox>
            <s.ErrorMark
              src="https://cdn-icons-png.flaticon.com/128/9503/9503179.png"
              alt="경고이미지"
            />
            <s.ErrorMsg>{errorMsg}</s.ErrorMsg>
          </s.ErrorBox>
        )}
        <s.InputBox>
          <s.InputTitle>닉네임 </s.InputTitle>
          <s.InputCheck>
            <s.InfoInput
              type="text"
              value={nickname}
              placeholder="닉네임을 입력해 주세요.(10자 이하)"
              maxLength={10}
              onChange={(e) => {
                setNickname(e.target.value);
                setErrorBox("");
              }}
              ref={nicknameInputRef}
            />
            <s.CheckBtn
              disabled={!nickname}
              onClick={(e) => {
                e.preventDefault();
                nicknameCheckHandler(nickname);
              }}
            >
              중복확인
            </s.CheckBtn>
          </s.InputCheck>
        </s.InputBox>
        {!isModalOpen && errorBox === "nickname" && (
          <s.ErrorBox>
            {isUsedNickname === false ? (
              <s.ErrorMark
                src="https://cdn-icons-png.flaticon.com/128/992/992481.png"
                alt="가능이미지"
              />
            ) : (
              <s.ErrorMark
                src="https://cdn-icons-png.flaticon.com/128/9503/9503179.png"
                alt="경고이미지"
              />
            )}

            <s.ErrorMsg error={isUsedNickname === false ? "false" : "true"}>
              {errorMsg}
            </s.ErrorMsg>
          </s.ErrorBox>
        )}
        <s.InputBox>
          <s.InputTitle>연락처 </s.InputTitle>
          <s.InputCheck>
            <s.InfoInput
              type="tel"
              value={phoneNumber}
              placeholder="'-'없이 숫자만 입력해 주세요"
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                setErrorBox("");
              }}
              ref={phonenumberInputRef}
            />
            <s.CheckBtn onClick={() => {}}>본인인증</s.CheckBtn>
          </s.InputCheck>
        </s.InputBox>
        {errorBox === "phoneNumber" && (
          <s.ErrorBox>
            <s.ErrorMark
              src="https://cdn-icons-png.flaticon.com/128/9503/9503179.png"
              alt="경고이미지"
            />
            <s.ErrorMsg>{errorMsg}</s.ErrorMsg>
          </s.ErrorBox>
        )}
        <s.InputBox>
          <s.InputTitle>인증번호 </s.InputTitle>
          <s.InputCheck>
            <s.InfoInput
              type="number"
              value={checkNumber}
              placeholder="인증번호를 입력해주세요."
              onChange={(e) => {
                setCheckNumber(e.target.value);
                setErrorBox("");
              }}
              ref={checknumberInputRef}
            />
            <s.CheckBtn onClick={() => {}}>확인</s.CheckBtn>
          </s.InputCheck>
        </s.InputBox>
        {errorBox === "checkNumber" && (
          <s.ErrorBox>
            <s.ErrorMark
              src="https://cdn-icons-png.flaticon.com/128/9503/9503179.png"
              alt="경고이미지"
            />
            <s.ErrorMsg>{errorMsg}</s.ErrorMsg>
          </s.ErrorBox>
        )}
        <s.AgreementContainer>
          <s.AgreementTitleBox>
            <s.AgreementCheckBox
              style={{ marginTop: "14px", marginBottom: "14px" }}
              type="checkbox"
              checked={isChecked1 && isChecked2}
              onChange={() => {
                checkboxHandler(0);
              }}
              ref={checkboxInputRef}
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
      {isModalOpen &&
        (toCheck === "이메일" ? (
          <EmailModal
            email={email}
            setEmail={setEmail}
            setIsModalOpen={setIsModalOpen}
            isUsedEmail={isUsedEmail}
            emailCheckHandler={emailCheckHandler}
          />
        ) : (
          <NicknameModal
            nickname={nickname}
            setNickname={setNickname}
            setIsModalOpen={setIsModalOpen}
            isUsedNickname={isUsedNickname}
            nicknameCheckHandler={nicknameCheckHandler}
          />
        ))}
    </s.SignupContainer>
  );
}

export default Signup;
