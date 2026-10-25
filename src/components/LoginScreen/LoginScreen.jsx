import { useState } from "react";
import "./LoginScreen.css"
import { userExists, registerUser, isPasswordCorrect } from "../../userStorage";


function LoginScreen({ onLoginSuccess }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  function login() {
    const cleanName = userName.trim();
    if (!userExists(cleanName) || !isPasswordCorrect(cleanName, password)) {
      setErrorMessage("שם משתמש או סיסמה שגויים");
      return;
    }
    onLoginSuccess(cleanName);
  }


  function register() {
    const cleanName = userName.trim();
    if (cleanName === "" || password === "") {
      setErrorMessage("יש למלא שם משתמש וסיסמה");
      return;
    }
    if (userExists(cleanName)) {
      setErrorMessage("שם המשתמש תפוס");
      return;
    }
    registerUser(cleanName, password);
    onLoginSuccess(cleanName);
  }

  return (
    <div className="login-screen">
      <h2>כניסה</h2>
      <input
        value={userName}
        onChange={(event) => setUserName(event.target.value)}
        placeholder="שם משתמש"
      />
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="סיסמה"
      />
      <button onClick={login}>כניסה</button>
      <button onClick={register}>הרשמה</button>
      <p>{errorMessage}</p>
    </div>
  );
}


export default LoginScreen;