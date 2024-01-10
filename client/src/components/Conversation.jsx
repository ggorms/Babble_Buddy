import placeholder from "../assets/placeholder.jpg";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { singleUserThunk } from "../store/user";

function Conversation({ conversation, currentUser }) {
  const friendId = conversation.UserConversation.find(
    (member) => member.userId !== currentUser.userId
  );
  console.log("friendId", friendId);

  return (
    <div className="conversation">
      <img className="conversationImg" src={placeholder} alt="" />
      <span className="conversationName">
        {friendId.user.fName} {friendId.user.lName}
      </span>
    </div>
  );
}

export default Conversation;
