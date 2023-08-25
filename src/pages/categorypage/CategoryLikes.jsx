import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const CategoryLikes = (props) => {
  const { id } = props;
  const [likesCount, setLikesCount] = useState(0);
  const [dislikesCount, setDislikesCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'likes'), where('postId', '==', id));
      console.log({ id });
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => doc.data());
      // 또가요와 안가요 누적수
      const likedData = data.filter((doc) => doc.state === 'like');
      const dislikedData = data.filter((doc) => doc.state === 'dislike');
      setLikesCount(likedData.length);
      setDislikesCount(dislikedData.length);
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <span>또가요({likesCount})</span>
      <span>안가요({dislikesCount})</span>
    </div>
  );
};

export default CategoryLikes;
