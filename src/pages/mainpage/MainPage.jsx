import React from "react";
import Footer from "../../common/Footer";
import MainHeader from "./mainheader/MainHeader";
import * as s from "./StyledMainPage";

function MainPage() {
  return (
    <>
      <s.MainContainer>
        <MainHeader />
        <s.MainInner>
          <h2>어떤 여행지를 가고 싶으신가요?</h2>
          <s.ButtonContainer>
            <s.PrevButton />
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
            <s.NextButton />
          </s.ButtonContainer>
        </s.MainInner>
      </s.MainContainer>
      <Footer />
    </>
  );
}

export default MainPage;
