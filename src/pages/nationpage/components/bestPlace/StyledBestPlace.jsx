import { styled } from "styled-components";
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
  background-image: url(${(props) => props.$imageurl});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
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

  & > h4 {
    margin-bottom: 12px;
    color: #222;
    font-size: 22px;
    font-weight: 600;
    line-height: 36px;
  }

  & > div {
    flex-grow: 1;
    color: #777777;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;

    & > span {
      overflow: hidden;
      white-space: normal;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 6;
      -webkit-box-orient: vertical;
      word-break: keep-all;
    }
  }
`;
