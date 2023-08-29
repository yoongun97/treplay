import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
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
  const postsViewPage = 5; // 한 페이지에 보여줄 게시물 수

  const handleSearch = (searchQuery) => {
    const searchResults = posts.filter((post) =>
      post.placeName
        .replace(" ", "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase().replace(" ", ""))
    );
    setCurrentPage(1);
    setFilteredPosts(searchResults);
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

    return postsData;
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
  //또가요 안가요 보여주기

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
        {(filteredPosts.length > 0 ? filteredPosts : currentPosts).map(
          (post) => (
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
