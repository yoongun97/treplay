import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import PageNation from "../../components/pageNation/PageNation";
import CategoryLikes from "./CategoryLikes";
import { useAtom } from "jotai";
import { userAtom } from "../../store/userAtom";
import { styled } from "styled-components";
import Search from "../../components/search/Search";

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
        .replace(" ", "")
        .toLowerCase()
        .includes(searchData.toLowerCase().replace(' ', ''))
    );
    setFilteredPosts(searchResults);
    setCurrentPage(1); // 이곳에서 문제인가요? 검색 결과가 없을시 초기 화면으로 가는데 이걸 아래쪽에서 어떻게 하는지
  };

  const fetchPosts = async () => {
    const postsCollection = query(
      collection(db, "posts"),
      where("nation", "==", nation),
      where("category", "==", category)
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
  } = useQuery(["posts", category], fetchPosts);


  if (error) {
    console.error("데이터를 가져올 수 없습니다", error);
    return alert("데이터를 가져올 수 없습니다");
  }

  if (isLoading) {
    return "정보를 가져오고 있습니다.";
  }
  //페이지 네이션
  const indexOfLastPost = currentPage * postsViewPage;
  const indexOfFirstPost = indexOfLastPost - postsViewPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  console.log(user);

  return (
    <CategoryPageContainer>
      <PhrasesContainer>
        <h2>{category}</h2>
        <h3>우리 동네 베스트 추천 장소</h3>
        <Search onSearch={handleSearch} />
      </PhrasesContainer>
      <MiddleContainer>
        {/* FilterContainer에 정렬기능 추가 */}
        <FilterContainer>
          <LatestFilterButton>최신순</LatestFilterButton>
          <LikedFilterButton>인기순</LikedFilterButton>
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
        {(filteredPosts.length > 0 ? filteredPosts : currentPosts)
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
const MiddleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 12px;

  & > div {
    width: 105px;
    height: 34px;
    border-radius: 30px;
    border: 1px solid #e5e5e5;
  }
`;

const LatestFilterButton = styled.div``;
const LikedFilterButton = styled.div``;
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
