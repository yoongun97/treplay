import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { userAtom } from '../../store/userAtom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useParams } from 'react-router-dom';
import SavedList from './components/savedList/SavedList';
import { useQuery } from 'react-query';
import ProfileImage from './components/profileImage/ProfileImage';
import SuggestLogin from '../../components/login/SuggestLogin';
import Nickname from './components/nickname/Nickname';
import PageNation from '../../components/pageNation/PageNation';
import MyList from './components/myList/MyList';
import * as s from './StyledMyPage';
import Swal from 'sweetalert2';

function MyPage() {
  const [user] = useAtom(userAtom);
  const userUidObject = useParams();
  const userUid = userUidObject.uid;

  const [allData, setAllData] = useState([]);
  const [ownData, setOwnData] = useState([]);
  const [allLikedData, setAllLikedData] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [isMyListActived, setIsMyListActived] = useState(true);

  // 페이지네이션 설정
  const [currentPage, setCurrentPage] = useState(1);
  const postsViewPage = 3; // 한 페이지에 보여줄 게시물 수

  const fetchData = async () => {
    // 유저 데이터
    const userQ = query(collection(db, 'users'));
    const querySnapshot = await getDocs(userQ);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setAllData(data);
    setOwnData(data.find((item) => item.uid === userUid));

    // 또가요 데이터
    const likedQ = query(collection(db, 'likes'));
    const likedQuerySnapshot = await getDocs(likedQ);
    const likedData = likedQuerySnapshot.docs.map((doc) => doc.data());

    // 모든 좋아요 데이터 저장
    setAllLikedData(likedData);

    // 내 저장 데이터
    const savedQ = query(collection(db, 'saved'), where('uid', '==', userUid));
    const savedQuerySnapshot = await getDocs(savedQ);
    const savedData = savedQuerySnapshot.docs.map((doc) => doc.data());

    // 모든 글 데이터
    const postsQ = query(collection(db, 'posts'));
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
  //페이지 네이션
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

  // 리액트 쿼리로 로딩/에러 처리

  const { isLoading, isError, error } = useQuery('userData', fetchData);

  if (isLoading) {
    return <div>로딩 중입니다...</div>;
  }

  if (isError) {
    return Swal.fire({
      title: `에러 발생! Error Code: ${error.message}`,
      icon: 'error',
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
            <s.ListContainerInner>
              {/* 버튼 전환에 따른 리스트 변환 */}
              {isMyListActived === true ? (
                <MyList
                  myPosts={myPosts.slice(
                    (currentPage - 1) * postsViewPage,
                    currentPage * postsViewPage
                  )}
                  setMyPosts={setMyPosts}
                  allLikedData={allLikedData}
                />
              ) : (
                <SavedList
                  savedPosts={savedPosts.slice(
                    (currentPage - 1) * postsViewPage,
                    currentPage * postsViewPage
                  )}
                  allLikedData={allLikedData}
                />
              )}
            </s.ListContainerInner>
          </s.ListContainer>
          <PageNation
            postsViewPage={postsViewPage}
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
