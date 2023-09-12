import { useEffect, useRef, useState } from "react";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  updateProfile,
} from "firebase/auth";
import { auth, db, storage } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import * as s from "./StyledSignup";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import NicknameModal from "../modal/NicknameModal";
import EmailModal from "../modal/EmailModal";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import Swal from "sweetalert2";

const ERROR_BOXES = {
  NAME: "name",
  EMAIL: "email",
  PASSWORD: "password",
  CONFIRM_PASSWORD: "confirmPassword",
  NICKNAME: "nickname",
  PHONE_NUMBER: "phoneNumber",
};

function Signup() {
  const navigate = useNavigate();
  const url = sessionStorage.getItem("url");

  // 사진 넣기
  const [profileImage, setProfileImage] = useState(
    `${process.env.PUBLIC_URL}/image/baseprofile.jpeg`
  );
  const [selectedImage, setSelectedImage] = useState(null);
  const imageInputRef = useRef();

  // input
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    nickname: "",
    phoneNumber: "",
  });

  // 모달 여닫기
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 체크박스
  const [termsOfUse, setTermsOfUse] = useState(false);
  const [personalInfo, setPersonalInfo] = useState(false);

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
  // const checknumberInputRef = useRef();
  const checkboxInputRef = useRef();

  // 이메일/닉네임 인지 확인
  const [toCheck, setToCheck] = useState("");

  // 중복확인 여부 확인
  const [isUsedEmail, setIsUsedEmail] = useState(true);
  const [isUsedNickname, setIsUsedNickname] = useState(true);

  // 약관동의 체크박스 handler
  const bothCheckHandler = (isChecked) => {
    setTermsOfUse(isChecked);
    setPersonalInfo(isChecked);
  };

  const inputChangeHandler = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
    setErrorBox("");
  };

  // 회원가입 함수
  const signupHandler = async (e) => {
    e.preventDefault();

    // 이름, 연락처로 회원 정보 여부 확인
    const q = query(
      collection(db, "users"),
      where("name", "==", inputs.name),
      where("phoneNumber", "==", inputs.phoneNumber)
    );

    const querySnapshot = await getDocs(q);
    const userData = querySnapshot.docs.map((doc) => doc.data());
    const timestamp = serverTimestamp();
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    try {
      if (!inputs.email) {
        setIsUsedEmail(true);
        setErrorBox(ERROR_BOXES.EMAIL);
        setErrorMsg("이메일을 입력해 주세요.");
        emailInputRef.current.focus();
        return;
      }
      if (!emailRegex.test(inputs.email)) {
        setIsUsedEmail(true);
        setErrorBox(ERROR_BOXES.EMAIL);
        setErrorMsg(getErrorMessage("auth/invalid-email"));
        emailInputRef.current.focus();
        return;
      }
      if (!inputs.name) {
        setErrorBox(ERROR_BOXES.NAME);
        setErrorMsg("이름을 입력해 주세요.");
        nameInputRef.current.focus();
        return;
      }
      if (!inputs.password) {
        setErrorBox(ERROR_BOXES.PASSWORD);
        setErrorMsg("비밀번호를 입력해 주세요.");
        passwordInputRef.current.focus();
        return;
      }
      if (inputs.password.length < 6) {
        setErrorBox(ERROR_BOXES.PASSWORD);
        setErrorMsg(getErrorMessage("auth/weak-password"));
        passwordInputRef.current.focus();
        return;
      }
      if (inputs.password !== inputs.confirmPassword) {
        setErrorBox(ERROR_BOXES.CONFIRM_PASSWORD);
        setErrorMsg(getErrorMessage("auth/wrong-password"));
        confirmpwInputRef.current.focus();
        return;
      }
      if (!inputs.nickname) {
        setIsUsedNickname(true);
        setErrorBox(ERROR_BOXES.NICKNAME);
        setErrorMsg("닉네임을 입력해 주세요.");
        nicknameInputRef.current.focus();
        return;
      }
      if (!inputs.phoneNumber) {
        setErrorBox(ERROR_BOXES.PHONE_NUMBER);
        setErrorMsg("전화번호를 입력해 주세요.");
        phonenumberInputRef.current.focus();
        return;
      }

      if (inputs.phoneNumber.length < 10) {
        setErrorBox(ERROR_BOXES.PHONE_NUMBER);
        setErrorMsg("전화번호는 10자 이상이어야 합니다.");
        phonenumberInputRef.current.focus();
        return;
      }
      if (isNaN(inputs.phoneNumber) === true) {
        setErrorBox(ERROR_BOXES.PHONE_NUMBER);
        setErrorMsg("번호는 '-'를 제외한 숫자만 입력해 주세요.");
        phonenumberInputRef.current.focus();
        return;
      }
      if (userData.length > 1) {
        Swal.fire({ title: "이미 생성된 계정이 있습니다.", icon: "error" });
        return;
      }
      if (termsOfUse === false || personalInfo === false) {
        setErrorBox("");
        Swal.fire({ title: "약관에 동의해 주세요.", icon: "warning" });
        checkboxInputRef.current.focus();
        return;
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          inputs.email,
          inputs.password
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
            displayName: inputs.nickname,
            photoURL: imageUrl, //이미지 url
          });
        } else {
          updateProfile(auth.currentUser, {
            displayName: inputs.nickname,
          });
        }

        const newUser = {
          uid: userCredential.user.uid,
          email: inputs.email,
          nickname: inputs.nickname,
          name: inputs.name,
          phoneNumber: inputs.phoneNumber,
          createdAt: timestamp, // 가입한 날짜를 추가합니다.
        };

        const collectionRef = collection(db, "users");
        await addDoc(collectionRef, newUser);
        Swal.fire({ title: "회원가입에 성공하셨습니다.", icon: "success" });
        navigate(`${url}`);
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setErrorBox(ERROR_BOXES.EMAIL);
        setErrorMsg("중복확인을 해주세요");
        emailInputRef.current.focus();
      } else {
        Swal.fire({ title: `${getErrorMessage(error.code)}`, icon: "error" });
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
      if (usedEmail.length > 0) {
        setIsUsedEmail(true);
        setToCheck("이메일");
        setIsModalOpen(true);
      } else if (usedEmail.length === 0) {
        setIsUsedEmail(false);
        setErrorBox(ERROR_BOXES.EMAIL);
        setErrorMsg("사용 가능한 이메일입니다.");
      }
    } catch (error) {
      console.log(error);
      setIsUsedEmail(true);
      setErrorBox(ERROR_BOXES.EMAIL);
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
        setErrorBox(ERROR_BOXES.NICKNAME);
        setErrorMsg("사용 가능한 닉네임입니다.");
      }
    } catch (error) {
      console.log(error);
      setIsUsedNickname(true);
      setErrorBox(ERROR_BOXES.NICKNAME);
      setErrorMsg("유효하지 않은 닉네임입니다.");
    }
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
      };
      reader.readAsDataURL(selectedImage);
      setSelectedImage(selectedImage); // 선택한 이미지 저장
    } else {
      setProfileImage(`${process.env.PUBLIC_URL}/image/baseprofile.jpeg`);
      setSelectedImage(null);
    }
  };

  // Clean Up 함수를 이용해 페이지 언마운트 시 스크롤 가장 위로
  useEffect(() => {
    return () => {
      window.scrollTo(0, 0);
    };
  }, []);

  return (
    <s.SignupContainer>
      {isModalOpen && <s.Overlay ismodalopen={isModalOpen} />}
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
          <s.InputTitle>아이디(이메일) </s.InputTitle>
          <s.InputCheck>
            <s.InfoInput
              name="email"
              type="email"
              value={inputs.email}
              placeholder="실제 사용중인 이메일을 입력해주세요."
              onChange={(e) => {
                inputChangeHandler(e);
              }}
              ref={emailInputRef}
              autoFocus
            />
            <s.CheckBtn
              disabled={!inputs.email}
              onClick={(e) => {
                e.preventDefault();
                emailCheckHandler(inputs.email);
              }}
            >
              중복확인
            </s.CheckBtn>
          </s.InputCheck>
        </s.InputBox>
        {!isModalOpen && errorBox === "email" && (
          <s.ErrorBox>
            {isUsedEmail === false ? (
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
            <s.ErrorMsg error={isUsedEmail === false ? "false" : "true"}>
              {errorMsg}
            </s.ErrorMsg>
          </s.ErrorBox>
        )}
        <s.InputBox>
          <s.InputTitle>이름 </s.InputTitle>
          <s.InputCheck>
            <s.InfoInput
              name="name"
              type="text"
              value={inputs.name}
              placeholder="이름을 입력해 주세요."
              onChange={(e) => {
                inputChangeHandler(e);
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
              name="password"
              type="password"
              value={inputs.password}
              placeholder="6자리 이상 입력해주세요."
              onChange={(e) => {
                inputChangeHandler(e);
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
              name="confirmPassword"
              type="password"
              value={inputs.confirmPassword}
              placeholder="비밀번호 확인"
              onChange={(e) => {
                inputChangeHandler(e);
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
              name="nickname"
              type="text"
              value={inputs.nickname}
              placeholder="닉네임을 입력해 주세요.(10자 이하)"
              maxLength={10}
              onChange={(e) => {
                inputChangeHandler(e);
              }}
              ref={nicknameInputRef}
            />
            <s.CheckBtn
              disabled={!inputs.nickname}
              onClick={(e) => {
                e.preventDefault();
                nicknameCheckHandler(inputs.nickname);
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
              name="phoneNumber"
              type="tel"
              value={inputs.phoneNumber}
              placeholder="'-'없이 숫자만 입력해 주세요"
              onChange={(e) => {
                inputChangeHandler(e);
              }}
              ref={phonenumberInputRef}
            />
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
        <s.AgreementContainer>
          <s.AgreementTitleBox>
            <s.AgreementCheckBox
              style={{ marginTop: "14px", marginBottom: "14px" }}
              type="checkbox"
              checked={termsOfUse && personalInfo}
              onChange={(e) => {
                bothCheckHandler(e.target.checked);
              }}
              ref={checkboxInputRef}
            />
            <s.AgreementTitle>이용약관 동의</s.AgreementTitle>
          </s.AgreementTitleBox>
          <s.AgreementBox>
            <s.AgreementSubtitleBox>
              <s.AgreementCheckBox
                type="checkbox"
                checked={termsOfUse}
                onChange={(e) => {
                  setTermsOfUse(e.target.checked);
                }}
              />
              <s.AgreementSubtitle>이용약관</s.AgreementSubtitle>
              <s.AgreementSubtitle
                style={{ color: "#E02918", marginLeft: "5px" }}
              >
                (필수)
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
          <s.AgreementBox>
            <s.AgreementSubtitleBox>
              <s.AgreementCheckBox
                type="checkbox"
                checked={personalInfo}
                onChange={(e) => {
                  setPersonalInfo(e.target.checked);
                }}
              />
              <s.AgreementSubtitle>개인정보 수집 이용</s.AgreementSubtitle>
              <s.AgreementSubtitle
                style={{ color: "#E02918", marginLeft: "5px" }}
              >
                (필수)
              </s.AgreementSubtitle>
            </s.AgreementSubtitleBox>
            <s.AgreementContentBox>
              <s.AgreementContent readOnly>
                김용택 / 달이 떴다고 전화를 주시다니요.
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
            email={inputs.email}
            inputs={inputs}
            setInputs={setInputs}
            setIsModalOpen={setIsModalOpen}
            isUsedEmail={isUsedEmail}
            emailCheckHandler={emailCheckHandler}
          />
        ) : (
          <NicknameModal
            nickname={inputs.nickname}
            inputs={inputs}
            setInputs={setInputs}
            setIsModalOpen={setIsModalOpen}
            isUsedNickname={isUsedNickname}
            nicknameCheckHandler={nicknameCheckHandler}
          />
        ))}
    </s.SignupContainer>
  );
}

export default Signup;
