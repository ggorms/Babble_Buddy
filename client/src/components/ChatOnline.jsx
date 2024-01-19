import placeholder from "../assets/placeholder.jpg";
import { userFollowingListThunk } from "../store/user";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userAndFriendConversationThunk } from "../store/conversation";
import { conversationMessagesThunk } from "../store/message";

function ChatOnline({ onlineUsers, currentUserId, setCurrentChat }) {
  const dispatch = useDispatch();
  const [onlineFriends, setOnlineFriends] = useState([]);
  const userFollowingList = useSelector(
    (state) => state.user.userFollowingList
  );

  // console.log("onlineUsers", onlineUsers);

  const conversation = useSelector(
    (state) => state.conversation.userAndFriendConversation
  );

  // console.log("convo", conversation);
  useEffect(() => {
    dispatch(userFollowingListThunk(currentUserId));
  }, [currentUserId]);

  useEffect(() => {
    setOnlineFriends(
      userFollowingList.filter((user) =>
        onlineUsers
          .map((onlineUser) => onlineUser.userId)
          .includes(user.following.id)
      )
    );
  }, [userFollowingList, onlineUsers]);

  // console.log("followingList", userFollowingList);
  console.log("onlineFriends", onlineFriends);

  const handleClick = (friend) => {
    const members = {
      userId: currentUserId,
      friendId: friend.following.id,
    };

    dispatch(userAndFriendConversationThunk(members)).then(() => {
      setCurrentChat(conversation);

      console.log("test", conversation);
    });
  };

  return (
    <div className="chatOnline">
      {onlineFriends.map((friend) => (
        <div
          className="chatOnlineFriend"
          key={friend.following.id}
          onClick={() => handleClick(friend)}
        >
          <div className="chatOnlineImgContainer">
            <img className="chatOnlineImg" src={placeholder} alt="" />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">
            {friend.following.fName} {friend.following.lName}
          </span>
        </div>
      ))}
    </div>
  );
}

export default ChatOnline;
