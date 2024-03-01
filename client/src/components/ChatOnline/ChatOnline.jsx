import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  newConversationThunk,
  userAndFriendConversationThunk,
} from "../../store/conversation";
import EmptyState from "../EmptyState/EmptyState";
import "./ChatOnline.css";

function ChatOnline({
  onlineUsers,
  currentUserId,
  loggedInUserFollowingList,
  conversations,
}) {
  const dispatch = useDispatch();
  const [onlineFriends, setOnlineFriends] = useState([]);

  // Filter logged in user's following list for users that are online and set onlineFrinds to be the result
  useEffect(() => {
    setOnlineFriends(
      loggedInUserFollowingList?.filter((user) =>
        onlineUsers
          .map((onlineUser) => onlineUser.userId)
          .includes(user.following.id)
      )
    );
  }, [currentUserId, onlineUsers]);

  // Handle clicking on an online friend
  // If the logged in user and the friend already have a conversation, fetch it. Else, dispatch a new conversation
  const handleClick = (friend) => {
    const conversationExists = conversations.some((convo) =>
      convo.members.some((member) => member.userId === friend.following.id)
    );
    if (conversationExists) {
      const members = {
        userId: currentUserId,
        friendId: friend.following.id,
      };
      dispatch(userAndFriendConversationThunk(members));
    } else {
      const members = {
        senderId: currentUserId,
        receiverId: friend.following.id,
      };
      dispatch(newConversationThunk(members));
    }
  };

  return (
    <div className="chatOnline">
      {onlineFriends.length > 0 ? (
        onlineFriends.map((friend) => (
          <div
            className="chatOnlineFriend"
            key={friend.following.id}
            onClick={() => handleClick(friend)}
          >
            <div className="chatOnlineImgContainer">
              <img
                className="chatOnlineImg"
                src={friend.following.avatar}
                alt=""
              />
              <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">
              {friend.following.fName} {friend.following.lName}
            </span>
          </div>
        ))
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

export default ChatOnline;
