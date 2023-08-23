import React, { useState } from "react";
import SelectBox from "../../components/selectBox/SelectBox";
import PlaceAddress from "../../components/place/PlaceAddress";
import ImageUpload from "../../components/ImageUpload";
import Autocomplete from "react-google-autocomplete";
import { useAtom } from "jotai";
import { postAtom } from "../../store/postAtom";
import PlaceSearch from "../../components/place/PlaceSearch";

function Create() {
  const [content, setContent] = useState();
  const [post, setPost] = useAtom(postAtom);

  return (
    <>
      <div style={{ display: "flex" }}>
        <SelectBox />
      </div>
      {/* <PlaceAddress /> */}
      <PlaceSearch />

      <div style={{ margin: "20px", backgroundColor: "gray" }}>
        <textarea
          value={content}
          placeholder="내용을 작성하는 공간입니다."
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></textarea>
      </div>
      <ImageUpload content={content} style={{ margin: "20px" }} />
    </>
  );
}

export default Create;
