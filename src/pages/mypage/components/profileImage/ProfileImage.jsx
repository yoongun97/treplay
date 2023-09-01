import { useAtom } from "jotai";
import React from "react";
import { userAtom } from "../../../../store/userAtom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, storage } from "../../../../firebaseConfig";
import { updateProfile } from "firebase/auth";
import * as s from "./StyledProfileImage";

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
    <s.ProfileImageContainer>
      {user.photoURL ? (
        <img src={user.photoURL} alt="프로필 이미지" />
      ) : (
        <img
          src={`${process.env.PUBLIC_URL}/image/baseprofile.jpeg`}
          alt="프로필 이미지 미등록"
        />
      )}
      <s.FileButton>
        <label>
          <input type="file" onChange={(e) => uploadPhotoHandler(e)}></input>
        </label>
      </s.FileButton>
    </s.ProfileImageContainer>
  );
};

export default ProfileImage;
