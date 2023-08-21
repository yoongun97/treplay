import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { storage, auth } from "../firebaseConfig";
import React, { useState } from "react";
import { useAtom } from "jotai";
import { postAtom } from "../store/postAtom";

function ImageUpload() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [post, setPost] = useAtom(postAtom);

  // 이미지 파일 선택
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  // 선택한 이미지 파일 삭제
  const handleDelete = (fileName) => {
    const updatedFiles = selectedFiles.filter((file) => file.name !== fileName);
    setSelectedFiles(updatedFiles);
    document.getElementById("file-input").value = ""; // 파일 선택 초기화
  };

  // 이미지 파일 업로드 함수
  const handleUpload = async (e) => {
    e.preventDefault();

    if (selectedFiles.length === 0) {
      alert("파일을 선택해주세요.");
      return;
    }

    const newDownloadURLs = []; // 새로운 downloadURL 배열 생성

    // 각 이미지 파일을 순회하며 업로드
    for (const file of selectedFiles) {
      // ref 함수를 이용해서 Storage 내부 저장할 위치를 지정하고, uploadBytes 함수를 이용해서 파일을 저장합니다.
      const imageRef = ref(storage, `${auth.currentUser.uid}/${file.name}`);
      await uploadBytes(imageRef, file);

      // 파일 URL 가져오기
      const downloadURL = await getDownloadURL(imageRef);
      newDownloadURLs.push(downloadURL); // 새로운 downloadURL 배열에 추가
      console.log(newDownloadURLs);
      setPost({ ...post, postImgs: newDownloadURLs });
    }

    // 업로드 후 선택한 파일 목록 초기화
    setSelectedFiles([]);
    document.getElementById("file-input").value = ""; // 파일 선택 초기화
  };

  return (
    <>
      <input id="file-input" type="file" onChange={handleFileSelect} multiple />
      <div>
        {selectedFiles.map((file, index) => (
          <div key={index}>
            {file.name}{" "}
            <button onClick={() => handleDelete(file.name)}>x</button>
          </div>
        ))}
      </div>
      <button onClick={handleUpload}>Upload</button>
    </>
  );
}

export default ImageUpload;
