import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebaseConfig";

function FacebookLogin() {
  const handleFacebookLogin = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const data = await signInWithPopup(auth, provider);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={handleFacebookLogin}>Facebook</button>
    </div>
  );
}

export default FacebookLogin;
