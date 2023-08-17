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
import { Link, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/list" element={<NationPage />} />
        <Route path="/list/:category" element={<CategoryPage />} />
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
