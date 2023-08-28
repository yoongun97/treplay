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

const Edit = () => {
  const { id } = useParams();
  const [post, setpost] = useState(null);
  const [editDetail, setEditDetail] = useState('');
  const [editImage, setEditImage] = useState(null);
  const navigate = useNavigate();
  //이미지 선택 이름,미리보기
  const [selectedFileNames, setSelectedFileNames] = useState([]);
  const [selectedFilePreviews, setSelectedFilePreviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const editPostData = doc(db, 'posts', id);
      const docSnapshot = await getDoc(editPostData);
      //detail페이지에서 전달 받은 텍스트
      if (docSnapshot.exists()) {
        setpost({ id: docSnapshot.id, ...docSnapshot.data() });
        setEditDetail(docSnapshot.data().postContent);
        console.log(docSnapshot.data().postContent);
      }
    };
    fetchData();
  }, [id]);

  const handlePostChange = (e) => {
    setEditDetail(e.target.value);
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
      if (editDetail !== undefined) {
        updateData.postContent = editDetail;
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
      alert('게시물 수정 오류');
      console.log(error);
    }
  };
  return (
    <div>
      {post ? (
        <div>
          <div>Edit Post</div>
          <div>
            {post.postImgs.map((imageUrl) => (
              <div key={imageUrl}>
                <img
                  src={imageUrl}
                  alt="디테일 이미지"
                  style={{ width: '200px', height: '200px' }}
                />
                <button onClick={() => handleImageDelete(imageUrl)}>x</button>
              </div>
            ))}
          </div>
          <textarea value={editDetail} onChange={handlePostChange} />
          <br />
          <input type="file" onChange={handleImageChange} multiple />
          <div>
            {selectedFilePreviews.map((preview, index) => (
              <div key={index}>
                <img
                  src={preview}
                  alt={`미리보기 이미지 ${index + 1}`}
                  style={{ width: '100px', height: '100px' }}
                />
                <p>{selectedFileNames[index]}</p>
                <button onClick={() => handleImageDeletePreview(index)}>
                  x
                </button>
              </div>
            ))}
          </div>
          <br />
          <button onClick={handlePostSave}>저장</button>
        </div>
      ) : (
        <div>데이터 가져오는 중...</div>
      )}
    </div>
  );
};

export default Edit;
