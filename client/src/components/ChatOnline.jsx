import placeholder from "../assets/placeholder.jpg";
import { userFollowingListThunk } from "../store/user";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userAndFriendConversationThunk } from "../store/conversation";
import unhappy from "../assets/unhappy.png";

function ChatOnline({ onlineUsers, currentUserId }) {
  const dispatch = useDispatch();
  const [onlineFriends, setOnlineFriends] = useState([]);
  const userFollowingList = useSelector(
    (state) => state.user.userFollowingList
  );

  useEffect(() => {
    dispatch(userFollowingListThunk(currentUserId));
  }, [currentUserId]);

  useEffect(() => {
    setOnlineFriends(
      userFollowingList?.filter((user) =>
        onlineUsers
          .map((onlineUser) => onlineUser.userId)
          .includes(user.following.id)
      )
    );
  }, [userFollowingList, onlineUsers]);

  const handleClick = (friend) => {
    const members = {
      userId: currentUserId,
      friendId: friend.following.id,
    };

    dispatch(userAndFriendConversationThunk(members));
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
              <img className="chatOnlineImg" src={placeholder} alt="" />
              <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">
              {friend.following.fName} {friend.following.lName}
            </span>
          </div>
        ))
      ) : (
        <div className="emptyContainer">
          <h3 className="emptyText">Looks like there&#39;s no one online</h3>
          <img src={unhappy} className="emptyImage" />
        </div>
      )}
    </div>
  );
}

export default ChatOnline;
