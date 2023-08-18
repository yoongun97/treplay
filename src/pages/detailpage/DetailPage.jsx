import React, { useEffect, useState } from "react";
import PlaceMap from "../../components/PlaceMap";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useParams } from "react-router-dom";

function DetailPage() {
  const [posts, setPosts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      // collection 이름이 todos인 collection의 모든 document를 가져옵니다.
      const q = query(collection(db, "posts"));
      const querySnapshot = await getDocs(q);

      const initialPosts = [];

      querySnapshot.forEach((doc) => {
        initialPosts.push({ id: doc.id, ...doc.data() });
      });

      // firestore에서 가져온 데이터를 state에 전달
      setPosts(initialPosts);
    };

    fetchData();
  }, []);

  const post = posts.find((post) => post.id === id);
  console.log(posts);
  console.log(post);

  return (
    <>
      <div
        style={{
          maxWidth: "1200px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "0 auto 0 auto",
        }}
      >
        <h2>{post?.placeName}</h2>
        <button style={{ margin: " 20px 5% 20px auto" }}>공유하기</button>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "0 auto 0 auto",
          }}
        >
          <div style={{ display: "flex", marginLeft: "auto" }}>
            <button>수정</button>
            <button>삭제</button>
          </div>
          <img
            style={{
              width: "400px",
              height: "400px",
            }}
            src="https://cdn.pixabay.com/photo/2023/08/02/14/25/dog-8165447_640.jpg"
            alt="디테일 이미지"
          />
          <p>{post?.postContent}</p>
          <PlaceMap postAddress={post?.placeLocation} />
        </div>
        <div>
          <div style={{ display: "flex" }}>
            <button>또가요</button>
            <button>안가요</button>
          </div>
          <div style={{ display: "flex" }}>
            <div
              style={{ width: "50%", height: "20px", backgroundColor: "Red" }}
            >
              50%
            </div>
            <div
              style={{ width: "50%", height: "20px", backgroundColor: "Blue" }}
            >
              50%
            </div>
          </div>
        </div>
        <div
          style={{ width: "800px", height: "300px", border: "1px solid black" }}
        >
          댓글 창
        </div>
      </div>
    </>
  );
}

export default DetailPage;
