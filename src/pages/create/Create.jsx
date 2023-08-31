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
    <CreateContainer>
      <SelectBoxContainer>
        <SelectBox />
      </SelectBoxContainer>
      {/* <PlaceAddress /> */}
      <PlaceSearch />
      <div className="TextContainer">
        <StyledTextarea
          placeholder="내용을 작성하는 공간입니다."
          onChange={(e) => {
            setPost({ ...post, postContent: e.target.value });
          }}
        ></StyledTextarea>
        <StyledInput
          type="text"
          placeholder="10자 이내의 한줄평을 남겨 주세요"
          maxLength="10"
          onChange={(e) => {
            setPost({ ...post, postOneLineContent: e.target.value });
          }}
        />
      </div>
      <ImageUpload />
    </CreateContainer>
  );
}

export default Create;
const CreateContainer = styled.div`
  width: 1000px;
  margin: 0 auto;
  text-align: center;
`;
const SelectBoxContainer = styled.div`
  margin-top: 140px;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 300px;
  margin-top: 40px;
  padding: 16px;
  font-size: 16px;
  font-weight: 300;
  line-height: 20px;
  border: 1px solid #e5e5e5;
  outline: 1px solid #999;
`;
const StyledInput = styled.input`
  width: 100%;
  height: 60px;
  margin: 20px auto;
  padding: 20px 16px;
  font-size: 16px;
  font-weight: 300;
  border: 1px solid #e5e5e5;
  outline: 1px solid #999;

  & > div {
    width: 200px;
  }
`;
