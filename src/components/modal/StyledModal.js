import { styled, css } from "styled-components";

export const CheckModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  border: 1px solid black;
  border-radius: 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 3;
`;

export const CloseBtn = styled.div`
  width: 24px;
  height: 24px;
  background-color: transparent;
  margin: 10px 10px 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const CloseImg = styled.img`
  width: 17px;
  height: 17px;
`;

export const ModalTitle = styled.p`
  width: 74px;
  height: 24px;
  font-size: 20px;
  font-weight: 600;
  margin-top: 26px;
  margin-bottom: 40px;
`;

export const ModalInputCheck = styled.div`
  width: 500px;
  height: 44px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #bfbfbf;
`;

export const ModalInput = styled.input`
  font-size: 14px;
  width: 70%;
  height: 22px;
  margin: 10px auto 10px 16px;
  border: none;
  outline: none;
  background-color: transparent;
`;

export const ModalCheckBtn = styled.button`
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

export const ModalErrorBox = styled.div`
  width: 500px;
  height: 40px;
  margin-top: 0px;
  margin-bottom: 30px;
  display: flex;
`;
export const ModalErrorMark = styled.img`
  width: 16px;
  height: 16px;
  margin: 12px 5px 12px 10px;
`;

export const ModalErrorMsg = styled.p`
  width: 150px;
  height: 22px;
  /* color: #e02918; */
  color: #0a58be;
  font-size: 12px;
  line-height: 22px;
  margin-top: 9px;
  margin-bottom: 9px;
`;

export const SuccessBtn = styled.button`
  width: 500px;
  height: 60px;
  border: none;
  border-radius: 30px;
  background-color: #0a58be;
  margin-bottom: 60px;
  color: white;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
`;
