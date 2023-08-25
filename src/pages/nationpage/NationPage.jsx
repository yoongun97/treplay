import React, { useEffect, useState } from "react";
import Category from "./components/Category";
import MiddleBanner from "./components/MiddleBanner";
import Preview from "./components/Preview";
import EventBanner from "./components/EventBanner";
import BestPlace from "./components/BestPlace";
import MainCarousel from "../../components/imageslide/MainCarousel";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useQuery } from "react-query";

function NationPage() {
  // category 파라미터를 가져옴

  const [posts, setPosts] = useState([]);
  const [allLikedData, setAllLikedData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchData = async () => {
    setSelectedCategory("숙박");
    const postsQ = query(collection(db, "posts"));
    const postsQuerySnapshot = await getDocs(postsQ);
    const postsData = postsQuerySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    //모든 포스트 데이터 저장
    setPosts(postsData);

    const likedQ = query(collection(db, "likes"));
    const likedQuerySnapshot = await getDocs(likedQ);
    const likedData = likedQuerySnapshot.docs.map((doc) => doc.data());
    // 모든 좋아요 데이터 저장
    setAllLikedData(likedData);
  };
  useEffect(() => fetchData, []);

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
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        allLikedData={allLikedData}
      />
      <EventBanner />
      <BestPlace />
    </div>
  );
}

export default NationPage;
