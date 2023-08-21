import React from 'react';

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
    <div>
      <nav>
        <div>
          <button onClick={prevPage}>이전</button>
          {pageNumber.length > 0 ? (
            <>
              {pageNumber.map((number) => (
                <button
                  key={number}
                  onClick={() => pagenate(number)}
                  className={currentPage === number ? 'active' : ''}
                >
                  {number}
                </button>
              ))}
            </>
          ) : null}
          <button onClick={nextPage}>다음</button>
        </div>
      </nav>
    </div>
  );
};

export default PageNation;
