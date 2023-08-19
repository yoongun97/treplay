<<<<<<< HEAD
import React from 'react';
import { Link } from 'react-router-dom';
=======
import { useAtom } from "jotai";
import React from "react";
import { userAtom } from "../../store/userAtom";
>>>>>>> origin/feat#4

function MainPage() {
  return (
    <div>
      <Link to={'/한국'}>한국</Link> <br />
      <Link to={'/일본'}>일본</Link> <br />
      <Link to={'/미국'}>미국</Link> <br />
    </div>
  );
}

export default MainPage;
