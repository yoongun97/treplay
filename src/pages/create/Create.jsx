import React, { useEffect, useRef, useState } from "react";
import SelectBox from "../../components/selectBox/SelectBox";
import { useAtom } from "jotai";
import { postAtom } from "../../store/postAtom";
import PlaceSearch from "../../components/place/PlaceSearch";
import ImageUpload from "../../components/imageUpload/ImageUpload";
import * as s from "./StyledCreate";
import { useNavigate } from "react-router-dom";

function Create() {
  const [isDirty, setIsDirty] = useState(false);
  const [post, setPost] = useAtom(postAtom);
  const isUnmounted = useRef(false); // useRef로 페이지 상태 관리
  const navigate = useNavigate();

  // // Clean Up 함수를 이용해 페이지 언마운트 시 스크롤 가장 위로
  // useEffect(() => {
  //   const unmountAlert = () => {
  //     if (isUnmounted.current && isDirty) {
  //       const confirmResult = window.confirm(
  //         "작성중인 글이 있습니다. 페이지를 나가시겠습니까?"
  //       );
  //       if (confirmResult) {
  //         setPost({
  //           nation: "",
  //           category: "",
  //           placeName: "",
  //           postContent: "",
  //           postOneLineContent: "",
  //           postImgs: [],
  //         });
  //       } else {
  //         isUnmounted.current = false;
  //         navigate(1);
  //         // 입력값 유지하기(selectBox, placeResult, 첨부파일)
  //         return;
  //       }
  //     }
  //   };
  //   // 페이지가 언마운트 될 때만 alert 띄우기
  //   return unmountAlert;
  // }, [isDirty]);

  // // 컴포넌트가 언마운트 될 때 페이지 상태를 업데이트
  // useEffect(() => {
  //   return () => {
  //     isUnmounted.current = true;
  //     window.scrollTo(0, 0);
  //   };
  // }, []);

  useEffect(() => {
    const preventUnload = (event) => {
      // 여기에 윤건님이 뒤로가기 막는 조건 넣어주면 될 것 같습니다.
      if (isDirty) {
        // NOTE: 최신 브라우저에선 이 로직이 필요없다고 함. 혹시 모르니 쓰는 것이 좋음
        const message = "정말로 나가시겠습니까?";
        event.preventDefault();
        event.returnValue = message;
      }
    };

    // unload 막아주는 이벤트 등록
    window.addEventListener("beforeunload", preventUnload);
    // unmount시 이벤트 막아주는 로직
    return () => {
      window.removeEventListener("beforeunload", preventUnload);
    };
  }, [isDirty]);

  // post 객체가 변경될 때마다 isDirty를 설정
  useEffect(() => {
    setIsDirty(
      post.nation !== "" ||
        post.category !== "" ||
        post.placeName !== "" ||
        post.postContent !== "" ||
        post.postOneLineContent !== "" ||
        post.postImgs.length !== 0
    );
  }, [post]);

  return (
    <s.CreateContainer>
      <s.SelectBoxContainer>
        <SelectBox />
      </s.SelectBoxContainer>
      <PlaceSearch />
      <div className="TextContainer">
        <s.StyledTextarea
          placeholder="내용을 작성하는 공간입니다."
          // value={post.postContent}
          onChange={(e) => {
            setPost({ ...post, postContent: e.target.value });
          }}
        ></s.StyledTextarea>
        <s.StyledInput
          type="text"
          placeholder="10자 이내의 한줄평을 남겨 주세요"
          maxLength="10"
          // value={post.postOneLineContent}
          onChange={(e) => {
            setPost({ ...post, postOneLineContent: e.target.value });
          }}
        />
      </div>
      <ImageUpload />
    </s.CreateContainer>
  );
}

export default Create;
