import ChatOnline from "../components/ChatOnline";
import Conversation from "../components/Conversation";
import Message from "../components/Message";
import { useState, useEffect, useRef } from "react";
import { userConversationsThunk } from "../store/conversation";
import { useDispatch, useSelector } from "react-redux";
import { conversationMessagesThunk, newMessageThunk } from "../store/message";
import { io } from "socket.io-client";

function Messenger() {
  const conversation = useSelector(
    (state) => state.conversation.userAndFriendConversation
  );

  const newConversation = useSelector(
    (state) => state.conversation.newConversation
  );

  const [currentChat, setCurrentChat] = useState(
    conversation || newConversation
  );
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
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

  useEffect(() => {
    if (
      arrivalMessage &&
      currentChat?.UserConversation?.some(
        (member) => member.userId === arrivalMessage.senderId
      )
    ) {
      dispatch(conversationMessagesThunk(currentChat?.id));
    }
  }, [arrivalMessage, currentChat]);
  useEffect(() => {
    socket.current.emit("addUser", user.userId);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
  }, [user.userId]);

  const conversations = useSelector(
    (state) => state.conversation.userConversations
  );

  useEffect(() => {
    dispatch(userConversationsThunk(user.userId));
  }, [user.userId, dispatch]);

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

  useEffect(() => {
    dispatch(conversationMessagesThunk(conversation?.id)).then(() => {
      setCurrentChat(conversation);
    });
  }, [conversation, dispatch]);

  useEffect(() => {
    dispatch(conversationMessagesThunk(newConversation.id)).then(() => {
      setCurrentChat(newConversation);
    });
  }, [newConversation, dispatch]);
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
          <ChatOnline onlineUsers={onlineUsers} currentUserId={user.userId} />
        </div>
      </div>
    </div>
  );
}

export default Messenger;
