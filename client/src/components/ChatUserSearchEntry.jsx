import {
  newConversationThunk,
  userAndFriendConversationThunk,
} from "../store/conversation";
import { useDispatch } from "react-redux";

function ChatUserSearchEntry({ user, loggedInUser, conversations }) {
  const dispatch = useDispatch();

  const handleChatMenuClick = () => {
    const conversationExists = conversations.some((convo) =>
      convo.members.some((member) => member.userId === user.id)
    );
    if (conversationExists) {
      const members = {
        userId: loggedInUser.userId,
        friendId: user.id,
      };
      dispatch(userAndFriendConversationThunk(members));
    } else {
      const members = {
        senderId: loggedInUser.userId,
        receiverId: user.id,
      };
      dispatch(newConversationThunk(members));
    }
  };

  return (
    <>
      {user.id !== loggedInUser.userId && (
        <div className="chatUserSearchEntry" onClick={handleChatMenuClick}>
          <div className="chatSearchEntryContainer">
            <img src={user.avatar} className="chatSearchEntryImage" />
            <h5 className="chatSearchEntryName">
              {user.fName} {user.lName}
            </h5>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatUserSearchEntry;
