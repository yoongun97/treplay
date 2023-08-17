import { useCallback, useEffect, useRef, useState } from "react";

function GoogleMap() {
  const mapElement = useRef(null);
  const [address, setAddress] = useState(""); // 주소 상태 추가

  // 컴포넌트가 마운트될 때, 수동으로 스크립트를 넣어줍니다.
  // ﻿이는 script가 실행되기 이전에 window.initMap이 먼저 선언되어야 하기 때문입니다.
  const loadScript = useCallback((url) => {
    const firstScript = window.document.getElementsByTagName("script")[0];
    const newScript = window.document.createElement("script");
    newScript.src = url;
    newScript.async = true;
    newScript.defer = true;
    firstScript?.parentNode?.insertBefore(newScript, firstScript);
  }, []);

  // script에서 google map api를 가져온 후에 실행될 callback 함수
  const initMap = useCallback(() => {
    const { google } = window;
    if (!mapElement.current || !google) return;

    const location = { lat: 37.5656, lng: 126.9769 };
    const map = new google.maps.Map(mapElement.current, {
      zoom: 17,
      center: location,
    });
    new google.maps.Marker({
      position: location,
      map,
    });
  }, []);

  useEffect(() => {
    const script = window.document.getElementsByTagName("script")[0];
    const includeCheck = script.src.startsWith(
      "https://maps.googleapis.com/maps/api"
    );

    // script 중복 호출 방지
    if (includeCheck) return initMap();

    window.initMap = initMap;
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyArdwSvnMVGKTD_LUxm_pGKnDDnrUSeZDY&callback=initMap&language=en"
    );
  }, [initMap, loadScript]);

  return (
    <>
      <div ref={mapElement} style={{ minHeight: "400px" }} />
      <input
        type="text"
        value={address}
        placeholder="Enter an address"
        style={{ marginBottom: "10px" }}
      />
      <button onClick={(e) => setAddress(e.target.value)}>주소 입력</button>
      <p>주소</p>
      <p>장소명</p>
    </>
  );
}

export default GoogleMap;
