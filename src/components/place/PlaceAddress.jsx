import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { postAtom } from "../../store/postAtom";

function PlaceAddress() {
  const [place, setPlace] = useState();
  const [address, setAddress] = useState("");
  const [post, setPost] = useAtom(postAtom);

  useEffect(() => {
    const searchBox = new window.google.maps.places.SearchBox(
      // google places api의 장소 검색 기능을 담당하는 클래스

      document.getElementById("search-box")
    );

    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
      // 검색 결과의 장소 목록 가져오기

      if (places.length === 0) {
        return;
      }
      // 검색 결과가 없을 경우 종료

      const selectedPlace = places[0];
      setPlace(selectedPlace.name);
      setAddress(selectedPlace.formatted_address);
    });
  }, []); // useEffect 한 번만 실행

  return (
    <div style={{ backgroundColor: "gray" }}>
      <div>
        <input id="search-box" placeholder="장소명을 입력하세요" />
        <button
          onClick={(e) => {
            setPost({
              ...post,
              placeName: place,
              placeLocation: address,
            });
          }}
        >
          주소 검색
        </button>
      </div>
      {/* {address && ( */}
      <div>
        <h4>장소명</h4>
        <p>주소</p>
      </div>
      {/* )} */}
      <div>
        <input
          placeholder="장소명"
          onChange={(e) => {
            setPlace(e.target.value);
          }}
        ></input>
        <input
          placeholder="주소"
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        ></input>
      </div>
    </div>
  );
}

export default PlaceAddress;
