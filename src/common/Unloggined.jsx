import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Unloggined = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <p>회원가입을 통해 Treplay를 즐겨 보세요!</p>
        <button onClick={() => navigate("/signup")}>회원가입 하러 가기</button>
      </div>
    </div>
  );
};

export default Unloggined;
