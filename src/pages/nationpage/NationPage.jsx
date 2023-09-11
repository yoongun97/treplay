import React, { useEffect, useState } from 'react';
import Category from './components/category/Category';
import MiddleBanner from './components/middleBanner/MiddleBanner';
import Preview from './components/preview/Preview';
import EventBanner from './components/eventBanner/EventBanner';
import BestPlace from './components/bestPlace/BestPlace';
import NationCarousel from '../../components/imageslide/nationpageSlide/NationCarousel';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';

function NationPage() {
  const [selectedCategory, setSelectedCategory] = useState('숙박');

  useEffect(() => {
    return () => {
      window.scrollTo(0, 0);
    };
  }, []);

  const fetchData = async () => {
    const postsQ = query(collection(db, 'posts'));
    const likedQ = query(collection(db, 'likes'));

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
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  // 리액트 쿼리로 로딩/에러 처리
  const { data, isLoading, iserror, error } = useQuery('userData', fetchData);

  if (isLoading) {
    return <div>로딩 중입니다...</div>;
  }
  if (iserror) {
    return Swal.fire({
      title: `에러 발생! Error Code: ${error.message}`,
      icon: 'error',
    });
  }
  console.log({ data, error });
  const { posts, allLikedData } = data;

  return (
    <div className="Container">
      <NationCarousel />
      <Category />
      <Preview
        // posts={posts}
        posts={data?.posts ? data.posts : []}
        allLikedData={allLikedData}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <MiddleBanner />

      <EventBanner />
      <BestPlace
        //  posts={posts}
        posts={data?.posts ? data.posts : []}
        allLikedData={allLikedData}
      />
    </div>
  );
}

export default NationPage;
