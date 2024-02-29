import placeholder from "../assets/placeholder.jpg";
import { userFollowingListThunk } from "../store/user";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  newConversationThunk,
  userAndFriendConversationThunk,
} from "../store/conversation";
import unhappy from "../assets/unhappy.png";

function ChatOnline({
  onlineUsers,
  currentUserId,
  loggedInUserFollowingList,
  conversations,
}) {
  const dispatch = useDispatch();
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    setOnlineFriends(
      loggedInUserFollowingList?.filter((user) =>
        onlineUsers
          .map((onlineUser) => onlineUser.userId)
          .includes(user.following.id)
      )
    );
  }, [currentUserId, onlineUsers]);

  // const handleClick = (friend) => {
  //   const members = {
  //     userId: currentUserId,
  //     friendId: friend.following.id,
  //   };

  //   dispatch(userAndFriendConversationThunk(members));
  // };

  const handleClick = (friend) => {
    const conversationExists = conversations.some((convo) =>
      convo.members.some((member) => member.userId === friend.following.id)
    );
    // console.log("convo Exists", conversationExists);
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
      console.log("members", members);
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
        <div className="emptyContainer">
          <h3 className="emptyText">None</h3>
          <img src={unhappy} className="emptyImage" />
        </div>
      )}
    </div>
  );
}

export default ChatOnline;
