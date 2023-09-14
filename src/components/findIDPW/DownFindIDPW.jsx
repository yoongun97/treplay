import React, { useRef, useState } from 'react';
import * as s from './StyledFindIDPW';
import { auth, db } from '../../firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import Swal from 'sweetalert2';

const ERROR_BOXES = {
  NAME: 'name',
  EMAIL: 'email',
  PHONE_NUMBER: 'phoneNumber',
};

function DownFindIDPW() {
  const navigate = useNavigate();
  // 아이디 찾기 or 비밀번호 찾기
  const [isFindID, setIsFindID] = useState(true);

  // 찾기 버튼 클릭 여부
  const [isChecked, setIsChecked] = useState(false);

  // input 값
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  // focus 줄 input 참조
  const nameInputRef = useRef();
  const phoneNumberInputRef = useRef();
  const emailInputRef = useRef();

  // error box 위치 상태
  const [errorBox, setErrorBox] = useState('');

  // error msg 선택
  const [errorMsg, setErrorMsg] = useState('');

  // 찾기 결과 데이터
  const [userData, setUserData] = useState([]);

  const handleClick = async () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!name) {
      setErrorBox(ERROR_BOXES.NAME);
      setErrorMsg('이름을 입력해 주세요.');
      nameInputRef.current.focus();
      return;
    }
    if (!isFindID && !email) {
      setErrorBox(ERROR_BOXES.EMAIL);
      setErrorMsg('아이디를 입력해주세요.');
      emailInputRef.current.focus();
      return;
    }
    if (!isFindID && !emailRegex.test(email)) {
      setErrorBox(ERROR_BOXES.EMAIL);
      setErrorMsg('이메일 형식으로 입력해주세요.');
      emailInputRef.current.focus();
      return;
    }
    if (!phoneNumber) {
      setErrorBox(ERROR_BOXES.PHONE_NUMBER);
      setErrorMsg('연락처를 입력해 주세요.');
      phoneNumberInputRef.current.focus();
      return;
    }
    if (phoneNumber.length < 10) {
      setErrorBox(ERROR_BOXES.PHONE_NUMBER);
      setErrorMsg('연락처를 확인해주세요.');
      phoneNumberInputRef.current.focus();
      return;
    }

    setIsChecked(true);

    if (isFindID) {
      const q = query(
        collection(db, 'users'),
        where('name', '==', name),
        where('phoneNumber', '==', phoneNumber)
      );

      const querySnapshot = await getDocs(q);
      const userData = querySnapshot.docs.map((doc) => doc.data());
      setUserData(userData);
    } else {
      const q = query(
        collection(db, 'users'),
        where('name', '==', name),
        where('email', '==', email),
        where('phoneNumber', '==', phoneNumber)
      );

      const querySnapshot = await getDocs(q);
      const userData = querySnapshot.docs.map((doc) => doc.data());
      setUserData(userData);
      if (userData.length > 0) {
        ResetBtnHandler();
      }
    }
  };

  const ResetBtnHandler = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      Swal.fire({ title: `${error.code}`, icon: 'error' });
    }
  };

  const TimeStampToDate = (time) => {
    if (!time) {
      return null;
    }

    // Firebase timestamp를 JavaScript Date 객체로 변환합니다.
    const date = time.toDate();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  };

  const NotIsCheckedID = () => {
    return (
      <>
        <s.InputBox>
          <s.InputTitle>이름</s.InputTitle>
          <s.InputCheck>
            <s.InfoInput
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrorBox('');
              }}
              ref={nameInputRef}
              placeholder="이름을 입력해주세요."
            />
          </s.InputCheck>
        </s.InputBox>
        {errorMsg && errorBox === 'name' && (
          <s.ErrorBox>
            <s.ErrorMark
              src="https://cdn-icons-png.flaticon.com/128/9503/9503179.png"
              alt="경고이미지"
            />
            <s.ErrorMsg>{errorMsg}</s.ErrorMsg>
          </s.ErrorBox>
        )}
        <s.InputBox>
          <s.InputTitle>연락처</s.InputTitle>
          <s.InputCheck>
            <s.InfoInput
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                setErrorBox('');
              }}
              placeholder="'-'없이 숫자만 입력해 주세요"
              ref={phoneNumberInputRef}
            />
          </s.InputCheck>
        </s.InputBox>
        {errorMsg && errorBox === 'phoneNumber' && (
          <s.ErrorBox>
            <s.ErrorMark
              src="https://cdn-icons-png.flaticon.com/128/9503/9503179.png"
              alt="경고이미지"
            />
            <s.ErrorMsg>{errorMsg}</s.ErrorMsg>
          </s.ErrorBox>
        )}
        <s.FindBtn onClick={handleClick}>아이디 찾기</s.FindBtn>
      </>
    );
  };

  const NotIsCheckedPW = () => {
    return (
      <>
        <s.InputBox>
          <s.InputTitle>이름</s.InputTitle>
          <s.InputCheck>
            <s.InfoInput
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrorBox('');
              }}
              ref={nameInputRef}
              placeholder="이름을 입력해주세요."
            />
          </s.InputCheck>
        </s.InputBox>
        {errorMsg && errorBox === 'name' && (
          <s.ErrorBox>
            <s.ErrorMark
              src="https://cdn-icons-png.flaticon.com/128/9503/9503179.png"
              alt="경고이미지"
            />
            <s.ErrorMsg>{errorMsg}</s.ErrorMsg>
          </s.ErrorBox>
        )}
        <s.InputBox>
          <s.InputTitle>아이디</s.InputTitle>
          <s.InputCheck>
            <s.InfoInput
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorBox('');
              }}
              ref={emailInputRef}
              placeholder="아이디를 입력해주세요."
            />
          </s.InputCheck>
        </s.InputBox>
        {errorMsg && errorBox === 'email' && (
          <s.ErrorBox>
            <s.ErrorMark
              src="https://cdn-icons-png.flaticon.com/128/9503/9503179.png"
              alt="경고이미지"
            />
            <s.ErrorMsg>{errorMsg}</s.ErrorMsg>
          </s.ErrorBox>
        )}
        <s.InputBox>
          <s.InputTitle>연락처</s.InputTitle>
          <s.InputCheck>
            <s.InfoInput
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                setErrorBox('');
              }}
              ref={phoneNumberInputRef}
              placeholder="'-'없이 숫자만 입력해 주세요"
            />
          </s.InputCheck>
        </s.InputBox>
        {errorMsg && errorBox === 'phoneNumber' && (
          <s.ErrorBox>
            <s.ErrorMark
              src="https://cdn-icons-png.flaticon.com/128/9503/9503179.png"
              alt="경고이미지"
            />
            <s.ErrorMsg>{errorMsg}</s.ErrorMsg>
          </s.ErrorBox>
        )}
        <s.FindBtn onClick={handleClick}>비밀번호 재설정</s.FindBtn>
      </>
    );
  };

  const IsCheckedID = () => {
    return userData.length > 0 ? (
      <>
        <s.FindedTitle>
          <s.FindedName>{name}</s.FindedName>
          <s.FindedMent>님의 정보와 일치하는 아이디입니다.</s.FindedMent>
        </s.FindedTitle>
        <s.FindedIDs>
          {userData.map((user) => {
            return (
              <s.FindedIdBox>
                <s.FindedID>{user.email}</s.FindedID>
                <s.FindedDate>
                  가입일 : {TimeStampToDate(user.createdAt)}
                </s.FindedDate>
              </s.FindedIdBox>
            );
          })}
        </s.FindedIDs>
        <s.FindedBtnBox>
          <s.FindedBtn
            onClick={() => {
              navigate('/login');
            }}
          >
            로그인하러 가기
          </s.FindedBtn>
          <s.FindedBtn
            style={{
              backgroundColor: ' white',
              color: '#0a58be',
              border: '1px solid #0a58be',
              marginLeft: '20px',
            }}
            onClick={() => {
              setIsFindID(false);
              setIsChecked(false);
              setName('');
              setPhoneNumber('');
              setEmail('');
              setErrorBox('');
              setUserData([]);
            }}
          >
            비밀번호 재설정
          </s.FindedBtn>
        </s.FindedBtnBox>
      </>
    ) : (
      <>
        <s.FindedTitle>
          <s.FindedName>{name}</s.FindedName>
          <s.FindedMent>님의 정보와 일치하는 아이디가 없습니다.</s.FindedMent>
        </s.FindedTitle>
        <s.FindedID />
        <s.FindedBtnBox>
          <s.FindedBtn
            onClick={() => {
              setIsFindID(true);
              setIsChecked(false);
              setName('');
              setPhoneNumber('');
              setEmail('');
              setErrorBox('');
              setUserData([]);
            }}
          >
            뒤로 가기
          </s.FindedBtn>
          <s.FindedBtn
            style={{
              backgroundColor: ' white',
              color: '#0a58be',
              border: '1px solid #0a58be',
              marginLeft: '20px',
            }}
            onClick={() => {
              setIsFindID(false);
              setIsChecked(false);
              setName('');
              setPhoneNumber('');
              setEmail('');
              setErrorBox('');
              setUserData([]);
            }}
          >
            비밀번호 재설정
          </s.FindedBtn>
        </s.FindedBtnBox>
      </>
    );
  };

  const IsCheckedPW = () => {
    return userData.length > 0 ? (
      <>
        <s.FindedTitle>
          <s.FindedName>{name}</s.FindedName>
          <s.FindedMent>님의 메일주소로 메일이 발송되었습니다</s.FindedMent>
        </s.FindedTitle>
        <s.FindedIDs>
          <s.FindedIdBox>
            <s.FindedID>{email}</s.FindedID>
            <s.FindedDate>
              가입일 : {TimeStampToDate(userData.createdAt)}
            </s.FindedDate>
          </s.FindedIdBox>
        </s.FindedIDs>
        <s.FindBtn
          onClick={() => {
            navigate('/login');
          }}
          style={{ marginTop: '0' }}
        >
          확인
        </s.FindBtn>
      </>
    ) : (
      <>
        <s.FindedTitle>
          <s.FindedName>{name}</s.FindedName>
          <s.FindedMent>님의 정보와 일치하는 계정이 없습니다.</s.FindedMent>
        </s.FindedTitle>
        <s.FindedID />
        <s.FindedBtnBox>
          <s.FindedBtn
            onClick={() => {
              setIsFindID(false);
              setIsChecked(false);
              setName('');
              setPhoneNumber('');
              setEmail('');
              setErrorBox('');
              setUserData([]);
            }}
          >
            뒤로가기
          </s.FindedBtn>
          <s.FindedBtn
            style={{
              backgroundColor: ' white',
              color: '#0a58be',
              border: '1px solid #0a58be',
              marginLeft: '20px',
            }}
            onClick={() => {
              setIsFindID(true);
              setIsChecked(false);
              setName('');
              setPhoneNumber('');
              setEmail('');
              setErrorBox('');
              setUserData([]);
            }}
          >
            아이디 찾기
          </s.FindedBtn>
        </s.FindedBtnBox>
      </>
    );
  };

  return (
    <s.FindContainer>
      <s.FindTitle>아이디/비밀번호 찾기</s.FindTitle>
      <s.BtnBox>
        <s.IdBtn
          isid={isFindID.toString()}
          onClick={() => {
            setIsFindID(true);
            setIsChecked(false);
            setName('');
            setPhoneNumber('');
            setErrorBox('');
            setUserData([]);
          }}
          selected={isFindID}
        >
          아이디찾기
        </s.IdBtn>
        <s.PWBtn
          isid={isFindID.toString()}
          onClick={() => {
            setIsFindID(false);
            setIsChecked(false);
            setName('');
            setPhoneNumber('');
            setEmail('');
            setErrorBox('');
            setUserData([]);
          }}
          selected={!isFindID}
        >
          비밀번호 찾기
        </s.PWBtn>
      </s.BtnBox>
      {!isChecked ? (
        isFindID ? (
          <NotIsCheckedID />
        ) : (
          <NotIsCheckedPW />
        )
      ) : isFindID ? (
        <IsCheckedID />
      ) : (
        <IsCheckedPW />
      )}
    </s.FindContainer>
  );
}

export default DownFindIDPW;
