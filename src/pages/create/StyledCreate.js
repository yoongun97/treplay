import { styled } from "styled-components";
export const CreateContainer = styled.div`
  width: 1000px;
  margin: 0 auto;
  text-align: center;
`;
export const SelectBoxContainer = styled.div`
  margin-top: 140px;
`;

export const StyledTextarea = styled.textarea`
  width: 100%;
  height: 300px;
  margin-top: 40px;
  padding: 16px;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  border: 1px solid #e5e5e5;
  outline: 1px solid #999;
`;
export const StyledInput = styled.input`
  width: 100%;
  height: 60px;
  margin: 20px auto;
  padding: 20px 16px;
  font-size: 16px;
  font-weight: 400;
  border: 1px solid #e5e5e5;
  outline: 1px solid #999;

  & > div {
    width: 200px;
  }
`;
