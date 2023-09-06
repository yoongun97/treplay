import React, { useEffect } from "react";
import SelectBox from "../../components/selectBox/SelectBox";
import { useAtom } from "jotai";
import { postAtom } from "../../store/postAtom";
import PlaceSearch from "../../components/place/PlaceSearch";
import ImageUpload from "../../components/imageUpload/ImageUpload";
import * as s from "./StyledCreate";
import { useNavigate } from "react-router-dom";

function Create() {
  const [post, setPost] = useAtom(postAtom);
  const navigate = useNavigate();

  // Clean Up 함수를 이용해 페이지 언마운트 시 스크롤 가장 위로
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (
        post &&
        (post.nation ||
          post.category ||
          post.placeName ||
          post.postContent ||
          post.postOneLineContent ||
          post.postImgs.length > 0)
      ) {
        const confirmLeave = window.confirm(
          "작성 중인 내용이 있습니다. 페이지를 떠나시겠습니까?"
        );

        if (confirmLeave) {
          navigate(-1); // 페이지 떠나기 허용
        }
      } else {
        navigate(-1); // 페이지 떠나기 허용
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [post, navigate]);

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
