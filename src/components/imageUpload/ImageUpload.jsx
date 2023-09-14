import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { storage, auth } from "../../firebaseConfig";
import React, { useState } from "react";
import { useAtom } from "jotai";
import { postAtom } from "../../store/postAtom";
import { useMutation } from "react-query";
import { userAtom } from "../../store/userAtom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import * as s from "./StyledImageUpload";
import Swal from "sweetalert2";

const MAX_IMAGE_SIZE_MB = 5; // 최대 허용 이미지 파일 크기 (MB 단위)
const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024; // MB를 바이트로 변환

function ImageUpload() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [post] = useAtom(postAtom);
  const [user] = useAtom(userAtom);
  const date = new Date();
  const navigate = useNavigate();
  //이미지 선택 이름,미리보기
  const [selectedFilePreviews, setSelectedFilePreviews] = useState();
  const [, setSelectedFileNames] = useState([]);

  // 이미지 파일 확장자를 확인하는 함수
  function isImageFile(fileName) {
    const allowedExtensions = ["jpg", "png", "gif", "jpeg"];
    const fileExtension = fileName.split(".").pop().toLowerCase();
    return allowedExtensions.includes(fileExtension);
  }

  // 이미지 파일 선택
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    for (const file of files) {
      if (!isImageFile(file.name)) {
        alert("파일은 jpg, png, jpeg, gif 형식의 파일만 업로드 가능합니다!");
        return;
      }
      if (file.size > MAX_IMAGE_SIZE_BYTES) {
        alert(`파일 크기는 ${MAX_IMAGE_SIZE_MB}MB를 초과할 수 없습니다!`);
        return;
      }
    }

    setSelectedFiles(files);

    //이미지 선택 이름,미리보기
    const previews = files.map((file) => URL.createObjectURL(file));
    setSelectedFilePreviews(previews);
    setSelectedFileNames(files.map((file) => file.name));
  };
  //미리보기 이미지 삭제
  const handleImageDeletePreview = (index) => {
    setSelectedFilePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
    setSelectedFileNames((prevNames) =>
      prevNames.filter((_, i) => i !== index)
    );
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  // 이미지 파일 업로드 함수
  const handleUpload = async (e) => {
    e.preventDefault();

    if (post.nation === "") {
      Swal.fire({ title: "나라를 선택해주세요.", icon: "warning" });
    } else if (post.category === "") {
      Swal.fire({ title: "카테고리를 선택해주세요.", icon: "warning" });
    } else if (post.category === "") {
      Swal.fire({ title: "카테고리를 선택해주세요.", icon: "warning" });
    } else if (post.placeName === "") {
      Swal.fire({ title: "장소를 선택해주세요.", icon: "warning" });
    } else if (post.postContent === "") {
      Swal.fire({ title: "내용을 입력해주세요.", icon: "warning" });
    } else if (selectedFiles.length === 0) {
      Swal.fire({ title: "파일을 선택해주세요.", icon: "warning" });
    } else {
      const newDownloadURLs = []; // 새로운 downloadURL 배열 생성

      // 각 이미지 파일을 순회하며 업로드
      for (const file of selectedFiles) {
        // ref 함수를 이용해서 Storage 내부 저장할 위치를 지정하고, uploadBytes 함수를 이용해서 파일을 저장합니다.
        const imageRef = ref(storage, `${auth.currentUser.uid}/${file.name}`);
        await uploadBytes(imageRef, file);

        const downloadURL = await getDownloadURL(imageRef);
        newDownloadURLs.push(downloadURL); // 새로운 downloadURL 배열에 추가
      }

      const updatedPost = { ...post, postImgs: newDownloadURLs };

      addMutation.mutate(updatedPost);

      setSelectedFiles([]);
      document.getElementById("file-input").value = ""; // 파일 선택 초기화
    }
  };

  const addMutation = useMutation(async (post) => {
    const newPost = {
      ...post,
      date: date,
      author: user.displayName,
      uid: user.uid,
    };

    const collectionRef = collection(db, "posts");
    const docRef = await addDoc(collectionRef, newPost);

    navigate(`/detail/${docRef.id}`);
  });

  return (
    <>
      <s.FileContainer>
        <s.TextContainer>
          <h4>첨부파일</h4>
          <p>
            .jpg .png .jpeg .gif 형식의 5mb 이하의 파일만 등록이 가능합니다.
          </p>
        </s.TextContainer>
        <s.StyledLabel>
          <img
            src={`${process.env.PUBLIC_URL}/icon/camera_icon_white.svg`}
            alt="File_icon"
          />
          <span>파일첨부</span>
          <s.FileInputBox
            id="file-input"
            type="file"
            onChange={handleFileSelect}
            multiple
            accept=".gif, .jpg, .png, .jpeg"
          />
        </s.StyledLabel>
      </s.FileContainer>
      <s.PreviewImagesContainer>
        {!!selectedFilePreviews ? (
          selectedFilePreviews.map((preview, index) => (
            <s.ImageBox key={index}>
              <img src={preview} alt={`미리보기${index + 1}`} />
              <button onClick={() => handleImageDeletePreview(index)}>x</button>
            </s.ImageBox>
          ))
        ) : (
          <>
            <s.NoImageBox>
              이미지를
              <br /> 첨부해주세요.
              <s.FileInputBox
                id="file-input"
                type="file"
                onChange={handleFileSelect}
                multiple
                accept=".gif, .jpg, .png, .jpeg"
              />
            </s.NoImageBox>
            <s.NoImageBox>
              이미지를
              <br /> 첨부해주세요.
              <s.FileInputBox
                id="file-input"
                type="file"
                onChange={handleFileSelect}
                multiple
                accept=".gif, .jpg, .png, .jpeg"
              />
            </s.NoImageBox>
            <s.NoImageBox>
              이미지를
              <br /> 첨부해주세요.
              <s.FileInputBox
                id="file-input"
                type="file"
                onChange={handleFileSelect}
                multiple
                accept=".gif, .jpg, .png, .jpeg"
              />
            </s.NoImageBox>
            <s.NoImageBox>
              이미지를
              <br /> 첨부해주세요.
              <s.FileInputBox
                id="file-input"
                type="file"
                onChange={handleFileSelect}
                multiple
                accept=".gif, .jpg, .png, .jpeg"
              />
            </s.NoImageBox>
            <s.NoImageBox>
              이미지를
              <br /> 첨부해주세요.
              <s.FileInputBox
                id="file-input"
                type="file"
                onChange={handleFileSelect}
                multiple
                accept=".gif, .jpg, .png, .jpeg"
              />
            </s.NoImageBox>
          </>
        )}
      </s.PreviewImagesContainer>
      <s.SubmitButton onClick={handleUpload}>저장</s.SubmitButton>
    </>
  );
}

export default ImageUpload;
