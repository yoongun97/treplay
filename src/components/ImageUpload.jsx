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
import { styled } from "styled-components";

function ImageUpload() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [post] = useAtom(postAtom);
  const [user] = useAtom(userAtom);
  const date = new Date();
  const navigate = useNavigate();
  //이미지 선택 이름,미리보기
  const [selectedFilePreviews, setSelectedFilePreviews] = useState([]);
  const [selectedFileNames, setSelectedFileNames] = useState([]);

  // 이미지 파일 선택
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
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
      <FileContainer>
        <TextContainer>
          <h4>첨부파일</h4>
          <p>.jpg .png .jpeg 형식의 00mb 미만의 파일만 등록이 가능합니다.</p>
        </TextContainer>
        <StyledLabel>
          <img
            src={`${process.env.PUBLIC_URL}/icon/camera_icon_white.svg`}
            alt="File_icon"
          />
          <span>파일첨부</span>
          <FileInputBox
            id="file-input"
            type="file"
            onChange={handleFileSelect}
            multiple
          />
        </StyledLabel>
      </FileContainer>
      <PreviewImagesContainer>
        {/* edit페이지와 같은 로직 */}
        {selectedFilePreviews.map((preview, index) => (
          <ImageBox key={index}>
            <img src={preview} alt={`미리보기${index + 1}`} />
            <button onClick={() => handleImageDeletePreview(index)}>x</button>
          </ImageBox>
        ))}
      </PreviewImagesContainer>
      <SubmitButton onClick={handleUpload}>저장</SubmitButton>
    </>
  );
}

export default ImageUpload;

const FileContainer = styled.div`
  margin: 80px 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const TextContainer = styled.div`
  text-align: left;
  & > h4 {
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 20px;
  }

  & > p {
    font-size: 18px;
    font-weight: 300;
    line-height: 20px;
    color: #bfbfbf;
  }
`;
const StyledLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 120px;
  height: 46px;
  border-radius: 8px;
  background-color: #0a58be;
  color: #fff;
  font-size: 16px;
  font-weight: 300;
  cursor: pointer;
  & > span:first-child {
    width: 20px;
    height: 20px;
  }
  & > input {
    display: none;
  }
`;
const FileInputBox = styled.input`
  margin: 20px auto;
`;

const PreviewImagesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 120px);
  gap: 12px;
`;
const ImageBox = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 8px;
  background-color: #cdcdcd;

  & > img {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    object-fit: cover;
  }

  & > button {
    position: absolute;
    top: -4px;
    right: -4px;
    width: 18px;
    height: 18px;
    margin: 10px;
    border: none;
    outline: none;
    background-color: none;
    background: url(${process.env.PUBLIC_URL}/icon/delete_icon.svg) no-repeat
      center / 100%;
  }
`;
const SubmitButton = styled.div`
  width: 500px;
  height: 60px;
  margin: 140px auto;
  border-radius: 60px;
  background-color: #0a58be;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  line-height: 60px;
  text-align: center;
  cursor: pointer;
`;
