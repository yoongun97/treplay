import { styled, css } from "styled-components";

export const FindContainer = styled.div`
  width: 500px;
  margin: 140px auto 185px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FindTitle = styled.h2`
  color: black;
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 30px;
`;

export const BtnBox = styled.div`
  display: flex;
  margin-bottom: 60px;
  width: 280px;
  height: 44px;
`;

export const IdBtn = styled.button`
  width: 280px;
  height: 44px;
  border: none;
  border-top-left-radius: 60px;
  border-bottom-left-radius: 60px;
  color: ${(props) => (props.isid === "true" ? "#ffffff" : "#878d94")};
  background-color: ${(props) =>
    props.isid === "true" ? "#0a58be" : "#e4e8e9"};
`;

export const PWBtn = styled.button`
  width: 280px;
  height: 44px;
  border: none;
  border-top-right-radius: 60px;
  border-bottom-right-radius: 60px;
  color: ${(props) => (props.isid === "false" ? "#ffffff" : "#878d94")};
  background-color: ${(props) =>
    props.isid === "false" ? "#0a58be" : "#e4e8e9"};
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
    `}
`;

export const FindBtn = styled.button`
  width: 500px;
  height: 60px;
  margin-top: 34px;
  margin-bottom: 60px;
  border: none;
  border-radius: 30px;
  background-color: #0a58be;
  color: white;
  font-size: 18px;
  font-weight: 600;
`;

export const FindedTitle = styled.div`
  height: 22px;
  margin-bottom: 40px;
`;

export const FindedName = styled.span`
  font-size: 18px;
  font-weight: 600;
`;

export const FindedMent = styled.span`
  font-size: 16px;
`;

export const FindedID = styled.p`
  width: 500px;
  /* height: 100px; */
  background-color: #f1f1f1;
  line-height: 100px;
  text-align: center;
  font-size: 18px;
  margin-bottom: 60px;
`;

export const FindedBtnBox = styled.div`
  width: 500px;
  height: 60px;
  margin-bottom: 205px;
`;

export const FindedBtn = styled.button`
  width: 240px;
  height: 60px;
  border: none;
  border-radius: 30px;
  background-color: #0a58be;
  color: white;
  font-size: 18px;
  font-weight: 600;
`;

export const ErrorBox = styled.div`
  width: 500px;
  height: 44px;
  /* margin-top: -59px;
  margin-bottom: 49px; */
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
