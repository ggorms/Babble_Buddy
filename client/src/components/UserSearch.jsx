import { allUsersThunk } from "../store/user";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import UserSearchEntry from "./UserSearchEntry";
import TextField from "@mui/material/TextField";

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

  const filteredUsers = allUsers.filter(
    (user) =>
      user.fName.toLowerCase().startsWith(searchValue.toLowerCase()) ||
      user.lName.toLowerCase().startsWith(searchValue.toLowerCase())
  );
  return (
    <div className={activeSearch ? "searchContainerActive" : "searchContainer"}>
      <TextField
        label="Search for Friends"
        type="text"
        sx={{
          width: 220,
          // "& .MuiTextField-root": { marginTop: "30px", boxShadow: 10 },
          "& .MuiInputBase-input": { height: "2rem", fontSize: 16 },
          "& .MuiFormLabel-root": { fontSize: 16 },
          "& .css-14lo706": { width: 110 },
        }}
        className="searchInput"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onClick={(e) => {
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
          setActiveSearch(true);
        }}
      />

      <div className={activeSearch ? "searchWrapperParent" : ""}>
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
  );
}

export default UserSearch;
