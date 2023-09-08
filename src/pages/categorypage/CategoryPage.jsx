import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
  limit,
  startAfter,
} from 'firebase/firestore';

import { db } from '../../firebaseConfig';
import PageNation from '../../components/pageNation/PageNation';
import CategoryLikes from './CategoryLikes';
import Search from '../../components/search/Search';
import * as s from './StyledCategoryPage';
import Swal from 'sweetalert2';

//콘솔 지우기
const POSTS_VIEW_PAGE = 3;

function CategoryPage() {
  const { nation, category } = useParams();
  const [filteredPosts, setFilteredPosts] = useState([]);
  //페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  //또가요 , 북마크 , 최신순 정렬하기
  const [sortOption, setSortOption] = useState('date');
  const queryClient = useQueryClient();

  const handleSort = useCallback(
    (option) => {
      const key = option === 'likes' ? 'likes' : 'date';
      setSortOption(key);
      queryClient.invalidateQueries(['posts', category, currentPage, key]);
    },
    [queryClient, category, currentPage]
  );


  const handleSearch = (searchData) => {
    const searchResults = posts.filter((post) => {
      const totalSearchData = searchData.toLowerCase().replace(" ", "");

      const placeNameMatch = post.placeName
        .replace(" ", "")
        .toLowerCase()
        .includes(totalSearchData);

      const placeLocationMatch = post.placeLocation
        .replace(" ", "")
        .toLowerCase()
        .includes(totalSearchData);

      return placeNameMatch || placeLocationMatch;
    });
    setFilteredPosts(searchResults);
    setCurrentPage(1);
  };

  const fetchPosts = async () => {
    const postsCollection = query(
      collection(db, 'posts'),
      where('nation', '==', nation),
      where('category', '==', category),
      orderBy('date', 'desc')

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
          query(collection(db, "likes"), where("postId", "==", post.id))
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

  // Date 객체로 변환 후 비교
  const sortPostsByDate = (posts) => {
    const copyPosts = [...posts];
    return copyPosts.sort((a, b) => {
      const dateA = a.date.toDate();
      const dateB = b.date.toDate();

      // dateA와 dateB를 비교하여 최신 순으로 정렬
      return dateB - dateA;
    });
  };

  const sortPosts = (posts, sortOption) => {
    if (sortOption === "likes") {
      return sortPostsByLikes(posts);
    } else if (sortOption === "date") {
      return sortPostsByDate(posts);
    }
    return posts;
  };

  const {
    data: posts,
    error,
    isLoading,
  } = useQuery(["posts", category, currentPage, sortOption], fetchPosts);

  useEffect(() => {
    return () => {
      window.scrollTo(0, 0);
    };
  });

  useEffect(() => {
    if (posts && posts.length > 0) {
      const indexOfLastPost = currentPage * POSTS_VIEW_PAGE;
      const indexOfFirstPost = indexOfLastPost - POSTS_VIEW_PAGE;
      const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
      const sortedPosts = sortPosts(currentPosts, sortOption);
      setFilteredPosts(sortedPosts);

      // if (currentPosts.length > 0) {
      //   const lastPost = currentPosts[currentPosts.length - 1];
      //   setLastVisibleDoc(lastPost);
      // }

    }
  }, [posts, sortOption, currentPage]);

  if (error) {
    return Swal.fire({ title: "데이터를 가져올 수 없습니다", icon: "warning" });
  }

  return (
    <s.CategoryPageContainer>
      <s.PhrasesContainer>
        <h2>{category}</h2>
        <h3>우리 동네 베스트 추천 장소</h3>
        <Search onSearch={handleSearch} />
      </s.PhrasesContainer>
      <s.MiddleContainer>
        <s.FilterContainer>

          {sortOption === 'date' ? (
            <s.OnButton onClick={() => handleSort('date')}>

              <img
                src={`${process.env.PUBLIC_URL}/icon/latest_icon_white.svg`}
                alt="latest_Filter_Icon"
              ></img>
              <span>최신순</span>
            </s.OnButton>
          ) : (
            <s.OffButton onClick={() => handleSort('date')}>
              <img
                src={`${process.env.PUBLIC_URL}/icon/latest_icon_gray.svg`}
                alt="latest_Filter_Icon"
              ></img>
              <span>최신순</span>
            </s.OffButton>
          )}

          {sortOption === 'likes' ? (
            <s.OnButton onClick={() => handleSort('likes')}>

              <img
                src={`${process.env.PUBLIC_URL}/icon/liked_icon_white.svg`}
                alt="liked_Filter_Icon"
              ></img>
              <span>인기순</span>
            </s.OnButton>
          ) : (

            <s.OffButton onClick={() => handleSort('likes')}>

              <img
                src={`${process.env.PUBLIC_URL}/icon/liked_icon_gray.svg`}
                alt="liked_Filter_Icon"
              ></img>
              <span>인기순</span>
            </s.OffButton>
          )}
        </s.FilterContainer>

        <s.WriteButton to={"/create"}>
          <img
            src={`${process.env.PUBLIC_URL}/icon/write_icon_white.svg`}
            alt="writing_icon"
          ></img>
          <span>글쓰기</span>
        </s.WriteButton>
      </s.MiddleContainer>
      <s.PostsContainer>
        {isLoading ? <>로딩중입니다</> : null}
        {error ? <>에러입니다</> : null}
        <>
          {filteredPosts.length > 0 ? (
            filteredPosts.slice(0, 3).map((post) => (
              <div key={post.id}>
                <s.PostBox to={`/detail/${post.id}`}>
                  <s.ImageBox alt="PostImgs" src={post.postImgs} />
                  <h4>{post.placeName}</h4>
                  <h5>{post.placeLocation}</h5>
                  <p>
                    <span># </span>
                    {post.postOneLineContent}
                  </p>
                  <CategoryLikes id={post.id} />
                </s.PostBox>
              </div>
            ))
          ) : (
            <div>결과가 없습니다.</div>
          )}
        </>
        {/* )} */}
      </s.PostsContainer>
      <PageNation
        postsViewPage={POSTS_VIEW_PAGE}
        totalPosts={posts ? posts.length : 0}
        currentPage={currentPage}
        pagenate={setCurrentPage} // 현재 페이지 업데이트 함수 전달
      />
    </s.CategoryPageContainer>
  );
}

export default CategoryPage;
