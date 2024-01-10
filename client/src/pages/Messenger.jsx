import ChatOnline from "../components/ChatOnline";
import Conversation from "../components/Conversation";
import Message from "../components/Message";
import { useState, useEffect } from "react";
import { userConversationsThunk } from "../store/conversation";
import { useDispatch, useSelector } from "react-redux";

function Messenger() {
  const dispatch = useDispatch();
  const user = window.sessionStorage.getItem("userInfo")
    ? JSON.parse(window.sessionStorage.getItem("userInfo"))
    : "";

  // console.log("userInfo: ", user);

  const conversations = useSelector(
    (state) => state.conversation.userConversations
  );

  console.log("convos:", conversations);

  useEffect(() => {
    dispatch(userConversationsThunk(user.userId));
  }, [user.userId, dispatch]);

  return (
    <div className="messenger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <input placeholder="Search for friends" className="chatMenuInput" />
          {conversations.map((convo) => (
            <Conversation
              key={convo.id}
              conversation={convo}
              currentUser={user}
            />
          ))}
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          <div className="chatBoxTop">
            <Message />
            <Message own={true} />
            <Message />
          </div>
          <div className="chatBoxBottom">
            <textarea
              className="chatMessageInput"
              placeholder="write something..."
            ></textarea>
            <button className="chatSubmitButton">Send</button>
          </div>
        </div>
      </div>
      <div className="chatOnline">
        <div className="chatOnlineWrapper">
          <ChatOnline />
        </div>
      </div>
    </div>
  );
}

export default Messenger;
