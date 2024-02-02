import "./App.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import Messenger from "./pages/Messenger";
import Profile from "./pages/Profile";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { userFollowingListThunk } from "./store/user";

function App() {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.auth.user.userInfo);
  const loggedInUserFollowingList = useSelector(
    (state) => state.user.userFollowingList
  );
  const token = useSelector((state) => state.auth.user.token);

  useEffect(() => {
    dispatch(userFollowingListThunk(loggedInUser?.userId));
  }, [dispatch, loggedInUser]);

  if (!token) {
    return (
      <Routes>
        <Route path="/*" element={<Auth />} />
      </Routes>
    );
  } else if (token) {
    return (
      <Routes>
        <Route
          path="/"
          element={
            <Home
              loggedInUser={loggedInUser}
              loggedInUserFollowingList={loggedInUserFollowingList}
            />
          }
        />
        <Route
          path="/profile/:id"
          element={
            <Profile
              loggedInUser={loggedInUser}
              loggedInUserFollowingList={loggedInUserFollowingList}
            />
          }
        />
        {/* <Route path="/auth" element={<Auth />} /> */}
        <Route path="/messenger" element={<Messenger />} />
      </Routes>
    );
  }
}

export default App;
