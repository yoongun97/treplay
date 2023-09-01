import React, { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";

function PlaceMap({ postAddress }) {
  const mapElement = useRef(null);
  const [address, setAddress] = useState(""); // 주소 상태 추가

  useEffect(() => {
    // 이미 스크립트가 로드되어 있는지 확인
    if (!window.google) {
      // Google Maps API 스크립트를 동적으로 로드
      const script = document.createElement("script");
      //스크립트 엘리먼트를 생성하고, API 키 및 필요한 라이브러리 정보를 포함한 URL을 설정
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      // 스크립트를 비동기적으로 로드하도록 설정
      script.onload = initMap;
      //스크립트 로드가 완료되면 initMap 함수를 호출
      document.head.appendChild(script);
      //스크립트 엘리먼트를 <head> 요소에 추가

      // 컴포넌트가 언마운트될 때 스크립트 제거
      return () => {
        document.head.removeChild(script);
      };
    } else {
      // 이미 로드된 경우에는 initMap 함수 호출
      initMap();
    }
  }, [postAddress]);

  // 주소 복사
  const copyAddress = () => {
    if (!document.queryCommandSupported("copy")) {
      return alert("복사 기능이 지원되지 않는 브라우저입니다.");
    }

    navigator.clipboard.writeText(address);
    alert("주소가 복사되었습니다.");
  };

  // 지도 초기화 함수
  const initMap = () => {
    const geocoder = new window.google.maps.Geocoder();
    // 주소를 좌표로 변환합니다.
    geocoder.geocode({ address: postAddress }, (results, status) => {
      if (status === "OK" && results[0]) {
        const location = results[0].geometry.location;

        // 변환된 좌표를 기반으로 지도를 초기화하고 Map 객체를 생성합니다.
        const map = new window.google.maps.Map(mapElement.current, {
          zoom: 17,
          center: location,
        });
        // 변환된 좌표에 마커를 추가하여 해당 위치를 표시
        const marker = new window.google.maps.Marker({
          position: location,
          map,
        });
        console.log(marker);
        // 변환된 주소를 setAddress를 통해 상태에 업데이트
        setAddress(results[0].formatted_address);
      } else {
        alert("주소를 가져올 수 없습니다.");
      }
    });
  };

  return (
    <MapContainer>
      <MapBox ref={mapElement} />
      <AddressBox>
        <p>{address}</p>
        <button style={{ marginLeft: "auto" }} onClick={copyAddress}>
          주소복사
        </button>
      </AddressBox>
    </MapContainer>
  );
}

export default PlaceMap;
const MapContainer = styled.div`
  position: relative;
  margin: 80px 0 60px;
`;
const MapBox = styled.div`
  width: 100%;
  height: 460px;
`;
const AddressBox = styled.div`
  position: absolute;
  top: -40px;
  transform: translateX(50%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 640px;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #e5e5e5;
  background-color: #fff;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
  font-size: 16px;
  font-weight: 400;
  word-break: keep-all;

  & > button {
    flex-shrink: 0;
    margin-left: 20px;
    width: 100px;
    height: 32px;
    border-radius: 30px;
    border: none;
    background-color: #0a58be;
    color: #fff;
    font-size: 14px;
    font-weight: 300;
  }
`;
