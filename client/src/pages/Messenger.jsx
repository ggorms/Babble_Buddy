import ChatOnline from "../components/ChatOnline";
import Conversation from "../components/Conversation";
import Message from "../components/Message";
import { useState, useEffect, useRef } from "react";
import { userConversationsThunk } from "../store/conversation";
import { useDispatch, useSelector } from "react-redux";
import { conversationMessagesThunk, newMessageThunk } from "../store/message";

function Messenger() {
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const dispatch = useDispatch();
  const scrollRef = useRef();

  const user = window.sessionStorage.getItem("userInfo")
    ? JSON.parse(window.sessionStorage.getItem("userInfo"))
    : "";

  // console.log("userInfo: ", user);

  const conversations = useSelector(
    (state) => state.conversation.userConversations
  );

  // console.log("convos:", conversations);

  useEffect(() => {
    dispatch(userConversationsThunk(user.userId));
  }, [user.userId, dispatch]);

  const messages = useSelector((state) => state.message.conversationMessages);

  // console.log("messages", messages);
  // console.log("currChat", currentChat);

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    const message = {
      text: newMessage,
      senderId: user.userId,
      conversationId: currentChat?.id,
    };
    dispatch(newMessageThunk(message)).then(() => {
      dispatch(conversationMessagesThunk(currentChat?.id));
    });
    setNewMessage("");
  };

  useEffect(() => {
    dispatch(conversationMessagesThunk(currentChat?.id));
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="messenger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <input placeholder="Search for friends" className="chatMenuInput" />
          {conversations.map((convo) => (
            <div key={convo.id} onClick={() => setCurrentChat(convo)}>
              <Conversation conversation={convo} currentUser={user} />
            </div>
          ))}
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          {currentChat ? (
            <>
              <div className="chatBoxTop">
                {messages.map((message) => (
                  <div key={message.id} ref={scrollRef}>
                    <Message
                      message={message}
                      own={message.senderId === user.userId}
                    />
                  </div>
                ))}
              </div>
              <div className="chatBoxBottom">
                <textarea
                  className="chatMessageInput"
                  placeholder="write something..."
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                ></textarea>
                <button
                  className="chatSubmitButton"
                  onClick={handleSubmitMessage}
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <span className="noConversationText">
              Open a conversation to start a chat
            </span>
          )}
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
