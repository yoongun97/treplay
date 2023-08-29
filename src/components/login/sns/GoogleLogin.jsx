import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { SnsBtn, SnsImg, SnsMent } from "../StyledLogin";

function GoogleLogin() {
  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SnsBtn onClick={handleGoogleLogin}>
      <SnsImg
        src={`${process.env.PUBLIC_URL}/image/google_icon.png`}
        alt="google_icon"
      />
      <SnsMent>구글 로그인</SnsMent>
    </SnsBtn>
  );
}

export default GoogleLogin;
