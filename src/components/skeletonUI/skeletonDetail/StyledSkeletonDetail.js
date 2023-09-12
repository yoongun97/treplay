import { styled, keyframes } from "styled-components";

const loading = keyframes`
   0% {
    background-position: -460px 0;
  }
  100% {
    background-position: 460px 0;
  }
`;

export const DetailContainer = styled.div``;

export const DetailContainerInner = styled.div`
  width: 1280px;
  margin: 0 auto;

  & > h2 {
    margin: 140px 0 60px;
    color: transparent;
    text-align: center;
    font-size: 28px;
    font-weight: 700;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    animation: ${loading} 2s infinite linear;
  }
`;
export const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
export const DateContainer = styled.div`
  & > span {
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    color: transparent;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    animation: ${loading} 2s infinite linear;
  }
`;
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
export const ReactButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  & > button {
    width: 24px;
    height: 24px;
    background-color: transparent;
    border: none;
  }
`;

export const ImageBox = styled.div`
  justify-content: center;
  align-items: center;
  width: 1280px;
  height: 700px;
  margin: 20px 0;
  border-radius: 8px;
  background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
  animation: ${loading} 2s infinite linear;
`;

export const ContentsContainer = styled.div`
  position: relative;
  padding-bottom: 40px;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  word-break: keep-all;

  & > p:nth-child(1) {
    font-size: 14px;
    color: transparent;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    animation: ${loading} 2s infinite linear;
  }

  & > p:nth-child(2) {
    margin-top: 20px;
    font-size: 14px;
    color: transparent;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    animation: ${loading} 2s infinite linear;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 1px;
    color: transparent;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    animation: ${loading} 2s infinite linear;
  }
`;

export const MapContainer = styled.div`
  position: relative;
  margin: 80px 0 60px;
  width: 100%;
  height: 460px;
  background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
  animation: ${loading} 2s infinite linear;
`;
