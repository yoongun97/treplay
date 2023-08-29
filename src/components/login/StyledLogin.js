import { styled } from "styled-components";
export const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 90px);
`;
export const LoginContainer = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const EmailLoginBox = styled.div``;

export const LoginTitle = styled.h2`
  color: black;
  font-size: 32px;
  font-weight: 600;
  text-align: center;
`;

export const InputForm = styled.form`
  width: 500px;
  height: 260px;
  margin-top: 60px;
  margin-bottom: 96px;
`;

export const InputBox = styled.div`
  width: 500px;
  height: 60px;
  border-radius: 60px;
  border: 1px solid #e5e5e5;
  margin-bottom: 14px;
`;

export const InfoInput = styled.input`
  margin: 19px 18px 19px 18px;
  font-size: 14px;
  width: 464px;
  height: 22px;
  border: none;
  outline: none;
  background-color: transparent;
`;

export const BtnBox = styled.div`
  height: 26px;
  margin: 20px auto 20px auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NaviBtn = styled.span`
  height: 18px;
  font-size: 14px;
  padding-left: 8px;
  padding-right: 8px;
  cursor: pointer;

  &:nth-child(2) {
    position: relative;
  }
  &:nth-child(2)::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    width: 1px;
    height: 12px;
    background-color: #222;
    transform: translateY(-50%);
  }
  &:nth-child(2)::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 0;
    width: 1px;
    height: 12px;
    background-color: #222;
    transform: translateY(-50%);
  }
`;

export const LoginBtn = styled.button`
  width: 500px;
  height: 60px;
  border: none;
  border-radius: 60px;
  background-color: #0a58be;
  color: white;
  font-size: 18px;
  font-weight: 600;
`;

export const SnsLoginContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;

  &::after {
    content: "";
    position: absolute;
    top: 11px;
    width: 100%;
    height: 1px;
    transform: translateY(-50%);
    background-color: #d9d9d9;
    z-index: 1;
  }
`;

export const SnsLoginTitle = styled.div`
  padding: 0 20px;
  margin-bottom: 26px;
  background-color: #fff;
  z-index: 10;

  & > span {
    color: #777777;
    text-align: center;
    font-size: 12px;
    font-weight: 400;
    line-height: 22px;
  }
`;

export const SnsContainer = styled.div`
  display: flex;
  gap: 40px;
`;

export const SnsBtn = styled.div`
  text-align: center;
`;

export const SnsImg = styled.img`
  width: 30px;
  height: 30px;
`;

export const SnsMent = styled.p`
  line-height: 22px;
  font-size: 11px;
  font-weight: 400;
`;
