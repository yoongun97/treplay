import { Routes, Route, Link } from 'react-router-dom';
import Layout from './common/Layout';
import MainPage from './pages/mainpage/MainPage';
import NationPage from './pages/nationpage/NationPage';
import CategoryPage from './pages/categorypage/CategoryPage';
import DetailPage from './pages/detailpage/DetailPage';
import Create from './pages/create/Create';
import Edit from './pages/edit/Edit';
import MyPage from './pages/mypage/MyPage';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from './store/userAtom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';

function App() {
  const [, setUser] = useAtom(userAtom); // userAtom 사용

  // 옵저버 : 새로고침 하더라도 로그인 상태 유지
  useEffect(() => {
    // onAuthStateChanged 함수를 사용하여 인증 상태 변화 감지
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // 로그인된 사용자가 있으면 user.email 업데이트, 그게 아니라면 로그아웃 처리
      user ? setUser(user) : setUser(null);
    });
    // 컴포넌트가 언마운트될 때 옵저버 해제
    return () => unsubscribe();
    // setUser 함수가 업데이트될 때만 이펙트가 실행됨
  }, [setUser]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/:nation" element={<NationPage />} />
        <Route path="/:nation/:category" element={<CategoryPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/mypage/:uid" element={<MyPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      <Route
        path="*"
        element={
          <>
            <div>없는 페이지입니다.</div>
            <Link to="/">홈으로 이동</Link>
          </>
        }
      />
    </Routes>
  );
}

export default App;
