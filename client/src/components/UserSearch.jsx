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
  }, []);

  const filteredUsers = allUsers.filter(
    (user) =>
      user.fName.toLowerCase().startsWith(searchValue.toLowerCase()) ||
      user.lName.toLowerCase().startsWith(searchValue.toLowerCase())
  );
  return (
    <div className="searchContainer">
      <div>
        <div className="searchInputWrapper">
          <input
            placeholder="Search for Friends"
            className="searchInput"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onClick={(e) => {
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();
              setActiveSearch(true);
            }}
          />
          {activeSearch && searchValue && (
            <button
              onClick={() => setSearchValue("")}
              className="clearInputButton"
            >
              x
            </button>
          )}
        </div>

        <div
          className="userSearchBlur"
          style={activeSearch ? { display: "flex" } : { display: "none" }}
        ></div>
        <div
          className="searchWrapperParent"
          style={activeSearch ? { display: "flex" } : { display: "none" }}
        >
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
      </div>
    </div>
  );
}

export default UserSearch;
