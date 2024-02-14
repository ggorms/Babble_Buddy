import { useState } from "react";
import UserSearch from "../components/UserSearch";
import Instructions from "../components/Instructions";
import messagingImg from "../assets/messaging.jpeg";

function Home({ loggedInUser, loggedInUserFollowingList }) {
  const [activeSearch, setActiveSearch] = useState(false);
  return (
    <div onClick={() => setActiveSearch(false)}>
      <div className="homeImageContainer"></div>
      <UserSearch
        activeSearch={activeSearch}
        setActiveSearch={setActiveSearch}
        loggedInUser={loggedInUser}
        loggedInUserFollowingList={loggedInUserFollowingList}
      />
      <div>
        <img src={messagingImg} className="messagingImg" />
      </div>
      <Instructions />
    </div>
  );
}

export default Home;
