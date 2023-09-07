import { styled } from "styled-components";
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
  font-weight: 600;
  line-height: 60px;
  text-align: center;
  cursor: pointer;
`;
