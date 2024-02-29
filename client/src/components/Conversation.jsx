import placeholder from "../assets/placeholder.jpg";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { singleUserThunk } from "../store/user";

function Conversation({ conversation, currentUser, onlineUsers, currentChat }) {
  const friendId = conversation.members.find(
    (member) => member.userId !== currentUser.userId
  );
  const onlineUserIds = onlineUsers.map((user) => user.userId);
  // console.log("onlineIds", onlineUserIds);

  // const focusedChat = conversation.id === currentChat.id;

  return (
    <div className="conversation">
      {/* <img className="conversationImg" src={placeholder} alt="" /> */}
      <div className="chatOnlineImgContainer">
        <img className="chatOnlineImg" src={friendId?.avatar} alt="" />
        {onlineUserIds.includes(friendId.userId) && (
          <div className="chatOnlineBadge"></div>
        )}
      </div>
      <span className="conversationName">
        {friendId.fName} {friendId.lName}
      </span>
    </div>
  );
}

export default Conversation;
