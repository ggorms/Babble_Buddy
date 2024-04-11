import "./App.css";
import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Messenger from "./pages/Messenger/Messenger";
import Profile from "./pages/Profile/Profile";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { userFollowingListThunk } from "./store/user";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { me } from "./store/auth";

function App() {
  const dispatch = useDispatch();
  const [activeSearch, setActiveSearch] = useState(false);
  const [activeChatSearch, setActiveChatSearch] = useState(false);

  const loggedInUser = useSelector((state) => state.auth.user);

  const loggedInUserFollowingList = useSelector(
    (state) => state.user.userFollowingList
  );

  useEffect(() => {
    dispatch(me());
  }, []);

  // Fetch logged in user's followings
  useEffect(() => {
    if (loggedInUser.userId) {
      dispatch(userFollowingListThunk(loggedInUser?.userId));
    }
  }, [loggedInUser?.userId]);

  // If no user logged in
  if (!loggedInUser.userId) {
    return (
      <Routes>
        <Route path="/*" element={<Auth />} />
      </Routes>
    );
  }
  // If user logged in
  else if (loggedInUser.userId) {
    return (
      <div
        id="app"
        onClick={() => {
          setActiveChatSearch(false);
          setActiveSearch(false);
        }}
      >
        <Navbar
          loggedInUser={loggedInUser}
          loggedInUserFollowingList={loggedInUserFollowingList}
          activeSearch={activeSearch}
          setActiveSearch={setActiveSearch}
        />
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
          <Route
            path="/messenger"
            element={
              <Messenger
                loggedInUserFollowingList={loggedInUserFollowingList}
                loggedInUser={loggedInUser}
                activeChatSearch={activeChatSearch}
                setActiveChatSearch={setActiveChatSearch}
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    );
  }
}

export default App;
