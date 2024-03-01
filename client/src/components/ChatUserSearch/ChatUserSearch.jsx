import { allUsersThunk } from "../../store/user";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ChatUserSearchEntry from "../ChatUserSearchEntry/ChatUserSearchEntry";
import "./ChatUserSearch.css";

function ChatUserSearch({
  activeChatSearch,
  setActiveChatSearch,
  loggedInUser,
  conversations,
}) {
  const dispatch = useDispatch();
  const [chatSearchValue, setChatSearchValue] = useState("");

  // all users data
  const allUsers = useSelector((state) => state.user.allUsers);

  // Fetch all users
  useEffect(() => {
    dispatch(allUsersThunk());
  }, []);

  // Filter all users data based on search value
  const filteredUsers = allUsers.filter(
    (user) =>
      user.fName.toLowerCase().startsWith(chatSearchValue.toLowerCase()) ||
      user.lName.toLowerCase().startsWith(chatSearchValue.toLocaleLowerCase())
  );

  return (
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
  );
}

export default ChatUserSearch;
