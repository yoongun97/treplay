import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { SnsBtn, SnsImg, SnsMent } from "../StyledLogin";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

function FacebookLogin() {
  const navigate = useNavigate();
  const timestamp = serverTimestamp();
  const url = sessionStorage.getItem("url");

  const handleFacebookLogin = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);

      const user = userCredential.user;

      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        nickname: user.displayName,
        email: user.email,
        uid: user.uid,
        createdAt: timestamp,
      });

      navigate(`${url}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SnsBtn onClick={handleFacebookLogin}>
      <SnsImg
        src={`${process.env.PUBLIC_URL}/image/facebook_icon.png`}
        alt="facebook_icon"
      />
      <SnsMent>페이스북 로그인</SnsMent>
    </SnsBtn>
  );
}

export default FacebookLogin;
