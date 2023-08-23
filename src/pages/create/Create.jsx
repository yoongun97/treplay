import React from "react";
import SelectBox from "../../components/selectBox/SelectBox";
import ImageUpload from "../../components/ImageUpload";
import { useAtom } from "jotai";
import { postAtom } from "../../store/postAtom";
import PlaceSearch from "../../components/place/PlaceSearch";

function Create() {
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
          value={post.postContent}
          placeholder="내용을 작성하는 공간입니다."
          onChange={(e) => {
            setPost({ ...post, postContent: e.target.value });
          }}
        ></textarea>
      </div>
      <ImageUpload style={{ margin: "20px" }} />
    </>
  );
}

export default Create;
