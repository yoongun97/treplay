import React, { useEffect, useRef, useState } from "react";
import SelectBox from "../../components/selectBox/SelectBox";
import { useAtom } from "jotai";
import { postAtom } from "../../store/postAtom";
import PlaceSearch from "../../components/place/PlaceSearch";
import ImageUpload from "../../components/imageUpload/ImageUpload";
import * as s from "./StyledCreate";

function Create() {
  const [post, setPost] = useAtom(postAtom);

  useEffect(() => {
    // Prompt confirmation when reload page is triggered
    window.onbeforeunload = () => {
      return "";
    };

    // Unmount the window.onbeforeunload event
    return () => {
      window.onbeforeunload = null;
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
