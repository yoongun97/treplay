import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db, storage } from "../../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { styled } from "styled-components";

const Edit = () => {
  const { id } = useParams();
  const [post, setpost] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [editOneLineContent, setEditOneLineContent] = useState("");
  const [editImage, setEditImage] = useState(null);
  const navigate = useNavigate();
  //이미지 선택 이름,미리보기
  const [selectedFileNames, setSelectedFileNames] = useState([]);
  const [selectedFilePreviews, setSelectedFilePreviews] = useState([]);
  //장소와 카테고리 받기
  const [nation, setNation] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const editPostData = doc(db, "posts", id);
      const docSnapshot = await getDoc(editPostData);
      //detail페이지에서 전달 받은 텍스트,장소와 카테고리 전달 받기
      if (docSnapshot.exists()) {
        setpost({ id: docSnapshot.id, ...docSnapshot.data() });
        setEditContent(docSnapshot.data().postContent);
        setEditOneLineContent(docSnapshot.data().postOneLineContent);
        setNation(docSnapshot.data().nation);
        setCategory(docSnapshot.data().category);
      }
    };
    fetchData();
  }, [id]);

  const handleContentChange = (e) => {
    setEditContent(e.target.value);
  };

  const handleOneLineContentChange = (e) => {
    setEditOneLineContent(e.target.value);
  };

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    //이미지 선택 이름,미리보기
    const fileNames = selectedImages.map((image) => image.name);
    setSelectedFileNames(fileNames);

    const previews = selectedImages.map((image) => URL.createObjectURL(image));
    setSelectedFilePreviews(previews);

    setEditImage(selectedImages);
  };

  const handleImageDelete = async (imageUrl) => {
    console.log("Deleting image:", imageUrl);
    try {
      // 이미지 Storage에서 삭제
      const imageDelete = ref(storage, imageUrl);
      await deleteObject(imageDelete);

      // 이미지 firebase postImgs 배열에서 제거
      const updatedImageUrls = post.postImgs.filter((url) => url !== imageUrl);

      // Firestore 데이터베이스 업데이트
      const editData = doc(db, "posts", id);
      await updateDoc(editData, { postImgs: updatedImageUrls });

      // 컴포넌트의 상태 업데이트
      setpost((prevPost) => ({ ...prevPost, postImgs: updatedImageUrls }));
    } catch (error) {
      console.error("이미지 삭제 오류:", error);
    }
  };
  //미리보기 이미지 삭제
  const handleImageDeletePreview = (index) => {
    setSelectedFilePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
    setSelectedFileNames((prevNames) =>
      prevNames.filter((_, i) => i !== index)
    );
    setEditImage((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handlePostSave = async () => {
    try {
      const editData = doc(db, "posts", id);
      // 업데이트할 필드와 값을 담을 빈 객체 생성
      const updateData = {};

      // 수정된 경우에만 업데이트
      if (editContent !== undefined) {
        updateData.postContent = editContent;
      }

      if (editOneLineContent !== undefined) {
        updateData.postOneLineContent = editOneLineContent;
      }

      if (editImage && editImage.length > 0) {
        const newImageUrls = [];

        for (const image of editImage) {
          const editImageData = ref(storage, `postImages/${id}/${image.name}`);
          await uploadBytes(editImageData, image);
          const editImageUrl = await getDownloadURL(editImageData);
          newImageUrls.push(editImageUrl);
        }

        updateData.postImgs = [...post.postImgs, ...newImageUrls];
      }

      await updateDoc(editData, updateData);

      navigate(`/detail/${id}`);
    } catch (error) {
      alert("게시물 수정 오류");
      console.log(error);
    }
  };
  return (
    <EditContainer>
      {post ? (
        <EditContainerInner>
          <h2>{post.placeName}</h2>
          <StyledTextarea value={editContent} onChange={handleContentChange} />
          <StyledInput
            maxLength="10"
            value={editOneLineContent}
            onChange={handleOneLineContentChange}
          />
          <FileContainer>
            <TextContainer>
              <h4>첨부파일</h4>
              <p>
                .jpg .png .jpeg 형식의 00mb 미만의 파일만 등록이 가능합니다.
              </p>
            </TextContainer>
            <StyledLabel>
              <img
                src={`${process.env.PUBLIC_URL}/icon/camera_icon_white.svg`}
                alt="File_icon"
              />
              <span>파일첨부</span>
              <FileInputBox type="file" onChange={handleImageChange} multiple />
            </StyledLabel>
          </FileContainer>
          <PreviewImagesContainer>
            {post.postImgs.map((imageUrl) => (
              <ImageBox key={imageUrl}>
                <img src={imageUrl} alt="디테일 이미지" />
                <button onClick={() => handleImageDelete(imageUrl)}>x</button>
              </ImageBox>
            ))}
            {selectedFilePreviews.map((preview, index) => (
              <ImageBox key={index}>
                <img src={preview} alt={`미리보기 이미지 ${index + 1}`} />
                {/* <p>{selectedFileNames[index]}</p> */}
                <button onClick={() => handleImageDeletePreview(index)}>
                  x
                </button>
              </ImageBox>
            ))}
          </PreviewImagesContainer>
          <SubmitButton onClick={handlePostSave}>저장</SubmitButton>
        </EditContainerInner>
      ) : (
        <div>데이터 가져오는 중...</div>
      )}
    </EditContainer>
  );
};

export default Edit;

const EditContainer = styled.div`
  width: 100%;
  text-align: center;
`;
const EditContainerInner = styled.div`
  display: flex;
  flex-direction: column;
  width: 1000px;
  max-width: 1000px;
  margin: 0 auto;

  & > h2 {
    margin-top: 40px;
  }
`;
const StyledTextarea = styled.textarea`
  width: 100%;
  height: 300px;
  margin-top: 40px;
  padding: 16px;
  font-size: 16px;
  font-weight: 300;
  line-height: 20px;
  border: 1px solid #e5e5e5;
  outline: 1px solid #999;
`;
const StyledInput = styled.input`
  width: 100%;
  height: 60px;
  margin: 20px auto;
  padding: 20px 16px;
  font-size: 16px;
  font-weight: 300;
  border: 1px solid #e5e5e5;
  outline: 1px solid #999;
`;
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
  cursor: pointer;
`;
