import React, { useCallback, useEffect, useRef, useState } from "react";

function PlaceMap() {
  const mapElement = useRef(null);
  const [address, setAddress] = useState(""); // 주소 상태 추가

  // 컴포넌트가 마운트될 때, 수동으로 스크립트를 넣어줍니다.
  // 이는 script가 실행되기 이전에 window.initMap이 먼저 선언되어야 하기 때문입니다.
  // 지도 api스크립트를 동적으로 로딩하는 역할
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
    <div
      style={{
        maxWidth: "1200px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "0 auto 0 auto",
      }}
    >
      <h2>장소명</h2>
      <button style={{ margin: " 20px 190px 20px auto" }}>공유하기</button>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "0 auto 0 auto",
        }}
      >
        <div style={{ display: "flex", marginLeft: "auto" }}>
          <button>수정</button>
          <button>삭제</button>
        </div>
        <img
          style={{
            width: "400px",
            height: "400px",
          }}
          src="https://cdn.pixabay.com/photo/2023/08/02/14/25/dog-8165447_640.jpg"
          alt="디테일 이미지"
        />
        <p>내용</p>
        <div>
          <div
            ref={mapElement}
            style={{ minHeight: "400px", width: "600px" }}
          />
          {/* <input
        type="text"
        value={address}
        placeholder="Enter an address"
        style={{ marginBottom: "10px" }}
      />
      <button onClick={(e) => setAddress(e.target.value)}>주소 입력</button> */}
          <div style={{ display: "flex" }}>
            <p>서울시 마포구 2312-1</p>
            <button style={{ marginLeft: "auto" }}>주소복사</button>
          </div>
        </div>
      </div>
      <div>
        <div style={{ display: "flex" }}>
          <button>또가요</button>
          <button>안가요</button>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ width: "50%", height: "20px", backgroundColor: "Red" }}>
            50%
          </div>
          <div
            style={{ width: "50%", height: "20px", backgroundColor: "Blue" }}
          >
            50%
          </div>
        </div>
      </div>
      <div
        style={{ width: "800px", height: "300px", border: "1px solid black" }}
      >
        댓글 창
      </div>
    </div>
  );
}

export default PlaceMap;
