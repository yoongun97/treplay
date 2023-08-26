import React from "react";
import * as m from "./StyledModal";

function Modal({
  email,
  setEmail,
  nickname,
  setNickname,
  toCheck,
  setIsModalOpen,
}) {
  // const [isUsedNickname, setIsUsedNickname] = useState(false);

  // if (isUsedNickname === true) {
  //   alert(
  //     "중복된 닉네임은 사용할 수 없습니다. 다른 닉네임을 입력해 주세요."
  //   );
  //   return;
  // }

  // const nicknameCheckHandler = async (e) => {
  //   e.preventDefault();
  //   try {
  //     if (!!nickname === false) {
  //       return alert("닉네임을 입력해 주세요");
  //     }
  //     const q = query(collection(db, "users"));
  //     const querySnapshot = await getDocs(q);
  //     const data = querySnapshot.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }));

  //     const usedNickname = data.filter((item) => item.nickname === nickname);

  //     if (usedNickname.length > 0) {
  //       setIsUsedNickname(true);
  //       return alert(
  //         "이미 사용 중인 닉네임입니다. 다른 닉네임을 사용해 주세요."
  //       );
  //     } else if (usedNickname.length === 0) {
  //       setIsUsedNickname(false);
  //       return alert("사용 가능한 닉네임입니다!");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <m.CheckModal>
      <m.CloseBtn
        onClick={() => {
          setIsModalOpen(false);
        }}
      >
        <m.CloseImg
          src="https://cdn-icons-png.flaticon.com/128/2089/2089733.png"
          alt="닫기버튼"
        />
      </m.CloseBtn>
      <m.ModalTitle>중복 확인</m.ModalTitle>
      <m.ModalInputCheck>
        {toCheck === "이메일" ? (
          <m.ModalInput
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="이메일을 입력해주세요"
          ></m.ModalInput>
        ) : (
          <m.ModalInput
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
            }}
            placeholder="닉네임을 입력해주세요"
          ></m.ModalInput>
        )}
        <m.ModalCheckBtn>중복확인</m.ModalCheckBtn>
      </m.ModalInputCheck>
      {/* <m.ModalErrorBox>
        <m.ModalErrorMark
          src="https://cdn-icons-png.flaticon.com/128/9503/9503179.png"
          alt="경고이미지"
        />
        <m.ModalErrorMsg>{`이미 사용중인 ${toCheck} 입니다.`}</m.ModalErrorMsg>
      </m.ModalErrorBox> */}
      <m.ModalErrorBox>
        <m.ModalErrorMark
          src="https://cdn-icons-png.flaticon.com/128/992/992481.png"
          alt="가능이미지"
        />
        <m.ModalErrorMsg>{`사용 가능한 ${toCheck} 입니다.`}</m.ModalErrorMsg>
      </m.ModalErrorBox>
      <m.SuccessBtn>사용하기</m.SuccessBtn>
    </m.CheckModal>
  );
}

export default Modal;
