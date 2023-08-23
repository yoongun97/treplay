import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import PageNation from '../../components/pageNation/PageNation';

function CategoryPage() {
  const [search, setSearch] = useState('');
  const { nation, category } = useParams();
  //페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const postsViewPage = 5; // 한 페이지에 보여줄 게시물 수

  const handleSearchInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSearch(e.currentTarget.value);
    }
  };

  const fetchPosts = async () => {
    const postsCollection = query(
      collection(db, 'posts'),
      where('nation', '==', nation),
      where('category', '==', category)
    );

    const querySnapshot = await getDocs(postsCollection);

    const postsData = [];
    querySnapshot.forEach((doc) => {
      postsData.push({ ...doc.data(), id: doc.id });
    });

    return postsData;
  };

  const { data: posts, error, isLoading } = useQuery('posts', fetchPosts);

  if (error) {
    console.error('데이터를 가져올 수 없습니다', error);
    return alert('데이터를 가져올 수 없습니다');
  }

  if (isLoading) {
    return '정보를 가져오고 있습니다.';
  }
  //페이지 네이션
  const indexOfLastPost = currentPage * postsViewPage;
  const indexOfFirstPost = indexOfLastPost - postsViewPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div>
      <div>
        <div>
          <div>
            추천하고 싶은 {nation}의 {category}가 있나요?
          </div>
          <input
            placeholder="찾으시는 장소를 검색해주세요"
            value={search}
            onChange={handleSearchInputChange}
            onKeyDown={handleSearchInputKeyDown}
          />
          <br />
        </div>
      </div>
      <Link to={`/create`}>글 작성하기</Link>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {currentPosts.map((post) => (
          <div key={post.id}>
            <Link
              to={`/detail/${post.id}`}
              style={{
                display: 'flex',
                width: '300px',
                height: '100px',
                margin: '20px',
                border: '1px solid black',
                textDecoration: 'none',
                color: 'black',
              }}
            >
              {post.author} <br />
              {post.placeName} <br />
              {post.postContent} <br />
              {post.placeLocation} <br />
            </Link>
          </div>
        ))}
      </div>
      <PageNation
        postsViewPage={postsViewPage}
        totalPosts={posts.length}
        currentPage={currentPage}
        pagenate={setCurrentPage} // 현재 페이지 업데이트 함수 전달
      />
    </div>
  );
}

export default CategoryPage;
