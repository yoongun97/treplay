import React, { useEffect, useState } from "react";
import Category from "./components/category/Category";
import MiddleBanner from "./components/middleBanner/MiddleBanner";
import Preview from "./components/preview/Preview";
import EventBanner from "./components/eventBanner/EventBanner";
import BestPlace from "./components/bestPlace/BestPlace";
import NationCarousel from "../../components/imageslide/nationpageSlide/NationCarousel";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useParams } from "react-router-dom";

function NationPage() {
  const [selectedCategory, setSelectedCategory] = useState("숙박");
  const { nation } = useParams();

  useEffect(() => {
    return () => {
      window.scrollTo(0, 0);
    };
  }, []);

  const fetchData = async () => {
    const postsQ = query(collection(db, "posts"));
    const likedQ = query(collection(db, "likes"));

    try {
      const [postsQuerySnapshot, likedQuerySnapshot] = await Promise.all([
        getDocs(postsQ),
        getDocs(likedQ),
      ]);

      const postsData = postsQuerySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      const likedData = likedQuerySnapshot.docs.map((doc) => doc.data());

      return { posts: postsData, allLikedData: likedData };
    } catch (error) {
      console.error("Error fetching data:", error);

      throw error;
    }
  };

  return (
    <div className="Container">
      <NationCarousel nation={nation} />
      <Category />
      <Preview
        fetch={fetchData}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <MiddleBanner />
      <EventBanner />
      <BestPlace fetch={fetchData} />
    </div>
  );
}

export default NationPage;
