import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { SnsBtn, SnsImg, SnsMent } from "../StyledLogin";

function FacebookLogin() {
  const navigate = useNavigate();
  const handleFacebookLogin = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SnsBtn onClick={handleFacebookLogin}>
      <SnsImg src="" alt="" />
      <SnsMent>페이스북 로그인</SnsMent>
    </SnsBtn>
  );
}

export default FacebookLogin;
