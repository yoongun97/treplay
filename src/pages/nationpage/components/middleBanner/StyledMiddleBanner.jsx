import { styled } from "styled-components";

export const MiddleBannerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 140px 0;
  background-color: #fff;
`;
export const ImageBox = styled.div`
  width: 400px;
  height: 400px;
  border-radius: 30px;
  background-color: #999;

  &:first-child {
    background-image: url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80");
    margin-right: 20px;
    background-size: 250%;
    background-position: center -180px;
  }

  &:nth-child(2) {
    background-image: url("https://images.unsplash.com/photo-1522199710521-72d69614c702?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80");
    margin-right: 20px;
    background-size: cover;
    background-position: -70px;
  }
`;

export const MiddleBannerPhrasesBox = styled.div`
  width: 330px;
  margin-left: 80px;

  & > h3 {
    margin: 16px 0px 12px;
    color: #222;
    font-weight: 600;
    font-size: 22px;
  }

  & > div {
    margin-bottom: 16px;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    color: #878d94;

    & > span {
      overflow: hidden;
      white-space: normal;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
      word-break: keep-all;
    }
  }
`;
export const MoreInfoButton = styled.a`
  display: flex;

  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 180px;
  height: 52px;
  border-radius: 60px;
  border: 1px solid #0a58be;
  background-color: #fff;
  color: #0a58be;
  font-size: 18px;
  font-weight: 500;
  transition: 0.3s;

  &:hover {
    background-color: #0a58be;
    color: #fff;
  }

  & > div {
    width: 24px;
    height: 24px;
    background-image: url(${process.env.PUBLIC_URL}/icon/right_arrow_blue.svg);
    transition: 0.3s;
  }

  &:hover > div {
    background-image: url(${process.env.PUBLIC_URL}/icon/right_arrow_white.svg);
  }
`;
