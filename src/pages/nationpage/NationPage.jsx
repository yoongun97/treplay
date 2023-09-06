import React, { useEffect, useState } from "react";
import Category from "./components/category/Category";
import MiddleBanner from "./components/middleBanner/MiddleBanner";
import Preview from "./components/preview/Preview";
import EventBanner from "./components/eventBanner/EventBanner";
import BestPlace from "./components/bestPlace/BestPlace";
import MainCarousel from "../../components/imageslide/MainCarousel";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useQuery } from "react-query";

function NationPage() {
  const [posts, setPosts] = useState([]);
  const [allLikedData, setAllLikedData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("숙박");

  const fetchData = () => {
    // Promise All로 고친 결과
    const postsQ = query(collection(db, "posts"));
    const likedQ = query(collection(db, "likes"));

    // async await try catch 로 변경하는 게 좋다

    Promise.all([getDocs(postsQ), getDocs(likedQ)])
      .then((results) => {
        const postsQuerySnapshot = results[0];
        // results[0]은 getDocs(postsQ)를 뜻함
        const likedQuerySnapshot = results[1];

        const postsData = postsQuerySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        // 모든 포스트 데이터 저장
        setPosts(postsData);

        const likedData = likedQuerySnapshot.docs.map((doc) => doc.data());
        // 모든 좋아요 데이터 저장
        setAllLikedData(likedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    return () => {
      window.scrollTo(0, 0);
    };
  }, []);

  // 리액트 쿼리로 로딩/에러 처리

  const { isLoading, iserror, error } = useQuery("userData", fetchData);

  if (isLoading) {
    return <div>로딩 중입니다...</div>;
  }

  if (iserror) {
    return alert(`에러 발생! Error Code: ${error.message}`);
  }

  return (
    <div className="Container">
      <MainCarousel />
      <Category />
      <MiddleBanner />
      <Preview
        posts={posts}
        allLikedData={allLikedData}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <EventBanner />
      <BestPlace posts={posts} allLikedData={allLikedData} />
    </div>
  );
}

export default NationPage;
