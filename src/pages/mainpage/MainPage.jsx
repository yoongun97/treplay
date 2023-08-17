import { useAtom } from "jotai";
import React from "react";
import { userAtom } from "../../store/userAtom";

function MainPage() {
  const [user, setUser] = useAtom(userAtom);

  return <div>MainPage</div>;
}

export default MainPage;
