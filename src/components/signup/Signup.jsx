import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
// import * as s from "./StyledSignup";
import { addDoc, collection, getDocs, query } from "firebase/firestore";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [isUsedNickname, setIsUsedNickname] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

  const navigate = useNavigate();

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
      if (!confirmPassword) {
        alert("비밀번호 확인란을 입력해 주세요.");
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
      if (isUsedNickname === true) {
        alert(
          "중복된 닉네임은 사용할 수 없습니다. 다른 닉네임을 입력해 주세요."
        );
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
      case "auth/network-request-failed":
        return "네트워크 연결에 실패 하였습니다.";
      case "auth/invalid-email":
        return "잘못된 이메일 형식입니다.";
      case "auth/internal-error":
        return "잘못된 요청입니다.";
      default:
        return "회원가입에 실패하셨습니다.";
    }
  };

  const checkboxHandler = (checkbox) => {
    if (checkbox === 1) {
      setIsChecked1(!isChecked1);
    } else if (checkbox === 2) {
      setIsChecked2(!isChecked2);
    }
  };

  const nicknameCheckHandler = async (e) => {
    e.preventDefault();
    try {
      if (!!nickname === false) {
        return alert("닉네임을 입력해 주세요");
      }
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      const usedNickname = data.filter((item) => item.nickname === nickname);

      if (usedNickname.length > 0) {
        setIsUsedNickname(true);
        return alert(
          "이미 사용 중인 닉네임입니다. 다른 닉네임을 사용해 주세요."
        );
      } else if (usedNickname.length === 0) {
        setIsUsedNickname(false);
        return alert("사용 가능한 닉네임입니다!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="SignupContainer">
      <form>
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
          <span>비밀번호 </span>
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
        <div className="ConfirmPasswordInputBox">
          <span>비밀번호 확인 </span>
          <input
            type="password"
            value={confirmPassword}
            placeholder="비밀번호를 동일하게 입력해 주세요"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            autoComplete="password"
          />
        </div>
        <div className="NameInputBox">
          <span>이름 </span>
          <input
            type="text"
            value={name}
            placeholder="이름을 입력해 주세요."
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="NicknameInputBox">
          <span>닉네임 </span>
          <input
            type="text"
            value={nickname}
            placeholder="닉네임을 입력해 주세요."
            onChange={(e) => {
              setNickname(e.target.value);
            }}
          />
          <button onClick={(e) => nicknameCheckHandler(e)}>중복체크</button>
        </div>
        <div className="PhoneNumberInputBox">
          <span>전화번호 </span>
          <input
            type="tel"
            value={phoneNumber}
            placeholder="'-'없이 숫자로만 입력해 주세요"
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          />
        </div>
        <div className="AgreementContainer">
          <div className="AgreementBox">
            <input
              type="checkbox"
              checked={isChecked1}
              onChange={() => {
                checkboxHandler(1);
              }}
            />
            약관동의
            <textarea placeholder="소ㅑㄹ라샬라" readOnly></textarea>
          </div>
          <div>
            <input
              type="checkbox"
              checked={isChecked2}
              onChange={() => {
                checkboxHandler(2);
              }}
            />
            약관동의2
            <textarea placeholder="소ㅑㄹ라샬라" readOnly></textarea>
          </div>
        </div>
        <button
          type="submit"
          onClick={(e) => {
            signupHandler(e);
          }}
        >
          회원가입
        </button>
      </form>
    </div>
  );
}

export default Signup;
