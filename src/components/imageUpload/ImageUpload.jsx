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

const MAX_IMAGE_SIZE_MB = 5; // 최대 허용 이미지 파일 크기 (MB 단위)
const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024; // MB를 바이트로 변환

function ImageUpload() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [post] = useAtom(postAtom);
  const [user] = useAtom(userAtom);
  const date = new Date();
  const navigate = useNavigate();
  //이미지 선택 이름,미리보기
  const [selectedFilePreviews, setSelectedFilePreviews] = useState([]);
  const [selectedFileNames, setSelectedFileNames] = useState([]);

  // 이미지 파일 확장자를 확인하는 함수
  function isImageFile(fileName) {
    const allowedExtensions = ["jpg", "png", "gif"];
    const fileExtension = fileName.split(".").pop().toLowerCase();
    return allowedExtensions.includes(fileExtension);
  }

  // 이미지 파일 선택
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    for (const file of files) {
      if (!isImageFile(file.name)) {
        alert("파일은 jpg, png, gif 형식의 파일만 업로드 가능합니다!");
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

  // 선택한 이미지 파일 삭제

  const handleDelete = (fileName) => {
    const updatedFiles = selectedFiles.filter((file) => file.name !== fileName);
    setSelectedFiles(updatedFiles);
    document.getElementById("file-input").value = ""; // 파일 선택 초기화
  };

  // 이미지 파일 업로드 함수
  const handleUpload = async (e) => {
    e.preventDefault();

    if (post.nation === "") {
      alert("나라를 선택해주세요.");
    } else if (post.category === "") {
      alert("카테고리를 선택해주세요.");
    } else if (post.category === "") {
      alert("카테고리를 선택해주세요.");
    } else if (post.placeName === "") {
      alert("장소를 선택해주세요.");
    } else if (post.postContent === "") {
      alert("내용을 입력해주세요.");
    } else if (selectedFiles.length === 0) {
      alert("파일을 선택해주세요.");
    } else {
      const newDownloadURLs = []; // 새로운 downloadURL 배열 생성

      // 각 이미지 파일을 순회하며 업로드
      for (const file of selectedFiles) {
        // ref 함수를 이용해서 Storage 내부 저장할 위치를 지정하고, uploadBytes 함수를 이용해서 파일을 저장합니다.
        const imageRef = ref(storage, `${auth.currentUser.uid}/${file.name}`);
        await uploadBytes(imageRef, file);

        // 파일 URL 가져오기
        const downloadURL = await getDownloadURL(imageRef);
        newDownloadURLs.push(downloadURL); // 새로운 downloadURL 배열에 추가
      }

      // 업로드된 이미지 URL을 포스트에 추가
      const updatedPost = { ...post, postImgs: newDownloadURLs };

      // 포스트 업데이트 후 데이터베이스에 추가
      addMutation.mutate(updatedPost);

      // 업로드 후 선택한 파일 목록 초기화
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

    // Firestore에서 'posts' 컬렉션에 대한 참조 생성하기
    const collectionRef = collection(db, "posts");
    // 'posts' 컬렉션에 newPost 문서를 추가합니다.
    const docRef = await addDoc(collectionRef, newPost);

    // 추가한 문서의 ID를 이용하여 상세 페이지로 이동
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
        {/* edit페이지와 같은 로직 */}
        {selectedFilePreviews.map((preview, index) => (
          <s.ImageBox key={index}>
            <img src={preview} alt={`미리보기${index + 1}`} />
            <button onClick={() => handleImageDeletePreview(index)}>x</button>
          </s.ImageBox>
        ))}
      </s.PreviewImagesContainer>
      <s.SubmitButton onClick={handleUpload}>저장</s.SubmitButton>
    </>
  );
}

export default ImageUpload;