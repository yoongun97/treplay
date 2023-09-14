import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import SkeletonCard from "../../components/skeletonUI/skeletonCard/SkeletonCard";
import { useAtom } from "jotai";
import { userAtom } from "../../store/userAtom";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import PageNation from "../../components/pageNation/PageNation";
import CategoryLikes from "./CategoryLikes";
import Search from "../../components/search/Search";
import * as s from "./StyledCategoryPage";
import Swal from "sweetalert2";

const POSTS_VIEW_PAGE = 3;

function CategoryPage() {
  const [user] = useAtom(userAtom);
  const { nation, category } = useParams();
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("date");
  const queryClient = useQueryClient();

  const handleSort = useCallback(
    (option) => {
      const key = option === "likes" ? "likes" : "date";
      setSortOption(key);
      queryClient.invalidateQueries(["posts", category, currentPage, key]);
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
      collection(db, "posts"),
      where("nation", "==", nation),
      where("category", "==", category),
      orderBy("date", "desc")
    );
    const querySnapshot = await getDocs(postsCollection);

    const postsData = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const post = {
          ...doc.data(),
          id: doc.id,
        };
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

  const sortPostsByLikes = (posts) => {
    return posts.sort((a, b) => {
      if (b.likes === a.likes) {
        return new Date(b.timestamp) - new Date(a.timestamp);
      }
      return b.likes - a.likes;
    });
  };

  const sortPostsByDate = (posts) => {
    const copyPosts = [...posts];
    return copyPosts.sort((a, b) => {
      const dateA = a.date.toDate();
      const dateB = b.date.toDate();
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
          {sortOption === "date" ? (
            <s.OnButton onClick={() => handleSort("date")}>
              <img
                src={`${process.env.PUBLIC_URL}/icon/latest_icon_white.svg`}
                alt="latest_Filter_Icon"
              ></img>
              <span>최신순</span>
            </s.OnButton>
          ) : (
            <s.OffButton onClick={() => handleSort("date")}>
              <img
                src={`${process.env.PUBLIC_URL}/icon/latest_icon_gray.svg`}
                alt="latest_Filter_Icon"
              ></img>
              <span>최신순</span>
            </s.OffButton>
          )}
          {sortOption === "likes" ? (
            <s.OnButton onClick={() => handleSort("likes")}>
              <img
                src={`${process.env.PUBLIC_URL}/icon/liked_icon_white.svg`}
                alt="liked_Filter_Icon"
              ></img>
              <span>인기순</span>
            </s.OnButton>
          ) : (
            <s.OffButton onClick={() => handleSort("likes")}>
              <img
                src={`${process.env.PUBLIC_URL}/icon/liked_icon_gray.svg`}
                alt="liked_Filter_Icon"
              ></img>
              <span>인기순</span>
            </s.OffButton>
          )}
        </s.FilterContainer>
        <s.WriteButton href={user ? "/create" : "/suggest"}>
          <img
            src={`${process.env.PUBLIC_URL}/icon/write_icon_white.svg`}
            alt="writing_icon"
          ></img>
          <span>글쓰기</span>
        </s.WriteButton>
      </s.MiddleContainer>
      <s.PostsContainer>
        {error ? <>에러입니다</> : null}
        {isLoading ? (
          <SkeletonCard />
        ) : (
          <>
            {filteredPosts.length > 0
              ? filteredPosts.slice(0, 3).map((post) => (
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
              : filteredPosts.length === 0 && (
                  <s.SearchResults>결과가 없습니다.</s.SearchResults>
                )}
          </>
        )}
      </s.PostsContainer>
      <PageNation
        postsViewPage={POSTS_VIEW_PAGE}
        totalPosts={posts ? posts.length : 0}
        currentPage={currentPage}
        pagenate={setCurrentPage}
      />
    </s.CategoryPageContainer>
  );
}

export default CategoryPage;
