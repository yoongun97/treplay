import { addDoc, collection, getDocs, query, where } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../../firebaseConfig";
import { useAtom } from "jotai";
import { userAtom } from "../../store/userAtom";
import { styled } from "styled-components";

export default function Likes() {
  const { id } = useParams();

  const [likes, setLikes] = useState(false);
  const [dislikes, setDislikes] = useState(false);

  const [user] = useAtom(userAtom);

  // 또가요, 안가요 각각의 개수와 총합, 그리고 각 퍼센테이지를 구하기 위한 데이터들
  const [likesCount, setLikesCount] = useState(0);
  const [dislikesCount, setDislikesCount] = useState(0);

  const totalCount = likesCount + dislikesCount;
  const likesPercentage =
    totalCount === 0 ? 0 : (likesCount / totalCount) * 100;
  const dislikesPercentage =
    totalCount === 0 ? 0 : (dislikesCount / totalCount) * 100;

  // 처음 랜더링될 때 user의 uid와 동일한 uid를 가진 likes의 정보가 있으면 likes/dislikes를 true 처리해서 버튼 누르지 못하도록 함
  const fetchData = async () => {
    const q = query(collection(db, "likes"), where("postId", "==", id));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => doc.data());

    // likes, dislikes 의 누적 개수를 저장하기 위한 부분
    const likedData = data?.filter((doc) => doc.state === "like");
    const dislikedData = data?.filter((doc) => doc.state === "dislike");
    setLikesCount(likedData.length);
    setDislikesCount(dislikedData.length);

    // 현재 user의 uid와 동일한 uid를 가진 likes데이터가 있는지 찾고 있을 경우 likes/dislikes여부에 따라 이를 true로 처리하여 버튼을 누르지 못하도록 함.
    const userOwnData = data?.find((doc) => doc.uid === user.uid);

    if (userOwnData?.state === "like") {
      return setLikes(true);
    } else if (userOwnData?.state === "dislike") {
      return setDislikes(true);
    }
  };

  // 화면 처음 랜더링 될 때 likes/dislikes 모두 false 처리하고, 데이터 불러옴
  useEffect(() => {
    setLikes(false);
    setDislikes(false);
    fetchData();
  }, []);

  // likes/dislikes의 변화가 있을 때 데이터를 다시 불러오게 해서 추천/비추천 중복으로 누르지 못하도록 함
  useEffect(() => {
    fetchData();
  }, [likes, dislikes]);

  // 또가요/안가요 버튼을 누르면 작동되는 함수
  const likesButtonHandler = async (e, state) => {
    e.preventDefault();

    // 이미 추천/비추천 기록이 있을 경우 알럿 발생
    if (likes === true || dislikes === true) {
      if (likes === true) {
        return alert("이미 추천한 장소입니다");
      } else if (likes === false) {
        return alert("이미 비추천한 장소입니다");
      }

      // 추천/비추천 기록 없을 경우 데이터 등록
    } else if (likes === false && dislikes === false) {
      const newLikes = { postId: id, state, uid: user.uid };

      const q = query(collection(db, "likes"));
      await addDoc(q, newLikes);

      if (state === "like") {
        setLikes(true);
        return alert("또가요! 추천 완료! :)");
      } else if (state === "dislike") {
        setDislikes(true);
        return alert("안가요... 비추천 완료! :(");
      }
    }
  };

  return (
    <LikesContainer>
      <BarContainer>
        <LikesBar likes={likesPercentage.toFixed(0)}>
          <span>또가요 {likesPercentage.toFixed(1)}%</span>
        </LikesBar>
        <DislikesBar dislikes={dislikesPercentage.toFixed(0)}>
          <span>안가요 {dislikesPercentage.toFixed(1)}%</span>
        </DislikesBar>
      </BarContainer>
      <ButtonContainer>
        {/* 또가요 버튼 */}
        <LikesButton
          onClick={(e) => likesButtonHandler(e, "like")}
          disabled={likes}
        >
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/icon/like_icon.svg`}
              alt="likesIcon"
            ></img>
            <span>또가요</span>
          </div>
          <p>{likesCount}명</p>
        </LikesButton>
        {/* 안가요 버튼 */}
        <DislikesButton
          onClick={(e) => likesButtonHandler(e, "dislike")}
          disabled={dislikes}
        >
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/icon/dislike_icon.svg`}
              alt="dislikesIcon"
            ></img>
            <span>안가요</span>
          </div>
          <p>{dislikesCount}명</p>
        </DislikesButton>

        {/* 여기서 disabled={}는 likes/dislikes의 true/false여부에 따라 활성화/비활성화 하기 위해서 사용 */}
      </ButtonContainer>
    </LikesContainer>
  );
}

const LikesContainer = styled.div`
  margin-bottom: 140px;
  text-align: center;
`;
const BarContainer = styled.div`
  width: 1280px;
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
`;
const LikesBar = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 1;
  width: ${(props) => props.likes}%;
  min-width: 90px;
  height: 40px;
  padding: 0 20px;
  background-color: #0a58be;
`;
const DislikesBar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;
  flex-shrink: 0;
  width: ${(props) => props.dislikes}%;
  min-width: 90px;
  height: 40px;
  padding: 0 20px;
  background-color: #fcd71e;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 40px;

  & > button {
    width: 240px;
    height: 80px;
    border-radius: 60px;
    outline: none;
    font-size: 18px;
    font-weight: 500;
  }

  & > button > div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }

  & p {
    font-size: 14px;
    font-weight: 400;
    color: #222;
  }
`;
const LikesButton = styled.button`
  border: 1px solid ${(props) => (props.disabled ? "#e5e5e5" : "#0a58be")};
  color: #0a58be;
  background-color: ${(props) => (props.disabled ? "#e5e5e5" : "#fff")};
`;
const DislikesButton = styled.button`
  border: 1px solid ${(props) => (props.disabled ? "#e5e5e5" : "#fcd71e")};
  color: #fcd71e;
  background-color: ${(props) => (props.disabled ? "#e5e5e5" : "#fff")};
`;
