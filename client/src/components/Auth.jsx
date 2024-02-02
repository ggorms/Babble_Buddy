import { useDispatch } from "react-redux";
import { loginThunk, registerThunk } from "../store/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Auth() {
  // const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
  });
  const [isLogin, setIslogin] = useState(true);
  const dispatch = useDispatch();
  const authType = isLogin ? "Login" : "Register";

  const attemptAuth = async (e) => {
    e.preventDefault();
    if (isLogin) {
      try {
        const { email, password } = credentials;
        dispatch(loginThunk({ email, password }));
      } catch (error) {
        console.error(error.message);
      }
    } else {
      try {
        dispatch(registerThunk(credentials));
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const authTypeMessage = isLogin
    ? "Don't Have an Account?"
    : "Already Have an Account?";
  const oppositeAuthType = isLogin ? "Register" : "Login";

  return (
    <div className="authPage">
      <div className="authContainer">
        <h1 className="authTitle">{authType}</h1>
        <form onSubmit={attemptAuth} className="authForm">
          {!isLogin ? (
            <div className="authForm">
              <input
                className="authInput"
                placeholder="First Name"
                type="text"
                onChange={(e) =>
                  setCredentials({ ...credentials, fName: e.target.value })
                }
              />
              <input
                className="authInput"
                placeholder="Last Name"
                type="text"
                onChange={(e) =>
                  setCredentials({ ...credentials, lName: e.target.value })
                }
              />
            </div>
          ) : (
            ""
          )}
          <input
            className="authInput"
            type="text"
            placeholder="Email"
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
          />
          <input
            className="authInput"
            type="text"
            placeholder="Password"
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />

          <button type="submit" className="authButton">
            {authType}
          </button>
          <p className="authMessage">
            {authTypeMessage}{" "}
            <a onClick={() => setIslogin(!isLogin)} className="authTypeSwitch">
              {" "}
              {oppositeAuthType}
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Auth;
