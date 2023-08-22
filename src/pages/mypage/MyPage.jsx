import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { userAtom } from "../../store/userAtom";
import Unloggined from "../../common/Unloggined";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useParams } from "react-router-dom";

function MyPage() {
  const [user] = useAtom(userAtom);
  const userUidObject = useParams();
  const userUid = userUidObject.uid;

  const [isMyListActived, setIsMyListActived] = useState(true);
  const [isSavedListActived, setIsSavedListActived] = useState(false);

  const [allLikedData, setAllLikedData] = useState([]);
  const [ownSavedData, setOwnSavedData] = useState([]);

  const [myPosts, setMyPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);

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

    // 모든 저장 데이터 저장
    setOwnSavedData(savedData);

    // 모든 글 데이터
    const postsQ = query(collection(db, "posts"));
    const postsQuerySnapshot = await getDocs(postsQ);
    const postsData = postsQuerySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    // 내가 쓴 글 목록
    setMyPosts(postsData.filter((data) => data.uid === userUid));

    // 저장한 글 목록
    const filteredData = postsData.filter((post) => {
      return ownSavedData.some((data) => post.id === data.postId);
    });
    setSavedPosts(filteredData);
  };

  // 처음 랜더링 될 때 likes / posts db에서 user의 uid와 동일한 uid 가 있는 것들만 정보 가져옴
  useEffect(() => {
    fetchData();
  }, []);

  const activeSavedListHandler = () => {
    setIsSavedListActived(true);
    setIsMyListActived(false);
  };

  const activeMyListHandler = () => {
    setIsSavedListActived(false);
    setIsMyListActived(true);
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
                <input type="text" value={user.displayName} disabled />
                <button>수정</button>
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
              {isMyListActived === true ? (
                // 내가 쓴 글 리스트 출력
                <div>
                  {myPosts?.map((post) => {
                    const likedCount = allLikedData?.filter(
                      (data) => data.postId === post.id && data.state === "like"
                    );
                    const dislikedCount = allLikedData?.filter(
                      (data) =>
                        data.postId === post.id && data.state === "dislike"
                    );
                    return (
                      <div className="myListBox" key={post.id}>
                        <div className="ImgBox">이미지</div>
                        <div className="ContentInfo">
                          <span>{post.author}</span>
                          <span>또가요({likedCount.length})</span>
                          <span>안가요({dislikedCount.lenght})</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                // 저장한 글 출력
                <div>
                  {savedPosts?.map((post) => {
                    const likedCount = allLikedData?.filter(
                      (data) => data.postId === post.id && data.state === "like"
                    );
                    const dislikedCount = allLikedData?.filter(
                      (data) =>
                        data.postId === post.id && data.state === "dislike"
                    );
                    return (
                      <div className="myListBox" key={post.id}>
                        <div className="ImgBox">이미지</div>
                        <div className="ContentInfo">
                          <span>{post.author}</span>
                          <span>또가요({likedCount.length})</span>
                          <span>안가요({dislikedCount.lenght})</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
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
