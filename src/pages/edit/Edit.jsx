import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db, storage } from '../../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from 'firebase/storage';
import * as s from './StyledEdit';
import Swal from 'sweetalert2';

const Edit = () => {
  const { id } = useParams();
  const [post, setpost] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [editOneLineContent, setEditOneLineContent] = useState('');
  const [editImage, setEditImage] = useState(null);
  const navigate = useNavigate();
  //이미지 선택 이름,미리보기
  const [selectedFileNames, setSelectedFileNames] = useState([]);
  const [selectedFilePreviews, setSelectedFilePreviews] = useState([]);
  //장소와 카테고리 받기
  const [nation, setNation] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const editPostData = doc(db, 'posts', id);
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
    console.log('Deleting image:', imageUrl);
    try {
      // 이미지 Storage에서 삭제
      const imageDelete = ref(storage, imageUrl);
      await deleteObject(imageDelete);

      // 이미지 firebase postImgs 배열에서 제거
      const updatedImageUrls = post.postImgs.filter((url) => url !== imageUrl);

      // Firestore 데이터베이스 업데이트
      const editData = doc(db, 'posts', id);
      await updateDoc(editData, { postImgs: updatedImageUrls });

      // 컴포넌트의 상태 업데이트
      setpost((prevPost) => ({ ...prevPost, postImgs: updatedImageUrls }));
    } catch (error) {
      console.error('이미지 삭제 오류:', error);
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
      const editData = doc(db, 'posts', id);
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
      Swal.fire({ title: '게시물 수정 오류', icon: 'warning' });
    }
  };
  return (
    <s.EditContainer>
      {post ? (
        <s.EditContainerInner>
          <h2>{post.placeName}</h2>
          <s.StyledTextarea
            value={editContent}
            onChange={handleContentChange}
          />
          <s.StyledInput
            maxLength="10"
            value={editOneLineContent}
            onChange={handleOneLineContentChange}
          />
          <s.FileContainer>
            <s.TextContainer>
              <h4>첨부파일</h4>
              <p>
                .jpg .png .jpeg 형식의 00mb 미만의 파일만 등록이 가능합니다.
              </p>
            </s.TextContainer>
            <s.StyledLabel>
              <img
                src={`${process.env.PUBLIC_URL}/icon/camera_icon_white.svg`}
                alt="File_icon"
              />
              <span>파일첨부</span>
              <s.FileInputBox
                type="file"
                onChange={handleImageChange}
                multiple
              />
            </s.StyledLabel>
          </s.FileContainer>
          <s.PreviewImagesContainer>
            {post.postImgs.map((imageUrl) => (
              <s.ImageBox key={imageUrl}>
                <img src={imageUrl} alt="디테일 이미지" />
                <button onClick={() => handleImageDelete(imageUrl)}>x</button>
              </s.ImageBox>
            ))}
            {selectedFilePreviews.map((preview, index) => (
              <s.ImageBox key={index}>
                <img src={preview} alt={`미리보기 이미지 ${index + 1}`} />
                {/* <p>{selectedFileNames[index]}</p> */}
                <button onClick={() => handleImageDeletePreview(index)}>
                  x
                </button>
              </s.ImageBox>
            ))}
          </s.PreviewImagesContainer>
          <s.SubmitButton onClick={handlePostSave}>저장</s.SubmitButton>
        </s.EditContainerInner>
      ) : (
        <div>데이터 가져오는 중...</div>
      )}
    </s.EditContainer>
  );
};

export default Edit;
