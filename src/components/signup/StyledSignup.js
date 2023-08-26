import styled, { css } from "styled-components";

export const SignupContainer = styled.div`
  margin: 240px auto auto auto;
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SignupTitle = styled.h2`
  color: black;
`;

export const ProfileImgBox = styled.div`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  margin: 60px auto 60px auto;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #0a58be;
  position: relative;
`;

export const ProfileImg = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
`;

export const ProfileImgBtn = styled.div`
  position: absolute;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f1f1f1;
  margin: 90px 0 0 110px;
  cursor: pointer;
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
      &:hover {
        opacity: 0.6;
      }
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
  color: #e02918;
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
  background-color: #f6faff;
  margin-bottom: 16px;
`;

export const AgreementCheckBox = styled.input`
  width: 20px;
  height: 20px;
  margin: 3px 12px 3px 16px;
`;

export const AgreementTitle = styled.p`
  margin-top: 13px;
  margin-bottom: 13px;
  font-size: 18px;
  font-weight: 600;
`;

export const AgreementBox = styled.div`
  width: 500px;
  height: 144px;
  margin-bottom: 12px;
`;

export const AgreementSubtitleBox = styled.div`
  width: 210px;
  height: 26px;
  display: flex;
  margin-bottom: 8px;
`;

export const AgreementSubtitle = styled.p`
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
  border: 1px solid #e5e5e5;
`;

export const AgreementContent = styled.p`
  height: 100%;
  width: 100%;
  font-size: 12px;
  color: #d9d9d9;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 3px; /* 스크롤바의 너비 */
  }
  &::-webkit-scrollbar-thumb {
    background-color: #d9d9d9; /* 스크롤바의 색상 */
  }
  &: hover {
    color: #777777;
  }
`;

export const SignupBtn = styled.button`
  width: 500px;
  height: 60px;
  margin-top: 60px;
  border: none;
  border-radius: 30px;
  background-color: #0a58be;
  color: white;
  font-size: 18px;
  font-weight: 600;
`;
