import { NaverAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebaseConfig";

function NaverLogin() {
  const handleNaverLogin = async () => {
    try {
      const provider = new NaverAuthProvider();
      const data = await signInWithPopup(auth, provider);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={handleNaverLogin}>Naver</button>
    </div>
  );
}

export default NaverLogin;
