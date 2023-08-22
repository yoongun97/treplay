import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { userAtom } from "../../store/userAtom";
import Unloggined from "../../common/Unloggined";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import { useParams } from "react-router-dom";
import SavedList from "./components/SavedList";
import MyList from "./components/MyList";
import { updateProfile } from "firebase/auth";

function MyPage() {
  const [user] = useAtom(userAtom);
  const userUidObject = useParams();
  const userUid = userUidObject.uid;

  const [isMyListActived, setIsMyListActived] = useState(true);
  const [isEditorAcitved, setIsEditorActived] = useState(false);

  const [allLikedData, setAllLikedData] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [newNickname, setNewNickname] = useState("");

  const fetchData = async () => {
    // 또가요 데이터
    const likedQ = query(collection(db, "likes"));
    const likedQuerySnapshot = await getDocs(likedQ);
    const likedData = likedQuerySnapshot.docs.map((doc) => doc.data());

    // 모든 좋아요 데이터 저장
    setAllLikedData(likedData);

    // 내 저장 데이터
    const savedQ = query(collection(db, "saved"), where("uid", "==", userUid));
    const savedQuerySnapshot = await getDocs(savedQ);
    const savedData = savedQuerySnapshot.docs.map((doc) => doc.data());

    // 모든 글 데이터
    const postsQ = query(collection(db, "posts"));
    const postsQuerySnapshot = await getDocs(postsQ);
    const postsData = postsQuerySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    // 내가 쓴 글 목록 저장
    setMyPosts(postsData.filter((data) => data.uid === userUid));

    // 저장한 글 목록 저장
    const filteredData = postsData.filter((post) => {
      return savedData.some((data) => post.id === data.postId);
    });
    setSavedPosts(filteredData);
  };

  // 처음 랜더링 될 때 likes / posts db에서 user의 uid와 동일한 uid 가 있는 것들만 정보 가져옴
  useEffect(() => {
    fetchData();
  }, []);

  // 버튼 클릭 시 리스트 전환 함수
  const activeSavedListHandler = () => {
    setIsMyListActived(false);
  };
  const activeMyListHandler = () => {
    setIsMyListActived(true);
  };

  const startEditNameHandler = () => {
    setIsEditorActived(true);
    console.log("수정 시작");
  };

  // 닉네임 중복 검사 및 수정 완료 핸들러
  const endEditNameHandler = async () => {
    const userQ = query(collection(db, "users"));
    const querySnapshot = await getDocs(userQ);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    const ownData = data.find((item) => item.uid === userUid);
    const usedNickname = data.filter((item) => item.nickname === newNickname);

    try {
      if (!!newNickname === false) {
        return alert("닉네임을 입력해 주세요");
      } else if (usedNickname.length > 0) {
        return alert(
          "이미 사용 중인 닉네임입니다. 다른 닉네임을 사용해 주세요."
        );
      } else if (usedNickname.length === 0) {
        setIsEditorActived(false);

        // 1. firebase auth 정보 업데이트
        updateProfile(auth.currentUser, {
          displayName: newNickname,
        });
        // 2. firestore users db 정보 업데이트
        const userRef = doc(db, "users", `${ownData.id}`);
        await updateDoc(userRef, { nickname: newNickname });

        fetchData();

        return alert("닉네임 수정 완료!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {user ? (
        <div className="MypageContainer">
          <div className="UserInfoInner">
            <p>마이페이지</p>
            <div>
              <div>
                <div>프로필사진</div>
                <button>수정</button>
              </div>
              <div>
                {/* 닉네임 인풋 */}
                {isEditorAcitved ? (
                  <input
                    type="text"
                    value={newNickname}
                    placeholder="새로운 닉네임을 입력하세요"
                    onChange={(e) => {
                      setNewNickname(e.target.value);
                    }}
                  />
                ) : (
                  <input type="text" value={user.displayName} disabled />
                )}
                {/* 닉네임 수정 버튼 */}
                {isEditorAcitved ? (
                  <button
                    onClick={() => {
                      endEditNameHandler();
                    }}
                  >
                    완료
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      startEditNameHandler();
                    }}
                  >
                    수정
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="ListContainer">
            <div>
              {/* 내가 쓴 글/ 저장한 글 전환 */}
              <span onClick={activeMyListHandler}>내가쓴글</span>
              <span onClick={activeSavedListHandler}>저장한글</span>
            </div>
            <div className="ListContainerInner">
              {/* 버튼 전환 시 리스트 전환 */}
              {isMyListActived === true ? (
                <MyList myPosts={myPosts} allLikedData={allLikedData} />
              ) : (
                <SavedList
                  savedPosts={savedPosts}
                  allLikedData={allLikedData}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        // 비회원일 경우에 Unloggined 컴포넌트 보여 주기
        <Unloggined />
      )}
    </div>
  );
}

export default MyPage;
