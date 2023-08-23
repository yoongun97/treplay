import { Link } from "react-router-dom";
import React from "react";

function MainPage() {
  return (
    <div>
      <Link to={"/한국"}>한국</Link> <br />
      <Link to={"/일본"}>일본</Link> <br />
      <Link to={"/미국"}>미국</Link> <br />
    </div>
  );
}

export default MainPage;
