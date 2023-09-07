import React, { useEffect, useRef } from "react";
import SelectBox from "../../components/selectBox/SelectBox";
import { useAtom } from "jotai";
import { postAtom } from "../../store/postAtom";
import PlaceSearch from "../../components/place/PlaceSearch";
import ImageUpload from "../../components/imageUpload/ImageUpload";
import * as s from "./StyledCreate";

function Create() {
  const [post, setPost] = useAtom(postAtom);
  const isUnmounted = useRef(false); // useRef로 페이지 상태 관리

  // Clean Up 함수를 이용해 페이지 언마운트 시 스크롤 가장 위로
  // useEffect(() => {
  //   const unmountAlert = () => {
  //     console.log(post);
  //     if (
  //       isUnmounted.current &&
  //       (post.nation !== "" ||
  //         post.category !== "" ||
  //         post.placeName !== "" ||
  //         post.postContent !== "" ||
  //         post.postOneLineContent !== "" ||
  //         post.postImgs.length !== 0)
  //     ) {
  //       // 페이지가 언마운트되지 않은 경우에만 alert 띄우기
  //       alert("페이지를 나가시겠습니까?");
  //       // confirm으로 바꾸고
  //       // 나가면 post의 내용들 초기화
  //     }
  //   };

  //   // 페이지가 언마운트 될 때만 alert 띄우기
  //   return unmountAlert;
  // }, []);

  // 컴포넌트가 언마운트 될 때 페이지 상태를 업데이트
  useEffect(() => {
    return () => {
      isUnmounted.current = true;
      setPost({
        nation: "",
        category: "",
        placeName: "",
        postContent: "",
        postOneLineContent: "",
        postImgs: [],
      });
      window.scrollTo(0, 0);
    };
  }, []);

  return (
    <s.CreateContainer>
      <s.SelectBoxContainer>
        <SelectBox />
      </s.SelectBoxContainer>
      <PlaceSearch />
      <div className="TextContainer">
        <s.StyledTextarea
          placeholder="내용을 작성하는 공간입니다."
          onChange={(e) => {
            setPost({ ...post, postContent: e.target.value });
          }}
        ></s.StyledTextarea>
        <s.StyledInput
          type="text"
          placeholder="10자 이내의 한줄평을 남겨 주세요"
          maxLength="10"
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
