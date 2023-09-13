import { useAtom } from "jotai";
import React, { useState } from "react";
import { userAtom } from "../../store/userAtom";
import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
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
  const uid = user?.uid;

  const [allData, setAllData] = useState([]);
  const [ownData, setOwnData] = useState([]);
  const [allLikedData, setAllLikedData] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [isMyListActived, setIsMyListActived] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async () => {
    if (!uid) {
      return [];
    }
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
      const likedData = likedQuerySnapshot.docs.map((doc) => doc.data());
      const savedData = savedQuerySnapshot.docs.map((doc) => doc.data());
      const postsData = postsQuerySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setAllData(userDocData);
      setOwnData(userDocData.find((item) => item.uid === uid));

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

  const activeSavedListHandler = () => {
    setIsMyListActived(false);
    setCurrentPage(1);
  };
  const activeMyListHandler = () => {
    setIsMyListActived(true);
    setCurrentPage(1);
  };

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

      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
    },
    {
      onMutate: () => {
        const updatedPosts = myPosts.filter((p) => p.uid !== uid);
        setMyPosts(updatedPosts);
      },
    }
  );

  const { isLoading, isError, error } = useQuery(["userData", uid], fetchData);

  if (isError) {
    return Swal.fire({
      title: `에러 발생! Error Code: ${error.message}`,
      icon: "error",
    });
  }

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
        <SuggestLogin />
      )}
    </>
  );
}

export default MyPage;
