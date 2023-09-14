import React, { useState } from "react";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { useMutation } from "react-query";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../../../firebaseConfig";

function CarouselImgUpload() {
  // 캐러셀 이미지 업로드
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [post, setPost] = useState({});

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
    } else {
      const newDownloadURLs = []; // 새로운 downloadURL 배열 생성

      // 각 이미지 파일을 순회하며 업로드
      for (const file of selectedFiles) {
        // ref 함수를 이용해서 Storage 내부 저장할 위치를 지정하고, uploadBytes 함수를 이용해서 파일을 저장합니다.
        const imageRef = ref(storage, `nationcarousel/${file.name}`);
        await uploadBytes(imageRef, file);

        // 파일 URL 가져오기
        const downloadURL = await getDownloadURL(imageRef);
        newDownloadURLs.push(downloadURL); // 새로운 downloadURL 배열에 추가
      }

      // 업로드된 이미지 URL을 포스트에 추가
      const updatedPost = { ...post, imgUrls: newDownloadURLs };

      // 포스트 업데이트 후 데이터베이스에 추가
      addMutation.mutate(updatedPost);

      // 업로드 후 선택한 파일 목록 초기화
      setSelectedFiles([]);
      document.getElementById("file-input").value = ""; // 파일 선택 초기화
    }
  };

  const addMutation = useMutation(async (post) => {
    const collectionRef = collection(db, "imgs");
    await addDoc(collectionRef, post);
    setPost({});
  });
  return (
    <div>
      {/* carousel 이미지 업로드 */}
      <input id="file-input" type="file" onChange={handleFileSelect} multiple />
      <div>
        {selectedFiles.map((file, index) => (
          <div key={index}>
            {file.name}{" "}
            <button onClick={() => handleDelete(file.name)}>x</button>
          </div>
        ))}
      </div>
      <input
        value={post.category}
        onChange={(e) => {
          setPost({ ...post, category: e.target.value });
        }}
      ></input>
      <button onClick={handleUpload}>작성 완료</button>
    </div>
  );
}

export default CarouselImgUpload;
