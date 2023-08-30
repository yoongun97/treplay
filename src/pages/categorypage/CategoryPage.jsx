import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import PageNation from '../../components/pageNation/PageNation';
import CategoryLikes from './CategoryLikes';
import { useAtom } from 'jotai';
import { userAtom } from '../../store/userAtom';
import { styled } from 'styled-components';
import Search from '../../components/search/Search';

function CategoryPage() {
  const [user] = useAtom(userAtom);
  const { nation, category } = useParams();
  const [filteredPosts, setFilteredPosts] = useState([]);
  //페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const postsViewPage = 3; // 한 페이지에 보여줄 게시물 수
  //또가요 , 북마크 , 최신순 정렬하기
  const [sortOption, setSortOption] = useState('likes');

  const handleSortOption = (newSortOption) => {
    setSortOption(newSortOption);
  };

  const handleSearch = (searchData) => {
    const searchResults = posts.filter((post) =>
      post.placeName
        .replace(' ', '')
        .toLowerCase()
        .includes(searchData.toLowerCase().replace(' ', ''))
    );
    setFilteredPosts(searchResults);
    setCurrentPage(1); // 이곳에서 문제인가요? 검색 결과가 없을시 초기 화면으로 가는데 이걸 아래쪽에서 어떻게 하는지
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
      postsData.push({
        ...doc.data(),
        id: doc.id,
      });
    });

    const sortedPosts = sortPosts(postsData);

    return sortedPosts;
  };

  //또가요 , 북마크 , 최신순 정렬하기
  const sortPosts = (posts) => {
    if (sortOption === 'likes') {
      return posts.sort((a, b) => b.likes - a.likes);
    } else if (sortOption === 'saved') {
      return posts.sort((a, b) => b.saved - a.saved);
    } else if (sortOption === 'newDate') {
      return posts.sort((a, b) => b.newDate - a.newDate);
    }
    console.log(posts);
    return posts;
  };

  const {
    data: posts,
    error,
    isLoading,
  } = useQuery(['posts', category, sortOption], fetchPosts);

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
    <CategoryPageContainer>
      <PhrasesContainer>
        <h2>{category}</h2>
        <h3>우리 동네 베스트 추천 장소</h3>
        <Search onSearch={handleSearch} />
      </PhrasesContainer>

      {!!user ? (
        <WriteButtonContainer>
          <Link to={`/create`}>글쓰기</Link>
        </WriteButtonContainer>
      ) : (
        <></>
      )}
      {/* //수정 */}
      <PostsContainer>
        {(filteredPosts.length > 0 ? filteredPosts : currentPosts)
          .slice(0, 3) // 빈 문자열 조회시 갯수 상관없이 보여줘서 3개로 우선 자르기
          .map((post) => (
            <div key={post.id}>
              <PostBox to={`/detail/${post.id}`}>
                <ImageBox alt="PostImgs" src={post.postImgs} />
                <h4>{post.placeName}</h4>
                <CategoryLikes id={post.id} />
              </PostBox>
            </div>
          ))}
        {((filteredPosts.length === 0 && currentPosts.length === 0) ||
          currentPosts.length === 0) && <div>결과가 없습니다.</div>}
      </PostsContainer>
      <PageNation
        postsViewPage={postsViewPage}
        totalPosts={
          filteredPosts.length > 0 ? filteredPosts.length : posts.length
        }
        currentPage={currentPage}
        pagenate={setCurrentPage} // 현재 페이지 업데이트 함수 전달
      />
    </CategoryPageContainer>
  );
}

export default CategoryPage;

const CategoryPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1280px;
  margin: 180px auto 140px;
  text-align: center;
`;

const PhrasesContainer = styled.div`
  margin: 0 auto;

  & > h2 {
    font-size: 28px;
    font-weight: 600;
  }

  & > h3 {
    margin: 20px 0 60px;
    font-size: 24px;
    font-weight: 500;
    color: #222;
  }
`;

const WriteButtonContainer = styled.div`
  align-self: flex-end;
  text-align: center;
  margin-bottom: 30px;
`;

const PostsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 70px;
  row-gap: 80px;
  width: 1280px;
`;
const PostBox = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 380px;
  height: 480px;

  & > h4 {
    margin: 20px 0 16px;
    font-size: 16px;
    font-weight: 500;
    color: #222;
  }
`;

const ImageBox = styled.img`
  width: 380px;
  height: 380px;
  object-fit: cover;
`;
