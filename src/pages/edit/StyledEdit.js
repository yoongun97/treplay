import styled from "styled-components";

export const EditContainer = styled.div`
  width: 100%;
  text-align: center;
`;
export const EditContainerInner = styled.div`
  display: flex;
  flex-direction: column;
  width: 1000px;
  max-width: 1000px;
  margin: 0 auto;

  & > h2 {
    margin-top: 40px;
  }
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
`;
export const FileContainer = styled.div`
  margin: 80px 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export const TextContainer = styled.div`
  text-align: left;
  & > h4 {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 20px;
  }

  & > p {
    font-size: 18px;
    font-weight: 400;
    line-height: 20px;
    color: #bfbfbf;
  }
`;
export const StyledLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 120px;
  height: 46px;
  border-radius: 8px;
  background-color: #0a58be;
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  & > span:first-child {
    width: 20px;
    height: 20px;
  }
  & > input {
    display: none;
  }
`;
export const FileInputBox = styled.input`
  margin: 20px auto;
`;

export const PreviewImagesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 120px);
  gap: 12px;
`;
export const ImageBox = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 8px;
  background-color: #cdcdcd;

  & > img {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    object-fit: cover;
  }

  & > button {
    position: absolute;
    top: -4px;
    right: -4px;
    width: 18px;
    height: 18px;
    margin: 10px;
    border: none;
    outline: none;
    background-color: none;
    background: url(${process.env.PUBLIC_URL}/icon/delete_icon.svg) no-repeat
      center / 100%;
  }
`;
export const SubmitButton = styled.div`
  width: 500px;
  height: 60px;
  margin: 140px auto;
  border-radius: 60px;
  background-color: #0a58be;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  line-height: 60px;
  cursor: pointer;
`;
