import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { SnsBtn, SnsImg, SnsMent } from "../StyledLogin";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

function GoogleLogin() {
  const navigate = useNavigate();
  const timestamp = serverTimestamp();
  const url = sessionStorage.getItem("url");

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);

      // userCredential에서 사용자 정보 추출
      const user = userCredential.user;

      // 사용자 정보를 Firestore에 저장
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        nickname: user.displayName,
        email: user.email,
        uid: user.uid,
        createdAt: timestamp,
        // 기타 필요한 사용자 정보를 여기에 추가할 수 있습니다.
      });

      navigate(`${url}`);
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
