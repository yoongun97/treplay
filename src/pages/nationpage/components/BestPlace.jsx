import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const BestPlace = () => {
  return (
    <BestPlaceContainer>
      <h2>베스트 또갈집</h2>
      <BestPlaceBox>
        <ImageBox>이미지</ImageBox>
        <PhrasesBox>
          <h4>[맛집] 부평 우와</h4>
          <div>
            <span>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi
              libero totam cupiditate suscipit, nesciunt consequatur deleniti
              incidunt alias dolorum ullam recusandae reiciendis sed temporibus
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero
              officiis eos officia, maiores voluptatibus, id neque ut earum
              dolor illo quisquam necessitatibus perspiciatis quibusdam
              repellat, soluta ratione provident ex quae? Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Excepturi, eius facere, libero
              neque eligendi quam asperiores eos nulla ad veritatis deleniti.
              Incidunt odio voluptatum labore vel eligendi veritatis
              necessitatibus laborum.
            </span>
          </div>
          <MoreInfoButton>
            <span>더 알아보기</span>
            <div></div>
          </MoreInfoButton>
        </PhrasesBox>
      </BestPlaceBox>
    </BestPlaceContainer>
  );
};

export default BestPlace;

const BestPlaceContainer = styled.div`
  max-width: 1920px;
  margin: 140px auto;
  text-align: center;
  & > h2 {
    margin-bottom: 80px;
  }
`;

const BestPlaceBox = styled.div`
  position: relative;
  height: 420px;
  /* 박스 두 개 겹침 현상 때문에 min-width 설정 */
`;

const ImageBox = styled.div`
  position: absolute;
  top: 0;
  left: 320px;
  width: 640px;
  height: 420px;
  background-color: #999;
`;

const PhrasesBox = styled.div`
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
    font-weight: 500;
  }

  & > div {
    flex-grow: 1;
    color: #777777;
    font-size: 16px;
    font-weight: 300;
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

const MoreInfoButton = styled.button`
  display: flex;

  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 180px;
  height: 52px;
  border-radius: 60px;
  border: 1px solid #0a58be;
  background-color: #fff;
  color: #0a58be;
  font-size: 18px;
  font-weight: 400;
  transition: 0.3s;

  &:hover {
    background-color: #0a58be;
    color: #fff;
  }

  & > div {
    width: 24px;
    height: 24px;
    background-image: url("icon/right_arrow_blue.svg");
    transition: 0.3s;
  }

  &:hover > div {
    background-image: url("icon/right_arrow_white.svg");
  }
`;
