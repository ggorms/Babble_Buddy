import { useDispatch } from "react-redux";
import { loginThunk, registerThunk } from "../store/auth";
import { useState } from "react";

function Auth() {
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
    <div>
      <form onSubmit={attemptAuth}>
        <label>Email</label>
        <input
          type="text"
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
        />
        <label>Password</label>
        <input
          type="text"
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        {!isLogin ? (
          <div>
            <label>First Name</label>
            <input
              type="text"
              onChange={(e) =>
                setCredentials({ ...credentials, fName: e.target.value })
              }
            />
            <label>Last Name</label>
            <input
              type="text"
              onChange={(e) =>
                setCredentials({ ...credentials, lName: e.target.value })
              }
            />
          </div>
        ) : (
          ""
        )}
        <button type="submit">{authType}</button>
        <p>
          {authTypeMessage}{" "}
          <a onClick={() => setIslogin(!isLogin)}>{oppositeAuthType}</a>
        </p>
      </form>
    </div>
  );
}

export default Auth;
