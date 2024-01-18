import ChatOnline from "../components/ChatOnline";
import Conversation from "../components/Conversation";
import Message from "../components/Message";
import { useState, useEffect, useRef } from "react";
import { userConversationsThunk } from "../store/conversation";
import { useDispatch, useSelector } from "react-redux";
import { conversationMessagesThunk, newMessageThunk } from "../store/message";
import { io } from "socket.io-client";

function Messenger() {
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const dispatch = useDispatch();
  const scrollRef = useRef();
  const socket = useRef();

  const user = window.sessionStorage.getItem("userInfo")
    ? JSON.parse(window.sessionStorage.getItem("userInfo"))
    : "";
  const messages = useSelector((state) => state.message.conversationMessages);

  useEffect(() => {
    if (!socket.current) {
      socket.current = io("ws://localhost:8081");
    }
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        text: data.text,
        // conversationId: currentChat?.id,
        senderId: data.senderId,
      });
    });
  }, []);

  console.log("arrivalMessage", arrivalMessage);

  useEffect(() => {
    if (
      arrivalMessage &&
      currentChat?.UserConversation.some(
        (member) => member.userId === arrivalMessage.senderId
      )
    ) {
      dispatch(conversationMessagesThunk(currentChat?.id));
    }
  }, [arrivalMessage, currentChat]);
  useEffect(() => {
    socket.current.emit("addUser", user.userId);
    // socket.current.on("getUsers", (users) => {
    //   console.log(users);
    // });
  }, [user]);

  const conversations = useSelector(
    (state) => state.conversation.userConversations
  );
  // console.log("convos", conversations);
  // console.log("convos:", conversations);

  useEffect(() => {
    dispatch(userConversationsThunk(user.userId));
  }, [user.userId, dispatch]);

  console.log("currChat", currentChat);

  const handleSubmitMessage = (e) => {
    e.preventDefault();

    const receiverId = currentChat.UserConversation.find(
      (member) => member.userId !== user.userId
    );

    const message = {
      text: newMessage,
      senderId: user.userId,
      conversationId: currentChat?.id,
    };
    dispatch(newMessageThunk(message))
      .then(() => {
        dispatch(conversationMessagesThunk(currentChat?.id));
      })
      .then(() => {
        socket.current.emit("sendMessage", {
          senderId: user.userId,
          receiverId: receiverId.userId,
          text: newMessage,
        });
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
