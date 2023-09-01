import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import PageNation from '../../components/pageNation/PageNation';
import CategoryLikes from './CategoryLikes';
import { useAtom } from 'jotai';
import { userAtom } from '../../store/userAtom';
import { styled } from 'styled-components';
import Search from '../../components/search/Search';
import TopButton from '../../common/TopButton';

function CategoryPage() {
  const [user] = useAtom(userAtom);
  const { nation, category } = useParams();
  const [filteredPosts, setFilteredPosts] = useState([]);
  //페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  // const postsViewPage = 3; // 한 페이지에 보여줄 게시물 수
  const postsViewPage = 3; // 한 페이지에 보여줄 게시물 수
  //또가요 , 북마크 , 최신순 정렬하기
  const [sortOption, setSortOption] = useState('date');

  const queryClient = useQueryClient();

  const handleLikesSort = () => {
    setSortOption('likes');

    // 캐시를 무효화하여 새로운 데이터를 가져옵니다.
    queryClient.invalidateQueries(['posts', category, currentPage, 'likes']);
  };

  const handleDateSort = () => {
    setSortOption('date');
    queryClient.invalidateQueries(['posts', category]);
  };

  const handleSearch = (searchData) => {
    const searchResults = posts.filter((post) => {
      const totalSearchData = searchData.toLowerCase().replace(' ', '');

      const placeNameMatch = post.placeName
        .replace(' ', '')
        .toLowerCase()
        .includes(totalSearchData);

      const placeLocationMatch = post.placeLocation
        .replace(' ', '')
        .toLowerCase()
        .includes(totalSearchData);

      return placeNameMatch || placeLocationMatch;
    });
    console.log({ searchResults, searchData });
    setFilteredPosts(searchResults);
    setCurrentPage(1);
  };

  const fetchPosts = async () => {
    const postsCollection = query(
      collection(db, 'posts'),
      where('nation', '==', nation),
      where('category', '==', category)
    );

    const querySnapshot = await getDocs(postsCollection);

    // 비동기 작업을 병렬로 처리하기 위해 Promise.all 사용
    const postsData = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const post = {
          ...doc.data(),
          id: doc.id,
        };

        // likes의 정보 비동기로 가져오기
        const likesQuerySnapshot = await getDocs(
          query(collection(db, 'likes'), where('postId', '==', post.id))
        );

        post.likes = likesQuerySnapshot.size;
        return post;
      })
    );

    const sortedPosts = sortPosts(postsData, sortOption);

    return sortedPosts;
  };

  //최신순,인기순 모든데이터를 가져와서 sort 리패치

  //또가요 , 북마크 , 최신순 정렬하기
  const sortPostsByLikes = (posts) => {
    // Likes 내림차순 정렬
    return posts.sort((a, b) => {
      if (b.likes === a.likes) {
        // Likes가 같으면 게시물 작성 시간 비교
        return new Date(b.timestamp) - new Date(a.timestamp);
      }
      return b.likes - a.likes;
    });
  };

  const sortPostsByDate = (posts) => {
    // Date 객체로 변환 후 비교
    return posts.sort((a, b) => {
      const dateA = a.date.toDate();
      const dateB = b.date.toDate();

      // dateA와 dateB를 비교하여 최신 순으로 정렬
      return dateB - dateA;
    });
  };

  const sortPosts = (posts, sortOption) => {
    if (sortOption === 'likes') {
      console.log({ posts });
      return sortPostsByLikes(posts);
    } else if (sortOption === 'date') {
      return sortPostsByDate(posts);
    }
    return posts;
  };

  const {
    data: posts,
    error,
    isLoading,
  } = useQuery(['posts', category, currentPage, sortOption], fetchPosts);

  useEffect(() => {
    if (posts && posts.length > 0) {
      const indexOfLastPost = currentPage * postsViewPage;
      const indexOfFirstPost = indexOfLastPost - postsViewPage;
      const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
      const sortedPosts = sortPosts(currentPosts, sortOption);
      setFilteredPosts(sortedPosts);
    }
  }, [posts, sortOption, currentPage]);

  if (error) {
    console.error('데이터를 가져올 수 없습니다', error);
    return alert('데이터를 가져올 수 없습니다');
  }

  if (isLoading) {
    return '정보를 가져오고 있습니다.';
  }
  //페이지 네이션

  return (
    <CategoryPageContainer>
      <PhrasesContainer>
        <h2>{category}</h2>
        <h3>우리 동네 베스트 추천 장소</h3>
        <Search onSearch={handleSearch} />
      </PhrasesContainer>
      <MiddleContainer>
        <FilterContainer>
          {sortOption === 'date' ? (
            <OnButton onClick={handleDateSort}>
              <img
                src={`${process.env.PUBLIC_URL}/icon/latest_icon_white.svg`}
                alt="latest_Filter_Icon"
              ></img>
              <span>최신순</span>
            </OnButton>
          ) : (
            <OffButton onClick={handleDateSort}>
              <img
                src={`${process.env.PUBLIC_URL}/icon/latest_icon_gray.svg`}
                alt="latest_Filter_Icon"
              ></img>
              <span>최신순</span>
            </OffButton>
          )}
          {sortOption === 'likes' ? (
            <OnButton onClick={handleLikesSort}>
              <img
                src={`${process.env.PUBLIC_URL}/icon/liked_icon_white.svg`}
                alt="liked_Filter_Icon"
              ></img>
              <span>인기순</span>
            </OnButton>
          ) : (
            <OffButton onClick={handleLikesSort}>
              <img
                src={`${process.env.PUBLIC_URL}/icon/liked_icon_gray.svg`}
                alt="liked_Filter_Icon"
              ></img>
              <span>인기순</span>
            </OffButton>
          )}
        </FilterContainer>
        {!!user ? (
          <WriteButton to={`/create`}>
            <img
              src={`${process.env.PUBLIC_URL}/icon/write_icon_white.svg`}
              alt="writing_icon"
            ></img>
            <span>글쓰기</span>
          </WriteButton>
        ) : (
          <></>
        )}
      </MiddleContainer>
      {/* //수정 */}
      <PostsContainer>
        {filteredPosts.length > 0 ? (
          filteredPosts
            .slice(0, 3) // 빈 문자열 조회시 갯수 상관없이 보여줘서 3개로 우선 자르기
            .map((post) => (
              <div key={post.id}>
                <PostBox to={`/detail/${post.id}`}>
                  <ImageBox alt="PostImgs" src={post.postImgs} />
                  <h4>{post.placeName}</h4>
                  <h5>{post.placeLocation}</h5>
                  <p>
                    <span># </span>
                    {post.postOneLineContent}
                  </p>
                  <CategoryLikes id={post.id} />
                </PostBox>
              </div>
            ))
        ) : (
          <div>결과가 없습니다.</div>
        )}
      </PostsContainer>
      <TopButton />
      <PageNation
        postsViewPage={postsViewPage}
        totalPosts={posts.length}
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
const MiddleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 30px;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 12px;

  & > button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    width: 105px;
    height: 34px;
    border-radius: 30px;
    font-size: 16px;
    font-weight: 400;
  }
`;
const OnButton = styled.button`
  border: 1px solid #0a58be;
  background-color: #0a58be;
  color: #fff;
`;
const OffButton = styled.button`
  border: 1px solid #e5e5e5;
  background-color: #fff;
  color: #bfbfbf;
`;
const WriteButton = styled(Link)`
  align-self: flex-end;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  width: 100px;
  height: 40px;
  border-radius: 8px;
  background-color: #0a58be;
  color: #fff;
  text-align: center;
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
  text-align: left;

  & > h4 {
    margin-top: 20px;
    font-size: 20px;
    font-weight: 500;
    color: #222;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & > h5 {
    width: 100%;
    padding: 5px 0;
    font-size: 16px;
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & > p {
    padding-bottom: 8px;
    font-size: 14px;
    font-weight: 300;
    color: #777;
  }
`;

const ImageBox = styled.img`
  width: 380px;
  height: 380px;
  object-fit: cover;
`;
