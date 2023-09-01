import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

const TopButton = () => {
  const [topButton, setTopButton] = useState(false);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    const handleTopButton = () => {
      if (window.scrollY > 800) {
        setTopButton(true);
      } else {
        setTopButton(false);
      }
    };
    window.addEventListener("scroll", handleTopButton);
    return () => {
      window.removeEventListener("scroll", handleTopButton);
    };
  }, []);

  return (
    topButton && (
      <TopButtonContainer>
        <button id="top" onClick={scrollToTop} type="button">
          {" "}
        </button>
      </TopButtonContainer>
    )
  );
};

export default TopButton;

const TopButtonContainer = styled.div`
  & > button {
    position: fixed;
    bottom: 100px;
    right: 110px;
    width: 100px;
    height: 100px;
    background: url(${process.env.PUBLIC_URL}/image/topbutton_blue.png)
      no-repeat center / cover;
    border: none;
    z-index: 100;
  }
`;
