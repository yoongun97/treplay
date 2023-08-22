import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { storage, auth } from "../firebaseConfig";
import React, { useState } from "react";
import { useAtom } from "jotai";
import { postAtom } from "../store/postAtom";
import { useMutation } from "react-query";
import { userAtom } from "../store/userAtom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

function ImageUpload({ content }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [post, setPost] = useAtom(postAtom);
  const [user] = useAtom(userAtom);
  const date = new Date();
  const navigate = useNavigate();

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
      setPost({ ...post, postImgs: newDownloadURLs });
    }

    addMutation.mutate(e);

    // 업로드 후 선택한 파일 목록 초기화
    setSelectedFiles([]);
    document.getElementById("file-input").value = ""; // 파일 선택 초기화
  };

  const addMutation = useMutation(async (event) => {
    event.preventDefault();

    const newPost = {
      ...post,
      date: date,
      author: user.displayName,
      uid: user.uid,
      postContent: content,
    };

    // Firestore에서 'todos' 컬렉션에 대한 참조 생성하기
    const collectionRef = collection(db, "posts");
    // 'todos' 컬렉션에 newTodo 문서를 추가합니다.
    const docRef = await addDoc(collectionRef, newPost);

    // 추가한 문서의 ID를 이용하여 상세 페이지로 이동
    navigate(`/detail/${docRef.id}`);
  });

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
      <button onClick={handleUpload}>작성 완료</button>
    </>
  );
}

export default ImageUpload;
