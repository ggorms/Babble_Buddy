import { allUsersThunk } from "../store/user";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import UserSearchEntry from "./UserSearchEntry";

function UserSearch({
  activeSearch,
  setActiveSearch,
  loggedInUser,
  loggedInUserFollowingList,
}) {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const allUsers = useSelector((state) => state.user.allUsers);

  useEffect(() => {
    dispatch(allUsersThunk());
  }, [dispatch]);

  //   console.log("allUsers", allUsers);
  const filteredUsers = allUsers.filter(
    (user) =>
      user.fName.toLowerCase().startsWith(searchValue.toLowerCase()) ||
      user.lName.toLowerCase().startsWith(searchValue.toLowerCase())
  );
  //   console.log("filteredUsers", filteredUsers);
  return (
    <div>
      <input
        className="searchInput"
        type="text"
        placeholder="Search for Friends"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onClick={(e) => {
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
          setActiveSearch(true);
        }}
      />
      <div
        style={activeSearch ? { display: "block" } : { display: "none" }}
        className="searchWrapper"
      >
        {filteredUsers.map((user) => (
          <UserSearchEntry
            user={user}
            key={user.id}
            loggedInUser={loggedInUser}
            loggedInUserFollowingList={loggedInUserFollowingList}
          />
        ))}
      </div>
    </div>
  );
}

export default UserSearch;
