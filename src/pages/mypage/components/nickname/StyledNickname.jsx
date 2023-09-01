import { styled } from "styled-components";
export const NickNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > p {
    margin-top: 16px;
    color: #777;
    font-size: 14px;
    font-weight: 300;
  }
`;
export const NickNameContainerInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 40px;
  border-radius: 60px;
  border: 1px solid #0a58be;
  background-color: #fff;
  & > input {
    width: 120px;
    height: 22px;
    border: none;
    outline: none;
    background-color: #fff;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
  }
`;
export const AbledInput = styled.input`
  color: #999;
`;
export const DisabledInput = styled.input`
  color: #0a58be;
  text-align: center;
`;

export const EditButton = styled.button`
  width: 20px;
  height: 20px;
  margin-left: 10px;
  border: none;
  background: url(${process.env.PUBLIC_URL}/icon/write_icon_blue.svg) no-repeat
    center / 100%;
`;
