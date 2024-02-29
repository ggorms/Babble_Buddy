import { allUsersThunk } from "../store/user";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ChatUserSearchEntry from "./ChatUserSearchEntry";

function ChatUserSearch({
  activeChatSearch,
  setActiveChatSearch,
  loggedInUser,
  conversations,
}) {
  const dispatch = useDispatch();
  const [chatSearchValue, setChatSearchValue] = useState("");

  const allUsers = useSelector((state) => state.user.allUsers);

  useEffect(() => {
    dispatch(allUsersThunk());
  }, []);

  const filteredUsers = allUsers.filter(
    (user) =>
      user.fName.toLowerCase().startsWith(chatSearchValue.toLowerCase()) ||
      user.lName.toLowerCase().startsWith(chatSearchValue.toLocaleLowerCase())
  );

  //   console.log("filteredUsers", filteredUsers);
  return (
    // <div className="chatSearchParent">
    <>
      <div className="chatMenuInputWrapper">
        <input
          placeholder="Start a chat..."
          className="chatMenuInput"
          value={chatSearchValue}
          onClick={(e) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            setActiveChatSearch(true);
          }}
          onChange={(e) => setChatSearchValue(e.target.value)}
        />
        {activeChatSearch && chatSearchValue && (
          <button
            className="chatMenuButton"
            onClick={() => setChatSearchValue("")}
          >
            X
          </button>
        )}
      </div>
      <div
        className="chatSearchBlur"
        style={activeChatSearch ? { display: "block" } : { display: "none" }}
      >
        <div
          className="chatSearchWrapper"
          style={activeChatSearch ? { display: "block" } : { display: "none" }}
        >
          {filteredUsers.map((user) => (
            <ChatUserSearchEntry
              key={user.id}
              user={user}
              loggedInUser={loggedInUser}
              conversations={conversations}
            />
          ))}
        </div>
      </div>
    </>
    // </div>
  );
}

export default ChatUserSearch;
