import React from "react";
import { styled } from "styled-components";

const PageNation = ({ postsViewPage, totalPosts, currentPage, pagenate }) => {
  const pageNumber = [];
  //총 페이지수 계산
  for (let i = 1; i <= Math.ceil(totalPosts / postsViewPage); i++) {
    pageNumber.push(i);
  }
  //이전 버튼
  const prevPage = () => {
    if (currentPage > 1) {
      pagenate(currentPage - 1);
    }
  };
  //다음 버튼
  const nextPage = () => {
    if (currentPage < pageNumber.length) {
      pagenate(currentPage + 1);
    }
  };

  return (
    <Container>
      <PrevButton onClick={prevPage}></PrevButton>
      {pageNumber.length > 0 ? (
        <PageNumberContianer>
          {pageNumber.map((number) => (
            <PageNumberButton
              key={number}
              onClick={() => pagenate(number)}
              className={currentPage === number ? "active" : ""}
            >
              {number}
            </PageNumberButton>
          ))}
        </PageNumberContianer>
      ) : null}
      <NextButton onClick={nextPage}></NextButton>
    </Container>
  );
};

export default PageNation;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 80px;
`;

const PrevButton = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 16px;
  background: url(${process.env.PUBLIC_URL}/icon/left_arrow_gray.svg) no-repeat
    center / 100%;
  cursor: pointer;
`;
const NextButton = styled.div`
  width: 24px;
  height: 24px;
  margin-left: 16px;
  background: url(${process.env.PUBLIC_URL}/icon/right_arrow_gray.svg) no-repeat
    center / 100%;
  cursor: pointer;
`;

const PageNumberContianer = styled.div`
  display: flex;
  gap: 6px;
`;

const PageNumberButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 22px;
  height: 22px;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;

  &.active {
    border-radius: 50%;
    color: #fff;
    background-color: #0a58be;
  }
`;
