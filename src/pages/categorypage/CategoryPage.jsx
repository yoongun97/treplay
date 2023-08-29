import React, { useState } from 'react';
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
  // const [search, setSearch] = useState('');

  //페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const postsViewPage = 5; // 한 페이지에 보여줄 게시물 수

  // const handleSearchInputChange = (e) => {
  //   setSearch(e.target.value);
  // };

  // const handleSearchInputKeyDown = (e) => {
  //   if (e.key === 'Enter') {
  //     setSearch(e.currentTarget.value);
  //   }
  // };

  const handleSearch = (searchQuery) => {
    const searchResults = posts.filter((post) =>
      post.placeName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setCurrentPage(1);
    setFilteredPosts(searchResults);
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

    return postsData;
  };

  const {
    data: posts,
    error,
    isLoading,
  } = useQuery(['posts', category], fetchPosts);

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
  //또가요 안가요 보여주기

  return (
    <CategoryPageContainer>
      <PhrasesContainer>
        <h2>{category}</h2>
        <h3>우리 동네 베스트 추천 장소</h3>
        {/* <SearchBox>
          <input
            placeholder="찾으시는 장소를 검색해주세요"
            value={search}
            onChange={handleSearchInputChange}
            onKeyDown={handleSearchInputKeyDown}
          />
          <div>
            <div></div>
          </div>
        </SearchBox> */}
        <Search onSearch={handleSearch} />
      </PhrasesContainer>
      {!!user ? (
        <WriteButtonContainer>
          <Link to={`/create`}>글쓰기</Link>
        </WriteButtonContainer>
      ) : (
        <></>
      )}
      {/* <PostsContainer>
        {currentPosts.map((post) => (
          //style 가로로 3개만 보여주기
          <div>
            <PostBox to={`/detail/${post.id}`}>
              <ImageBox alt="PostImgs" src={post.postImgs} />
              <h4>{post.placeName}</h4>
              <CategoryLikes id={post.id} />
            </PostBox>
          </div>
        ))}
      </PostsContainer> */}
      {/* //수정 */}
      <PostsContainer>
        {(filteredPosts.length > 0 ? filteredPosts : currentPosts).map(
          (post) => (
            <div key={post.id}>
              <PostBox to={`/detail/${post.id}`}>
                <ImageBox alt="PostImgs" src={post.postImgs} />
                <h4>{post.placeName}</h4>
                <CategoryLikes id={post.id} />
              </PostBox>
            </div>
          )
        )}
      </PostsContainer>
      <PageNation
        postsViewPage={postsViewPage}
        // totalPosts={posts.length}
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
  margin: 60px 0 30px;
`;
// const SearchBox = styled(Link)`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   width: 580px;
//   height: 60px;
//   padding-left: 20px;
//   border: 1px solid #0a58be;
//   border-radius: 30px;

//   & > input {
//     outline: none;
//     border: none;
//     font-size: 16px;
//     font-weight: 400;
//     color: #222;
//     width: 480px;
//     height: 100%;
//     background: transparent;
//   }

//   & > div {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     width: 60px;
//     height: 60px;
//     border-radius: 24px;
//     background-color: #0a58be;
//   }
//   & > div > div {
//     width: 24px;
//     height: 24px;
//     background-image: url(icon/search_icon.svg);
//   }
// `;

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
