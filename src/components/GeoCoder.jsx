import React, { useState } from "react";
import Geocode from "react-geocode";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
Geocode.setLanguage("en");
Geocode.setRegion("es");
Geocode.enableDebug();

function GeoCoder() {
  const [geom, setGeom] = useState(null); // 좌표 정보 상태 추가
  const [currentAddr, setCurrentAddr] = useState(""); // 입력한 주소 상태 추가

  const GoogleMap = async (currentAddr) => {
    try {
      const response = await Geocode.fromAddress(currentAddr);
      console.log(response);
      const { lat, lng } = response.results[0].geometry.location;
      return { lat, lng };
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleButton = async () => {
    if (currentAddr) {
      const { lat, lng } = await GoogleMap(currentAddr);
      if (lat && lng) {
        setGeom({ lat: lat, lng: lng });
      } else {
        setGeom(null);
      }
    }
  };

  return (
    <>
      <input
        id="address"
        type="text"
        value={currentAddr}
        onChange={(e) => setCurrentAddr(e.target.value)}
        placeholder="Enter an address"
        style={{ marginBottom: "10px" }}
      />
      <button onClick={handleButton}>주소 가져오기</button>
      {geom && (
        <div>
          <p>좌표 정보:</p>
          <p>Latitude: {geom.lat}</p>
          <p>Longitude: {geom.lng}</p>
        </div>
      )}
    </>
  );
}

export default GeoCoder;
