import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { userAtom } from "../../store/userAtom";
import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useParams } from "react-router-dom";
import SavedList from "./components/savedList/SavedList";
import { useMutation, useQuery } from "react-query";
import ProfileImage from "./components/profileImage/ProfileImage";
import SuggestLogin from "../../components/login/SuggestLogin";
import Nickname from "./components/nickname/Nickname";
import PageNation from "../../components/pageNation/PageNation";
import MyList from "./components/myList/MyList";
import * as s from "./StyledMyPage";
import Swal from "sweetalert2";
import SkeletonCard from "../../components/skeletonUI/skeletonCard/SkeletonCard";

const POSTS_VIEW_PAGE = 3;

function MyPage() {
  const [user] = useAtom(userAtom);
  const { uid } = useParams();

  const [allData, setAllData] = useState([]);
  const [ownData, setOwnData] = useState([]);
  const [allLikedData, setAllLikedData] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [isMyListActived, setIsMyListActived] = useState(true);

  // 페이지네이션 설정
  const [currentPage, setCurrentPage] = useState(1);

  //promise.all 로 관리하기
  const fetchData = async () => {
    const userQ = query(collection(db, "users"));
    const likedQ = query(collection(db, "likes"));
    const savedQ = query(collection(db, "saved"), where("uid", "==", uid));
    const postsQ = query(collection(db, "posts"));

    try {
      const [
        userQuerySnapshot,
        likedQuerySnapshot,
        savedQuerySnapshot,
        postsQuerySnapshot,
      ] = await Promise.all([
        getDocs(userQ),
        getDocs(likedQ),
        getDocs(savedQ),
        getDocs(postsQ),
      ]);
      const userDocData = userQuerySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const likedData = likedQuerySnapshot.docs.map((doc) => doc.data);
      const savedData = savedQuerySnapshot.docs.map((doc) => doc.data);
      const postsData = postsQuerySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setAllData(userDocData);
      setOwnData(postsData.find((item) => item.uid === uid));

      setAllLikedData(likedData);
      setMyPosts(postsData.filter((data) => data.uid === uid));

      const filteredData = postsData.filter((post) =>
        savedData.some((data) => post.id === data.postId)
      );
      setSavedPosts(filteredData);
    } catch (error) {
      console.error("데이터 가져오기 오류:", error);
    }
  };

  // 처음 랜더링 될 때 likes / posts db에서 user의 uid와 동일한 uid 가 있는 것들만 정보 가져옴

  useEffect(() => {
    if (!isMyListActived) {
      setMyPosts(savedPosts);
      fetchData();
    } else {
      setMyPosts(myPosts);
      fetchData();
    }
  }, [isMyListActived]);
  // 버튼 클릭 시 리스트 전환 함수
  const activeSavedListHandler = () => {
    setIsMyListActived(false);
    setCurrentPage(1);
  };
  const activeMyListHandler = () => {
    setIsMyListActived(true);
    setCurrentPage(1);
  };

  // 게시물 전체삭제
  const deleteAllHandler = async () => {
    const result = await Swal.fire({
      title: "작성한 모든 게시물을 삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "예",
      cancelButtonText: "아니오",
    });

    if (result.isConfirmed) {
      deleteMutation.mutate(uid);
      return Swal.fire({ title: "글이 삭제되었습니다!", icon: "success" });
    } else {
      return;
    }
  };

  const deleteMutation = useMutation(
    async () => {
      const postsCollection = collection(db, "posts");
      const q = query(postsCollection, where("uid", "==", uid));
      const querySnapshot = await getDocs(q);

      // 현재 URL에서 받은 uid와 일치하는 게시물 삭제
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
    },
    {
      onMutate: () => {
        // 삭제 전 게시물을 myPosts에서 제거하여 새로운 배열 생성
        const updatedPosts = myPosts.filter((p) => p.uid !== uid);
        setMyPosts(updatedPosts);
      },
    }
  );

  // 리액트 쿼리로 로딩/에러 처리
  const { isLoading, isError, error } = useQuery(["userData", uid], fetchData);

  if (isError) {
    return Swal.fire({
      title: `에러 발생! Error Code: ${error.message}`,
      icon: "error",
    });
  }

  // 페이지 변경 이벤트 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {user ? (
        <s.MypageContainer>
          <s.UserInfoInner>
            <h3>마이페이지</h3>
            <div>
              {/* 프로필 이미지/닉네임 컴포넌트 분리 */}
              <ProfileImage fetchData={fetchData} />
              <Nickname
                ownData={ownData}
                allData={allData}
                fetchData={fetchData}
              />
            </div>
          </s.UserInfoInner>
          <s.ListContainer>
            <s.ButtonContainer>
              <s.ChangeButtonContainer>
                {/* 내가 쓴 글/ 저장한 글 전환 버튼 */}
                <s.ChangeButton
                  onClick={activeMyListHandler}
                  selected={isMyListActived}
                >
                  <span>내가 쓴 글</span>
                </s.ChangeButton>
                <s.ChangeButton
                  onClick={activeSavedListHandler}
                  selected={!isMyListActived}
                >
                  <span>저장한 글</span>
                </s.ChangeButton>
              </s.ChangeButtonContainer>
              {isMyListActived && (
                <s.AllDeleteBtn onClick={deleteAllHandler}>
                  전체삭제
                </s.AllDeleteBtn>
              )}
            </s.ButtonContainer>
            {isLoading ? (
              <SkeletonCard />
            ) : (
              <s.ListContainerInner>
                {/* 버튼 전환에 따른 리스트 변환 */}
                {isMyListActived ? (
                  <MyList
                    myPosts={myPosts.slice(
                      (currentPage - 1) * POSTS_VIEW_PAGE,
                      currentPage * POSTS_VIEW_PAGE
                    )}
                    setMyPosts={setMyPosts}
                    allLikedData={allLikedData}
                  />
                ) : (
                  <SavedList
                    savedPosts={savedPosts.slice(
                      (currentPage - 1) * POSTS_VIEW_PAGE,
                      currentPage * POSTS_VIEW_PAGE
                    )}
                    allLikedData={allLikedData}
                  />
                )}
              </s.ListContainerInner>
            )}
          </s.ListContainer>
          <PageNation
            postsViewPage={POSTS_VIEW_PAGE}
            totalPosts={isMyListActived ? myPosts.length : savedPosts.length}
            currentPage={currentPage}
            pagenate={handlePageChange}
          />
        </s.MypageContainer>
      ) : (
        // 비회원일 경우에 Unloggined 컴포넌트 보여 주기
        <SuggestLogin />
      )}
    </>
  );
}

export default MyPage;
