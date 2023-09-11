import { styled, keyframes } from "styled-components";

const loading = keyframes`
   0% {
    background-position: -460px 0;
  }
  100% {
    background-position: 460px 0;
  }
`;

export const BestPlaceContainer = styled.div`
  max-width: 1920px;
  margin: 140px auto;
  text-align: center;
  & > h2 {
    margin-bottom: 80px;
  }
`;

export const BestPlaceBox = styled.div`
  position: relative;
  height: 420px;
  /* 박스 두 개 겹침 현상 때문에 min-width 설정 */
`;

export const ImageBox = styled.div`
  position: absolute;
  top: 0;
  left: 320px;
  width: 640px;
  height: 420px;
  background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
  animation: ${loading} 2s infinite linear;
`;

export const PhrasesBox = styled.div`
  position: absolute;
  top: 40px;
  right: 320px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 660px;
  height: 340px;
  padding: 46.5px 50px;
  background-color: #f2f8ff;
  text-align: left;
`;
