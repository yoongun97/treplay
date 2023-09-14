import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { styled } from "styled-components";

const CategoryLikes = (props) => {
  const { id } = props;
  const [likesCount, setLikesCount] = useState(0);
  const [dislikesCount, setDislikesCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "likes"), where("postId", "==", id));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => doc.data());

      // 또가요와 안가요 누적수
      const likedData = data.filter((doc) => doc.state === "like");
      const dislikedData = data.filter((doc) => doc.state === "dislike");
      setLikesCount(likedData.length);
      setDislikesCount(dislikedData.length);
    };

    fetchData();
  }, [id]);

  return (
    <LikesContainer>
      <LikesBox>
        <img
          src={`${process.env.PUBLIC_URL}/icon/like_icon.svg`}
          alt="likesIcon"
        ></img>
        <span>{likesCount}</span>
      </LikesBox>
      <DislikesBox>
        <img
          src={`${process.env.PUBLIC_URL}/icon/dislike_icon.svg`}
          alt="dislikesIcon"
        ></img>
        <span>{dislikesCount}</span>
      </DislikesBox>
    </LikesContainer>
  );
};

export default CategoryLikes;

const LikesContainer = styled.div`
  display: flex;
  align-items: center;
  height: 38px;
  padding: 0px 20px;
  border-radius: 10px;
  border: 1px solid #222;
  & > div {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 300;
  }

  & > div > img {
    margin-right: 12px;
  }
`;

const LikesBox = styled.div`
  position: relative;
  padding-right: 10px;
  color: #0a58be;

  &::after {
    content: "";
    position: absolute;
    top: auto;
    bottom: auto;
    right: 0;
    width: 1px;
    height: 16px;
    background-color: #777;
  }
`;
const DislikesBox = styled.div`
  padding-left: 10px;
  color: #fcd71e;
`;
