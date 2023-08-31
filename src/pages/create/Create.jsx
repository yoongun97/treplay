import React from "react";
import SelectBox from "../../components/selectBox/SelectBox";
import ImageUpload from "../../components/ImageUpload";
import { useAtom } from "jotai";
import { postAtom } from "../../store/postAtom";
import PlaceSearch from "../../components/place/PlaceSearch";
import { styled } from "styled-components";

function Create() {
  const [post, setPost] = useAtom(postAtom);

  return (
    <>

      <SelectBoxContainer>
        <SelectBox />
      </SelectBoxContainer>
      {/* <PlaceAddress /> */}
      <PlaceSearch />
      <TextContainer>
        <textarea
          placeholder="내용을 작성하는 공간입니다."
          onChange={(e) => {
            setPost({ ...post, postContent: e.target.value });
          }}
        ></textarea>
        <input
          type="text"
          placeholder="10자 이내의 한줄평을 남겨 주세요"
          maxLength="10"
          onChange={(e) => {
            setPost({ ...post, postOneLineContent: e.target.value });
          }}
        />

      </TextContainer>
      <ImageUpload />
    </>
  );
}

export default Create;

const SelectBoxContainer = styled.div``;
const TextContainer = styled.div``;
