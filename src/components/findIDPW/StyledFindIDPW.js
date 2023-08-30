import { styled, css } from "styled-components";

export const FindContainer = styled.div`
  width: 500px;
  height: 485px;
  margin: 140px auto 185px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FindTitle = styled.h2`
  color: black;
  font-size: 32px;
  font-weight: 600;
`;

export const BtnBox = styled.div`
  display: flex;
`;

export const IdBtn = styled.button``;

export const PWBtn = styled.button``;

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
    `}
`;

export const FindBtn = styled.button`
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
