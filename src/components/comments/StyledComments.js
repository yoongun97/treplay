import { styled } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 140px 320px;
  background-color: #f2f8ff;

  & > h4 {
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 30px;
  }
`;
export const CommentInputForm = styled.form`
  width: 100%;
  height: 160px;
  position: relative;

  & > textarea {
    width: 100%;
    height: 160px;
    padding: 16px;
    border: 1px solid #e5e5e5;
    overflow: auto;
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    color: #878d94;
  }

  & > input {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 80px;
    height: 40px;
    border: none;
    background-color: #0a58be;
    font-size: 16px;
    font-weight: 400;
    color: #fff;
    cursor: pointer;
  }
`;
export const CommentsContainer = styled.div`
  position: relative;
  width: 100%;
  background-color: #f2f8ff;

  & > div:nth-child(2n) {
    background-color: #fff;
  }

  & > div::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #e5e5e5;
  }
`;
export const CommentBox = styled.div`
  position: relative;
  display: flex;
  gap: 16px;
  padding: 30px 16px;
  color: #222;
  & > img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: transparent;
    object-fit: cover;
  }
`;
export const TextContainer = styled.div`
  & > p:first-of-type {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 12px;
    color: #222;
  }
  & > p:last-of-type {
    color: #878d94;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
  }
`;
export const EditTextArea = styled.textarea`
  width: calc(100% - 135px);
  height: 100px;
  padding: 10px;
  border: 1px solid #e5e5e5;
  overflow: auto;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: #222;
`;
export const StartEditButtonContainer = styled.div`
  position: absolute;
  top: 30px;
  right: 16px;
  & > button {
    width: 56px;
    height: 28px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
  }
  & > button:first-child {
    margin-right: 10px;
    border: 1px solid #e5e5e5;
    background-color: #fff;
    color: #bfbfbf;
  }
  & > button:last-child {
    border: 1px solid #222;
    background-color: #222;
    color: #fff;
  }
`;
export const FinishEditButtonContainer = styled.div`
  position: absolute;
  top: 30px;
  right: 16px;
  & > button {
    width: 56px;
    height: 28px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
  }
  & > button:first-child {
    margin-right: 10px;
    border: 1px solid #222;
    background-color: #222;
    color: #fff;
  }
  & > button:last-child {
    border: 1px solid #e5e5e5;
    background-color: #fff;
    color: #bfbfbf;
  }
`;
