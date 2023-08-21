import React, { useState } from "react";
import SelectBox from "../../components/selectBox/SelectBox";
import PlaceAddress from "../../components/place/PlaceAddress";
import ImageUpload from "../../components/ImageUpload";
import { useAtom } from "jotai";
import { postAtom } from "../../store/postAtom";
import { userAtom } from "../../store/userAtom";
import { useMutation } from "react-query";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

function Create() {
  const [content, setContent] = useState();
  const [post] = useAtom(postAtom);
  const [user] = useAtom(userAtom);
  const date = new Date();
  const navigate = useNavigate();

  // const createBtnHandler = () => {};

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
      <div style={{ display: "flex" }}>
        <SelectBox />
      </div>
      <PlaceAddress />
      <div style={{ backgroundColor: "gray" }}>
        <textarea
          value={content}
          placeholder="내용을 작성하는 공간입니다."
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></textarea>
      </div>
      <ImageUpload />
      <button
        onClick={(e) => {
          addMutation.mutate(e);
        }}
      >
        작성 완료
      </button>
    </>
  );
}

export default Create;
