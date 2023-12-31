import styled, { css } from "styled-components";

export const Overlay = styled.div`
  ${({ ismodalopen }) =>
    ismodalopen &&
    `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* 반투명한 검정 배경색 */
    z-index: 2;
  `}
`;

export const SignupContainer = styled.div`
  margin: 150px auto auto auto;
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SignupTitle = styled.h2`
  color: black;
  font-size: 32px;
  font-weight: 600;
`;

export const ProfileImgBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 140px;
  margin: 60px auto;
  border-radius: 50%;
  border: 3px solid #0a58be;
  background-color: transparent;
`;

export const ProfileImg = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
`;

export const ProfileImgBtn = styled.div`
  position: absolute;
  bottom: 14px;
  right: -6px;
  display: flex;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #f1f1f1;
  cursor: pointer;

  & > label {
    position: relative;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    cursor: pointer;
  }

  & > label::after {
    content: "";
    position: absolute;
    top: 25%;
    right: 25%;
    display: block;
    width: 20px;
    height: 20px;
    background: url(${process.env.PUBLIC_URL}/icon/camera_icon_black.svg)
      no-repeat;
  }

  & > label > input {
    display: none;
    z-index: 20;
  }
`;

export const ProfileEditImg = styled.img`
  width: 20px;
  height: 20px;
`;

export const InputBox = styled.div`
  width: 500px;
  height: 76px;
  margin-bottom: 26px;
  border-bottom: 1px solid #bfbfbf;
`;

export const InputTitle = styled.p`
  font-size: 16px;
  height: 22px;
  margin-left: 16px;
  margin-bottom: 12px;
  font-weight: 500;
`;

export const InputCheck = styled.div`
  width: 500px;
  height: 42px;
  display: flex;
  justify-content: space-between;
`;

export const InfoInput = styled.input`
  font-size: 14px;
  width: 70%;
  height: 22px;
  margin: 10px auto 10px 16px;
  border: none;
  outline: none;
  background-color: transparent;
  &::placeholder {
    color: #bfbfbf;
  }
`;

export const CheckBtn = styled.button`
  width: 80px;
  height: 32px;
  border-radius: 18px;
  background-color: transparent;
  font-size: 12px;
  border: 1px solid;
  ${(props) =>
    !props.disabled &&
    css`
      border: 1px solid #0a58be;
      color: #0a58be;
      cursor: pointer;
    `}
`;

export const ErrorBox = styled.div`
  width: 500px;
  height: 44px;
  margin-top: -22px;
  margin-bottom: 26px;
  display: flex;
`;
export const ErrorMark = styled.img`
  width: 16px;
  height: 16px;
  margin: 14px 5px 14px 10px;
`;

export const ErrorMsg = styled.p`
  width: 459px;
  height: 22px;
  color: ${(props) => (props.error === "false" ? "#0a58be" : "#e02918")};
  font-size: 12px;
  line-height: 22px;
  margin-top: 11px;
  margin-bottom: 11px;
`;

export const AgreementContainer = styled.div`
  margin-top: 60px;
`;

export const AgreementTitleBox = styled.div`
  width: 500px;
  height: 48px;
  display: flex;
  align-items: center;
  background-color: #f6faff;
  margin-bottom: 16px;
`;

export const AgreementTitle = styled.p`
  margin-top: 13px;
  margin-bottom: 13px;
  font-size: 18px;
  font-weight: 600;
`;
export const AgreementCheckBox = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  margin: 3px 12px 3px 16px;
  background: ${(props) =>
    props.checked
      ? `url(${process.env.PUBLIC_URL}/icon/check_black.svg) no-repeat center / cover`
      : `url(${process.env.PUBLIC_URL}/icon/check_white.svg) no-repeat center / cover`};
`;

export const AgreementBox = styled.div`
  width: 500px;
  height: 144px;
  margin-bottom: 12px;
`;

export const AgreementSubtitleBox = styled.div`
  height: 26px;
  display: flex;
  margin-bottom: 8px;
`;

export const AgreementSubtitle = styled.span`
  widht: 99px;
  height: 26px;
  font-weight: 500;
  font-size: 16px;
  line-height: 26px;
`;

export const AgreementContentBox = styled.div`
  width: 500px;
  height: 110px;
  padding: 16px;
  padding-right: 5px;
  border: 1px solid #e5e5e5;
`;

export const AgreementContent = styled.p`
  height: 100%;
  width: 100%;
  font-size: 12px;
  color: #777777;
  overflow-y: scroll;
  padding-right: 15px;
  &::-webkit-scrollbar {
    width: 2px; /* 스크롤바의 너비 */
  }
  &::-webkit-scrollbar-thumb {
    background-color: #d9d9d9; /* 스크롤바의 색상 */
    border-radius: 30px;
  }
`;

export const SignupBtn = styled.button`
  width: 500px;
  height: 60px;
  margin-top: 60px;
  margin-bottom: 60px;
  border: none;
  border-radius: 30px;
  background-color: #0a58be;
  color: white;
  font-size: 18px;
  font-weight: 600;
`;
