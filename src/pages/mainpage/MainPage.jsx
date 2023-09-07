import React, { useEffect } from "react";
import Footer from "../../common/Footer";
import MainHeader from "./mainheader/MainHeader";
import * as s from "./StyledMainPage";
import MainCarousel from "../../components/imageslide/mainpageSlide/MainCarousel";

function MainPage() {
  // Clean Up 함수를 이용해 페이지 언마운트 시 스크롤 가장 위로
  useEffect(() => {
    return () => {
      window.scrollTo(0, 0);
    };
  }, []);

  return (
    <>
      <s.MainContainer>
        <MainHeader />
        <s.MainInner>
          <h2>어떤 여행지를 가고 싶으신가요?</h2>
          <MainCarousel />
        </s.MainInner>
      </s.MainContainer>
      <Footer />
    </>
  );
}

export default MainPage;
