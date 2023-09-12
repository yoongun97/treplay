import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from '@firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import { useParams } from 'react-router';
import { userAtom } from '../../store/userAtom';
import { useAtom } from 'jotai';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Bookmark = () => {
  const { id } = useParams();
  const [isSaved, setIsSaved] = useState(false);
  const [user] = useAtom(userAtom);
  const navigate = useNavigate();

  const fetchData = async () => {
    const q = query(collection(db, 'saved'), where('postId', '==', id));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => doc.data());

    if (user) {
      const userSavedData = data?.find((doc) => doc.uid === user.uid);

      if (!!userSavedData === true) {
        setIsSaved(true);
      }
    }
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
      navigate('/suggest');
    } else {
      if (isSaved === false) {
        const newSaved = {
          postId: id,
          uid: user.uid,
        };
        const q = query(collection(db, 'saved'));
        await addDoc(q, newSaved);

        setIsSaved(true);

        return Swal.fire({ title: '북마크 저장 완료!', icon: 'success' });
      } else if (isSaved === true) {
        const q = query(collection(db, 'saved'), where('uid', '==', user.uid));

        const querySnapshot = await getDocs(q);
        console.log(querySnapshot);
        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });
        setIsSaved(false);
        return Swal.fire({ title: '북마크 취소 완료!', icon: 'success' });
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
