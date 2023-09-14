import { Link } from "react-router-dom";
import styled from "styled-components";

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  text-align: center;

  & > p:first-of-type {
    margin: 60px 0 23px;
    color: #0a58be;
    font-size: 28px;
    font-weight: 600;
  }

  & > p:last-of-type {
    color: #777;
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 60px;
  }
`;

export const ImageBox = styled.div`
  width: 638px;
  height: 350px;
  background: url(${process.env.PUBLIC_URL}/image/404page.png) no-repeat center /
    100%;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 60px;
  & > a {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    width: 180px;
    height: 52px;
    border-radius: 60px;
    font-size: 18px;
    font-weight: 500;
    transition: 0.3s;
  }
`;

export const MainButton = styled(Link)`
  border: 1px solid #0a58be;
  background-color: #fff;
  color: #0a58be;
  & > div {
    width: 24px;
    height: 24px;
    background-image: url(${process.env.PUBLIC_URL}/icon/right_arrow_blue.svg);
    transition: 0.3s;
  }
`;

export const PrevButton = styled(Link)`
  border: 1px solid #0a58be;
  background-color: #0a58be;
  color: #fff;
  & > div {
    width: 24px;
    height: 24px;
    background-image: url(${process.env.PUBLIC_URL}/icon/right_arrow_white.svg);
    transition: 0.3s;
  }
`;
