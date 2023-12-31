import { Routes, Route, Link } from "react-router-dom";
import Layout from "./common/Layout";
import MainPage from "./pages/mainpage/MainPage";
import NationPage from "./pages/nationpage/NationPage";
import CategoryPage from "./pages/categorypage/CategoryPage";
import DetailPage from "./pages/detailpage/DetailPage";
import Create from "./pages/create/Create";
import Edit from "./pages/edit/Edit";
import MyPage from "./pages/mypage/MyPage";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "./store/userAtom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import SuggestLogin from "./components/login/SuggestLogin";
import DownFindIDPW from "./components/findIDPW/DownFindIDPW";
import ErrorPage from "./pages/errorpage/ErrorPage";

function App() {
  const [, setUser] = useAtom(userAtom); // userAtom 사용
  const location = useLocation(); // 현재 경로 정보를 가져옴

  // 옵저버 : 새로고침 하더라도 로그인 상태 유지
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // 컴포넌트가 언마운트될 때 옵저버 해제
    return () => unsubscribe();
  }, [setUser]);

  useEffect(() => {
    // sessionstorage에 내가 들어온 url 저장
    // url이 login, signup, suggest, edit 페이지는 저장하지 않도록
    if (
      location.pathname !== "/login" &&
      location.pathname !== "/signup" &&
      location.pathname !== "/suggest" &&
      location.pathname !== "/edit/:id"
    ) {
      sessionStorage.setItem("url", location.pathname);
    }
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route element={<Layout />}>
        <Route path="/:nation" element={<NationPage />} />
        <Route path="/:nation/:category" element={<CategoryPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/create" element={<Create />} />
        <Route path="/suggest" element={<SuggestLogin />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/idpw/inquiry" element={<DownFindIDPW />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
