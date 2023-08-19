import React, { useState, useQuery } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase';

function Search() {
  const [search, setSearch] = useState('');
  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const fetchPosts = async () => {
    const postsCollection = collection(db, 'posts');
    const querySnapshot = await getDocs(postsCollection);

    const postsData = [];
    querySnapshot.forEach((doc) => {
      postsData.push(doc.data());
    });

    return postsData;
  };

  const { data: posts } = useQuery('posts', fetchPosts);

  const filterList = posts.filter((p) => {
    return p.posts
      .replace(' ', '')
      .toLocaleLowerCase()
      .includes(search.toLocaleLowerCase().replace(' ', ''));
  });
  return (
    <>
      <div>
        {filterList.map((post) => (
          <div>{post.nation}</div>
        ))}
      </div>
    </>
  );
}

export default Search;
