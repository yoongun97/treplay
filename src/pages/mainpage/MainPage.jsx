import React, { useEffect } from "react";
import Footer from "../../common/Footer";
import MainHeader from "./mainheader/MainHeader";
import * as s from "./StyledMainPage";
import MainCarousel from "../../components/imageslide/mainpageSlide/MainCarousel";

function MainPage() {
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
