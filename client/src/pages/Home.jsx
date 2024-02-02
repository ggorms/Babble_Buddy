import { useState } from "react";
import UserSearch from "../components/UserSearch";
import Inscrutions from "../components/Inscrutions";

function Home({ loggedInUser, loggedInUserFollowingList }) {
  const [activeSearch, setActiveSearch] = useState(false);
  return (
    <div onClick={() => setActiveSearch(false)}>
      <div className="homeImageContainer">
        <UserSearch
          activeSearch={activeSearch}
          setActiveSearch={setActiveSearch}
          loggedInUser={loggedInUser}
          loggedInUserFollowingList={loggedInUserFollowingList}
        />
      </div>
      <Inscrutions />
    </div>
  );
}

export default Home;
