import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { useParams } from "react-router";
import { userAtom } from "../../store/userAtom";
import { useAtom } from "jotai";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Bookmark = () => {
  const { id } = useParams();
  const [isSaved, setIsSaved] = useState(false);
  const [user] = useAtom(userAtom);
  const navigate = useNavigate();

  const fetchData = async () => {
    const q = query(collection(db, "saved"), where("postId", "==", id));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => doc.data());

    if (user) {
      const userSavedData = data?.find((doc) => doc.uid === user.uid);

      if (!!userSavedData === true) {
        setIsSaved(true);
      }
    }
    // const userOwnData = data?.find((doc) => doc.uid === user.uid);
  };

  useEffect(() => {
    setIsSaved(false);
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [isSaved]);

  const bookmarkHandler = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/suggest");
    } else {
      if (isSaved === false) {
        const newSaved = {
          postId: id,
          uid: user.uid,
        };
        const q = query(collection(db, "saved"));
        await addDoc(q, newSaved);

        setIsSaved(true);

        return Swal.fire({ title: "북마크 저장 완료!", icon: "success" });
      } else if (isSaved === true) {
        const q = query(collection(db, "saved"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot);
        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });
        // 여기서 forEach 문 돌리면서 doc.ref로 하지 않으면 삭제가 정상적으로 되지 않음(구글링 해봐도 원인 알 수 없는 에러가 발생함) ,,, 나는 꼭 지금 user.uid 와 saved db 내의 uid 값이 동일한 문서만 삭제하고 싶은 상황임!!
        //   ex: const q = query(collection(db, "saved"), user.uid); await deleteDoc(q);
        // 위처럼 작동시키면
        //   Cannot read properties of undefined (reading 'toString') TypeError: Cannot read properties of undefined (reading 'toString'))
        //   와 같은 에러문이 발생함. 따라서 user.uid 를 string 처리도 해 봤는데 제대로 되지 않음... 현재 컴포넌트에서 toString 사용하는 구간 없음

        setIsSaved(false);
        return Swal.fire({ title: "북마크 취소 완료!", icon: "success" });
      }
    }
  };

  return (
    <button
      onClick={(e) => {
        bookmarkHandler(e);
      }}
    >
      {isSaved ? (
        <img
          src={`${process.env.PUBLIC_URL}/icon/bookmark_icon_black.svg`}
          alt="bookmark_icon"
        ></img>
      ) : (
        <img
          src={`${process.env.PUBLIC_URL}/icon/bookmark_icon.svg`}
          alt="bookmark_icon"
        ></img>
      )}
    </button>
  );
};

export default Bookmark;
