import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const Footer = () => {
  const designerEmail = "sujeong.616.work@gmail.com";
  const treplayEmail = "treplay333@gmail.com";
  return (
    <FooterContainer>
      <FooterInner>
        <FooterTop>
          <LogoBox></LogoBox>
          <LegacyBox>
            <a href={`mailto:${treplayEmail}`} target="blank">
              고객불편신고
            </a>
            <a href={`mailto:${treplayEmail}`} target="blank">
              treplay333@gmail.com
            </a>
          </LegacyBox>
        </FooterTop>
        <FooterMain>
          <h3>Portfolio</h3>
          <div>
            <span>•</span>
            <span>김수정</span>
            <span>Designer</span>
            <a href={`mailto:${designerEmail}`} target="blank"></a>
          </div>
          <div>
            <span>•</span>
            <span>조윤건</span>
            <span>Developer (Front-end)</span>
            <a href={"https://github.com/yoongun97"} target="blank"></a>
          </div>
          <div>
            <span>•</span>
            <span>조유이</span>
            <span>Developer (Front-end)</span>
            <a href={"https://github.com/yui62yui"} target="blank"></a>
          </div>
          <div>
            <span>•</span>
            <span>윤현희</span>
            <span>Developer (Front-end)</span>
            <a href={"https://github.com/hyunheeyun"} target="blank"></a>
          </div>
        </FooterMain>
        <FooterBottom>
          <span>COPYRIGHT @ 2023 TREPLAY ALL RIGHT RESERVED</span>
        </FooterBottom>
      </FooterInner>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  position: relative;
  width: 100%;
  background-color: #222;
  color: #777;
  padding-bottom: 15px;
`;
const FooterInner = styled.div`
  width: 1280px;
  margin: 0 auto;
`;
const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 54px;
  padding: 15px 0;

  &::after {
    content: "";
    position: absolute;
    top: 54px;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #777;
  }
`;
const LogoBox = styled.div`
  width: 75px;
  height: 24px;
  background: url(${process.env.PUBLIC_URL}/image/logo_gray.png) no-repeat
    center / 100%;
`;
const LegacyBox = styled.div`
  & > a {
    padding: 0 10px;
    font-size: 14px;
    font-weight: 400;
    color: #777;
  }

  & > a:first-child {
    padding-left: 0;
  }

  & > a:nth-child(2) {
    position: relative;
  }
  & > a:nth-child(2)::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    width: 1px;
    height: 12px;
    transform: translateY(-50%);
    background-color: #777;
  }
  & > a:last-child {
    padding-right: 0;
  }
`;
const FooterMain = styled.div`
  padding: 15px 0;

  & > h3 {
    padding: 10px;
    font-size: 16px;
    font-weight: 600;
  }

  & > div {
    display: flex;
    align-items: center;
    padding: 8px;
    font-size: 14px;
    font-weight: 500;
  }

  & > div > span {
    margin-right: 6px;
  }

  & > div > a {
    display: block;
    width: 24px;
    height: 24px;
    margin-left: 4px;
    background: url(${process.env.PUBLIC_URL}/image/github_icon.png) no-repeat
      center / 100%;
  }

  & > div:first-of-type > a {
    width: 21px;
    height: 21px;
    background: url(${process.env.PUBLIC_URL}/image/design_icon.png) no-repeat
      center / cover;
  }
`;
const FooterBottom = styled.div`
  text-align: right;
  font-size: 14px;
  font-weight: 300;
`;
