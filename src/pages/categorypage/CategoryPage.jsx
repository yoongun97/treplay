import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

function CategoryPage() {
  const fetchPosts = async () => {
    const postsCollection = collection(db, "posts");
    const querySnapshot = await getDocs(postsCollection);

    const postsData = [];
    querySnapshot.forEach((doc) => {
      postsData.push(doc.data());
    });

    return postsData;
  };

  const { data: posts, error } = useQuery("posts", fetchPosts);

  if (error) {
    console.error("데이터를 가져올 수 없습니다", error);
    return alert("데이터를 가져올 수 없습니다");
  }

  return (
    <>
      <div>맛집</div>
      <div>추천하고 싶은 장소가 있나요?</div>
      <input placeholder="찾으시는 장소를 검색해주세요" />
      <br />
      <Link to={"/edit/:id"}>글 작성하기</Link>
      <div>
        {posts &&
          posts.map((post) => (
            <div key={post.uid}>
              <p>{post.author}</p>
              <p>{post.nation}</p>
              <p>{post.category}</p>
            </div>
          ))}
      </div>
    </>
  );
}

export default CategoryPage;
