import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebaseConfig";

function GoogleLogin() {
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const data = await signInWithPopup(auth, provider);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={handleGoogleLogin}>Google</button>
    </div>
  );
}

export default GoogleLogin;
