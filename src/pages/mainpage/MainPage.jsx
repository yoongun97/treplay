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
          {/* <s.ButtonContainer> */}
          {/* <s.PrevButton />
            <s.NationContainer>
              <s.NationInner>
                <s.StyledButton to={"/한국"}>
                  <span>한국</span>
                </s.StyledButton>
                <s.StyledButton to={"/일본"}>
                  <span>일본</span>
                </s.StyledButton>
                <s.StyledButton to={"/미국"}>
                  <span>미국</span>
                </s.StyledButton>
              </s.NationInner>
            </s.NationContainer>
            <s.NextButton /> */}
          <MainCarousel />
          {/* </s.ButtonContainer> */}
        </s.MainInner>
      </s.MainContainer>
      <Footer />
    </>
  );
}

export default MainPage;
