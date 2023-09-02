import React from 'react';
import * as s from './StyledPageNation';

const PageNation = ({ postsViewPage, totalPosts, currentPage, pagenate }) => {
  //총 페이지수 계산
  const pageNumber = Array.from(
    { length: Math.ceil(totalPosts / postsViewPage) },
    (_, index) => index + 1
  );
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
    <s.Container>
      <s.PrevButton onClick={prevPage}></s.PrevButton>
      {pageNumber.length > 0 ? (
        <s.PageNumberContianer>
          {pageNumber.map((number) => (
            <s.PageNumberButton
              key={number}
              onClick={() => pagenate(number)}
              className={currentPage === number ? 'active' : ''}
            >
              {number}
            </s.PageNumberButton>
          ))}
        </s.PageNumberContianer>
      ) : null}
      <s.NextButton onClick={nextPage}></s.NextButton>
    </s.Container>
  );
};

export default PageNation;
