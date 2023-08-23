import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { useNavigate } from "react-router-dom";

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
    <div>
      <button onClick={handleFacebookLogin}>Facebook</button>
    </div>
  );
}

export default FacebookLogin;
