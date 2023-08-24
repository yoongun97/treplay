import React, { useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useAtom } from "jotai";
import { postAtom } from "../../store/postAtom";

// 지도의 크기와 초기 중심 좌표를 설정
const containerStyle = {
  width: "800px",
  height: "400px",
};
const center = {
  lat: 37.5656,
  lng: 126.9769,
};

function PlaceSearch() {
  const [post, setPost] = useAtom(postAtom);

  // Google 지도 API를 로드하고, isLoaded 변수를 통해 API 로드 상태를 확인
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  const [map, setMap] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [selectedResult, setSelectedResult] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  //  Google 지도 로드 및 언로드 시 호출될 함수
  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  // 입력한 주소를 기반으로 Google Places API를 통해 장소 검색
  const handleSearch = async () => {
    if (!searchInput) {
      alert("장소를 입력해주세요.");
    } else {
      // Google Places API의 서비스를 생성
      const service = new window.google.maps.places.PlacesService(map);
      // 장소 검색에 사용할 요청
      const request = {
        query: searchInput,
        fields: ["name", "formatted_address", "geometry"],
      };
      // 검색어에 대한 결과를 받아온다.
      service.textSearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setSearchResults(results);
          setSelectedResult(null);
        }
      });
    }
  };

  // 결과를 선택하고 입력 필드에 표시
  const handleResultClick = (result) => {
    setSelectedResult(result);
    setSearchInput(result.formatted_address);
    setPost({
      ...post,
      placeName: result.name,
      placeLocation: result.formatted_address,
    });
    setSearchResults([]); // 결과를 선택하면 검색 목록 숨기기
  };

  // 엔터 키 이벤트 핸들러
  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return isLoaded ? (
    <div>
      <div>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Enter an address to search"
          onKeyDown={handleEnterKey}
        />
        <button onClick={handleSearch}>검색</button>
        <div>
          <div>
            {searchResults.map((result, index) => (
              <div
                key={index}
                style={{ cursor: "pointer", marginBottom: "5px" }}
                onClick={() => handleResultClick(result)}
              >
                {result.name} - {result.formatted_address}
              </div>
            ))}
          </div>
          {selectedResult && (
            <div>
              <p>선택된 장소명: {selectedResult.name}</p>
              <p>선택된 주소: {selectedResult.formatted_address}</p>
            </div>
          )}
        </div>
      </div>
      <div style={{ display: "none" }}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={17}
          onLoad={onLoad}
          onUnmount={onUnmount}
        />
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default PlaceSearch;