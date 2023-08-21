import { useAtom } from "jotai";
import React, { useState } from "react";
import { postAtom } from "../../store/postAtom";

function PlaceAddress() {
  const [place, setPlace] = useState();
  const [address, setAddress] = useState("");
  const [post, setPost] = useAtom(postAtom);

  // const handlePlaceSearch = () => {
  //   const searchBox = new window.google.maps.places.SearchBox(
  //     // Google Maps Places API의 SearchBox를 생성
  //     document.getElementById("search-box")
  //   );

  //   searchBox.addListener("places_changed", () => {
  //     // places_changed 이벤트는 사용자가 검색 결과를 선택했을 때 발생
  //     const places = searchBox.getPlaces();
  //     // 사용자가 선택한 검색 결과

  //     if (places.length === 0) {
  //       return;
  //     }
  //     const selectedPlace = places[0];
  //     setPlace(selectedPlace?.name);
  //     setAddress(selectedPlace?.formatted_address);
  //   });
  // };
  console.log(post);

  return (
    <div style={{ backgroundColor: "gray" }}>
      <div>
        <input
          id="search-box"
          placeholder="장소명을 입력하세요"
          value={place}
          onChange={(e) => setPlace(e.targetValue)}
        />
        <button
          onClick={(e) => {
            setPost({ ...post, placeName: place, placeLocation: address });
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
