import React from "react";
import SelectBox from "../../components/selectBox/SelectBox";
import PlaceAddress from "../../components/place/PlaceAddress";
import ImageUpload from "../../components/ImageUpload";
import { useAtom } from "jotai";
import { postAtom } from "../../store/postAtom";
import { userAtom } from "../../store/userAtom";
import { QueryClient, useMutation } from "react-query";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";

function Create() {
  const [post, setPost] = useAtom(postAtom);
  const [user] = useAtom(userAtom);
  const queryClient = new QueryClient();
  const date = new Date();

  // const createBtnHandler = () => {};

  const addMutation = useMutation(
    async (event) => {
      event.preventDefault();

      setPost({ ...post, date: date, author: user.nickname, uid: user.uid });

      // Firestore에서 'todos' 컬렉션에 대한 참조 생성하기
      const collectionRef = collection(db, "posts");
      // 'todos' 컬렉션에 newTodo 문서를 추가합니다.
      await addDoc(collectionRef, post);
    },
    // 데이터 추가 후 화면 바로 변경
    {
      onSuccess: () => {
        queryClient.invalidateQueries("posts");
      },
    }
  );

  return (
    <>
      <div style={{ display: "flex" }}>
        <SelectBox />
      </div>
      <PlaceAddress />
      <div style={{ backgroundColor: "gray" }}>
        <textarea
          value={post.postContent}
          placeholder="내용을 작성하는 공간입니다."
          onChange={(e) => {
            setPost({ ...post, postContent: e.target.value });
          }}
        ></textarea>
      </div>
      <ImageUpload />
      <button
        onClick={() => {
          addMutation.mutate();
        }}
      >
        작성 완료
      </button>
    </>
  );
}

export default Create;
