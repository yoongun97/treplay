import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
} from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../../firebaseConfig";
import { useAtom } from "jotai";
import { userAtom } from "../../store/userAtom";
import * as s from "./StyledLikes";
import { StyleSheetManager } from "styled-components";
import isPropValid from "@emotion/is-prop-valid";
import { useNavigate } from "react-router-dom";

export default function Likes() {
  const { id } = useParams();

  const [likes, setLikes] = useState(false);
  const [dislikes, setDislikes] = useState(false);
  const [userOwnData, setUserOwnData] = useState();

  const [user] = useAtom(userAtom);

  const navigate = useNavigate();

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

    if (user) {
      const ownData = data?.find((doc) => doc.uid === user.uid);

      setUserOwnData(ownData);

      if (ownData?.state === "like") {
        return setLikes(true);
      } else if (ownData?.state === "dislike") {
        return setDislikes(true);
      }
    }
  };

  // 화면 처음 랜더링 될 때 likes/dislikes 모두 false 처리하고, 데이터 불러옴
  useEffect(() => {
    setLikes(false);
    setDislikes(false);
    fetchData();
  }, [user]);

  // likes/dislikes의 변화가 있을 때 데이터를 다시 불러오게 해서 추천/비추천 중복으로 누르지 못하도록 함
  useEffect(() => {
    fetchData();
  }, [likes, dislikes]);

  // 또가요 버튼 함수 구현
  const likesButtonHandler = async (e, state) => {
    e.preventDefault();
    // 추천/비추천 해 둔 상태일 때
    if (!!userOwnData === true) {
      // 이미 누른 버튼을 또 누를 때
      if (userOwnData.state === state) {
        const q = query(
          collection(db, "likes"),
          where("postId", "==", id),
          where("uid", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const showLike = querySnapshot.docs[0];
        //deleteDoc으로 likes 입력값 삭제
        if (showLike) {
          await deleteDoc(showLike.ref);
        }

        if (state === "dislike") {
          setDislikes(!dislikes);
        } else if (state === "like") {
          setLikes(!likes);
        }

        if (state === "like") {
          return alert("또가요 취소 완료!");
        } else if (state === "dislike") {
          return alert("안가요 취소 완료!");
        }
      } else if (userOwnData.state !== state) {
        const q = query(
          collection(db, "likes"),
          where("postId", "==", id),
          where("uid", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const showLike = querySnapshot.docs[0];
        //deleteDoc으로 likes 입력값 삭제
        if (showLike) {
          await deleteDoc(showLike.ref);
        }
        const newLike = { postId: id, state, uid: user.uid };
        await addDoc(collection(db, "likes"), newLike);

        setLikes(!likes);
        setDislikes(!dislikes);

        if (state === "like") {
          return alert("또가요! 추천 완료 :)");
        } else if (state === "dislike") {
          return alert("안가요! 비추천 완료 :(");
        }
      }
    }
    // 아직 추천/비추천 하지 않았을 때
    else if (!!userOwnData === false) {
      if (state === "dislike") {
        setDislikes(true);
      } else if (state === "like") {
        setLikes(true);
      }
      const newLike = { postId: id, state, uid: user.uid };
      await addDoc(collection(db, "likes"), newLike);

      if (state === "like") {
        return alert("또가요! 추천 완료 :)");
      } else if (state === "dislike") {
        return alert("안가요! 비추천 완료 :(");
      }
    }
  };

  return (
    <StyleSheetManager shouldForwardProp={(prop) => isPropValid(prop)}>
      <s.LikesContainer>
        <s.BarContainer>
          <s.LikesBar likes={likesPercentage.toFixed(0)}>
            <span>또가요 {likesPercentage.toFixed(1)}%</span>
          </s.LikesBar>
          <s.DislikesBar dislikes={dislikesPercentage.toFixed(0)}>
            <span>안가요 {dislikesPercentage.toFixed(1)}%</span>
          </s.DislikesBar>
        </s.BarContainer>
        <s.ButtonContainer>
          {/* 또가요 버튼 */}
          <s.LikesButton
            onClick={(e) => {
              if (!user) {
                navigate("/suggest");
              } else {
                likesButtonHandler(e, "like");
              }
            }}
            activated={likes}
          >
            <div>
              <span></span>
              <span>또가요</span>
            </div>
            <p>{likesCount}명</p>
          </s.LikesButton>
          {/* 안가요 버튼 */}
          <s.DislikesButton
            onClick={(e) => {
              if (!user) {
                navigate("/suggest");
              } else {
                likesButtonHandler(e, "dislike");
              }
            }}
            activated={dislikes}
          >
            <div>
              <span></span>
              <span>안가요</span>
            </div>
            <p>{dislikesCount}명</p>
          </s.DislikesButton>

          {/* 여기서 disabled={}는 likes/dislikes의 true/false여부에 따라 활성화/비활성화 하기 위해서 사용 */}
        </s.ButtonContainer>
      </s.LikesContainer>
    </StyleSheetManager>
  );
}
