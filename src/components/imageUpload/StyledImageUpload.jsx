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
export const NoImageBox = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  /* border: 1px dashed #e6e6e6; */
  color: #bfbfbf;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%23E6E6E6FF' stroke-width='2' stroke-dasharray='6%2c 6' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e");
  border-radius: 8px;
  border-radius: 8px;
  cursor: pointer;
  & > input {
    display: none;
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
