import React, { useEffect, useState } from "react";
import Category from "./components/category/Category";
import MiddleBanner from "./components/middleBanner/MiddleBanner";
import Preview from "./components/preview/Preview";
import EventBanner from "./components/eventBanner/EventBanner";
import BestPlace from "./components/bestPlace/BestPlace";
import MainCarousel from "../../components/imageslide/nationpageSlide/MainCarousel";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useQuery } from "react-query";

function NationPage() {
  const [selectedCategory, setSelectedCategory] = useState("숙박");

  useEffect(() => {
    return () => {
      window.scrollTo(0, 0);
    };
  }, []);

  const fetchData = async () => {
    const postsQ = query(collection(db, "posts"));
    const postsQuerySnapshot = await getDocs(postsQ);
    const postsData = postsQuerySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    const likedQ = query(collection(db, "likes"));
    const likedQuerySnapshot = await getDocs(likedQ);
    const likedData = likedQuerySnapshot.docs.map((doc) => doc.data());
    return { posts: postsData, allLikedData: likedData };
  };
  // 리액트 쿼리로 로딩/에러 처리
  const { data, isLoading, iserror, error } = useQuery("userData", fetchData);

  if (isLoading) {
    return <div>로딩 중입니다...</div>;
  }
  if (iserror) {
    return alert(`에러 발생! Error Code: ${error.message}`);
  }
  const { posts, allLikedData } = data;

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
