import { Link } from "react-router-dom";
import { styled } from "styled-components";
export const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 90px;
  padding: 0px 320px;
  z-index: 100;
`;

export const HomeLink = styled(Link)`
  display: block;
  width: 142px;
  height: 46px;
  background: url(${process.env.PUBLIC_URL}/image/logo_white.png) no-repeat
    center / contain;
`;

export const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 100px;
  font-size: 14px;
  font-weight: 400;
  color: #fff;

  & > a {
    color: #fff;
  }

  & > a:first-child {
    position: relative;
    padding-right: 16px;
  }

  & > a:first-child::after {
    content: "";
    position: absolute;
    right: 0;
    top: 50%;
    width: 1px;
    height: 12px;
    background-color: #fff;
    transform: translateY(-50%);
  }
  & > a:last-child,
  & > span {
    padding-left: 16px;
    cursor: pointer;
  }
`;
