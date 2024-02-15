import { useDispatch } from "react-redux";
import { loginThunk, registerThunk } from "../store/auth";
import { useState } from "react";
import TextField from "@mui/material/TextField";

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
              <TextField
                label="First Name"
                className="authInput"
                type="text"
                sx={{
                  width: 220,
                  // marginTop: 5,
                  marginLeft: 5,
                  marginRight: 5,
                  "& .MuiInputBase-input": { height: "2rem", fontSize: 16 },
                  "& .MuiFormLabel-root": {
                    fontSize: 16,
                  },
                  "& .css-14lo706": { width: 68 },
                }}
                onChange={(e) =>
                  setCredentials({ ...credentials, fName: e.target.value })
                }
              />

              <TextField
                label="Last Name"
                className="authInput"
                type="text"
                sx={{
                  width: 220,
                  marginTop: 5,
                  marginLeft: 5,
                  marginRight: 5,
                  "& .MuiInputBase-input": { height: "2rem", fontSize: 16 },
                  "& .MuiFormLabel-root": {
                    fontSize: 16,
                  },
                  "& .css-14lo706": { width: 68 },
                }}
                onChange={(e) =>
                  setCredentials({ ...credentials, lName: e.target.value })
                }
              />
            </div>
          ) : (
            ""
          )}
          <TextField
            label="Email"
            className="authInput"
            type="text"
            sx={{
              width: 220,
              margin: 5,
              "& .MuiInputBase-input": { height: "2rem", fontSize: 16 },
              "& .MuiFormLabel-root": {
                fontSize: 16,
              },
              "& .css-14lo706": { width: 40 },
            }}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
          />
          <TextField
            label="Password"
            className="authInput"
            type="password"
            sx={{
              width: 220,
              marginTop: 0,
              marginLeft: 5,
              marginRight: 5,
              marginBottom: 5,
              "& .MuiInputBase-input": { height: "2rem", fontSize: 16 },
              "& .MuiFormLabel-root": {
                fontSize: 16,
              },
              "& .css-14lo706": { width: 63 },
            }}
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
