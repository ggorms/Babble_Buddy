import { useState } from "react";
import UserSearch from "../components/UserSearch";
import Instructions from "../components/Instructions";
import messagingImg from "../assets/messaging.jpeg";
import AboutUs from "../components/AboutUs";

function Home({ loggedInUser, loggedInUserFollowingList }) {
  const [activeSearch, setActiveSearch] = useState(false);
  return (
    <div onClick={() => setActiveSearch(false)}>
      <div className="homeImageContainer"></div>
      <div className="homeSegmentWrapper">
        <UserSearch
          activeSearch={activeSearch}
          setActiveSearch={setActiveSearch}
          loggedInUser={loggedInUser}
          loggedInUserFollowingList={loggedInUserFollowingList}
        />

        <img src={messagingImg} className="messagingImg" />
      </div>
      <Instructions />
      <AboutUs />
    </div>
  );
}

export default Home;
