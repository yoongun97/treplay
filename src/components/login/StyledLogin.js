import { styled } from "styled-components";

export const LoginContainer = styled.div`
  margin: 150px auto auto auto;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  height: 100px;
`;

export const SnsLoginTitle = styled.span`
  height: 22px;
  text-align: center;
  font-size: 12px;
  color: #777777;
  margin-bottom: 26px;
`;

export const SnsContainer = styled.div`
  display: flex;
  height: 52px;
`;

export const SnsBtn = styled.div`
  height: 52px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

export const SnsImg = styled.img`
  width: 30px;
  height: 30px;
`;

export const SnsMent = styled.p`
  height: 22px;
  font-size: 11px;
  margin-left: 20px;
  margin-right: 20px;
`;
