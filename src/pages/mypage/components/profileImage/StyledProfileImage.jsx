import { styled } from "styled-components";

export const ProfileImageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 140px;
  height: 140px;
  margin: 60px auto 20px;
  border-radius: 50%;
  border: 3px solid #0a58be;
  background-color: #fff;

  & > img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const FileButton = styled.div`
  position: absolute;
  bottom: 14px;
  right: -6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #f1f1f1;

  & > label {
    position: relative;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    cursor: pointer;
  }

  & > label::after {
    content: "";
    position: absolute;
    top: 25%;
    right: 25%;
    display: block;
    width: 20px;
    height: 20px;
    background: url(${process.env.PUBLIC_URL}/icon/camera_icon_black.svg)
      no-repeat;
  }

  & > label > input {
    display: none;
    z-index: 20;
  }
`;
