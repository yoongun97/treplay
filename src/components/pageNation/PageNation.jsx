import React from 'react';
import * as s from './StyledPageNation';

const PageNation = ({ postsViewPage, totalPosts, currentPage, pagenate }) => {
  //총 페이지수 계산
  const totalPages = Math.ceil(totalPosts / postsViewPage);
  const pageNumber = Array.from(
    { length: totalPages },
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
    <>
      <s.Container>
        {currentPage !== 1 ? (
          <s.PrevButton onClick={prevPage}></s.PrevButton>
        ) : (
          <s.DummyButton></s.DummyButton>
        )}
        {totalPages > 0 ? (
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
        {currentPage !== totalPages ? (
          <s.NextButton onClick={nextPage}></s.NextButton>
        ) : (
          <s.DummyButton></s.DummyButton>
        )}
      </s.Container>
      {totalPages > 0 && (
        <s.PageInfo>
          <span>{`총 ${totalPages}페이지 중 ${currentPage}페이지 입니다.`}</span>
        </s.PageInfo>
      )}
    </>
  );
};

export default PageNation;
