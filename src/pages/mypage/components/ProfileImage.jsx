import { useAtom } from "jotai";
import React from "react";
import { userAtom } from "../../../store/userAtom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, storage } from "../../../firebaseConfig";
import { updateProfile } from "firebase/auth";
import { styled } from "styled-components";

const ProfileImage = ({ fetchData }) => {
  const [user] = useAtom(userAtom);

  // 프로필 사진 업로드 및 변경 핸들러
  const uploadPhotoHandler = (e) => {
    try {
      const image = e.target.files[0];
      const imageRef = ref(storage, `ProfileImages/${image.name}`);
      uploadBytes(imageRef, image).then(() => {
        getDownloadURL(imageRef).then(async (url) => {
          await updateProfile(auth.currentUser, {
            photoURL: url,
          });
          fetchData();
          alert("프로필 수정 완료!");
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProfileImageContainer>
      {user.photoURL ? (
        <img src={user.photoURL} alt="프로필 이미지" />
      ) : (
        <img
          src={`${process.env.PUBLIC_URL}/image/baseprofile.jpeg`}
          alt="프로필 이미지 미등록"
        />
      )}
      <FileButton>
        <label>
          <input type="file" onChange={(e) => uploadPhotoHandler(e)}></input>
        </label>
      </FileButton>
    </ProfileImageContainer>
  );
};

export default ProfileImage;

const ProfileImageContainer = styled.div`
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

const FileButton = styled.div`
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
