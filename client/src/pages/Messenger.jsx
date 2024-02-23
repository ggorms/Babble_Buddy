import ChatOnline from "../components/ChatOnline";
import Conversation from "../components/Conversation";
import Message from "../components/Message";
import { useState, useEffect, useRef } from "react";
import { userConversationsThunk } from "../store/conversation";
import { useDispatch, useSelector } from "react-redux";
import { conversationMessagesThunk, newMessageThunk } from "../store/message";
import { io } from "socket.io-client";
import unhappy from "../assets/unhappy.png";
import SendIcon from "@mui/icons-material/Send";

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
  const [convoSearchValue, setConvoSearchValue] = useState("");
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
      currentChat?.members?.some(
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
  }, [currentChat?.id, dispatch]);

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
  }, [newConversation.id, dispatch]);
  // console.log(conversations);

  console.log("currChat", currentChat);

  const filteredConvos = conversations.filter(
    (convo) =>
      convo.members[1].fName
        .toLowerCase()
        .startsWith(convoSearchValue.toLocaleLowerCase()) ||
      convo.members[1].lName
        .toLowerCase()
        .startsWith(convoSearchValue.toLocaleLowerCase())
  );
  // console.log("filtered", filteredConvos);
  return (
    <div className="messenger">
      <div className="convoAndOnlineCluster">
        <div className="chatMenu">
          <h2 id="title">Conversations ({conversations.length})</h2>
          {conversations.length > 0 ? (
            <>
              <input
                placeholder="Search..."
                className="chatMenuInput"
                onChange={(e) => setConvoSearchValue(e.target.value)}
              />
              <div className="chatMenuWrapper">
                {filteredConvos.map((convo) => (
                  <div
                    key={convo.id}
                    onClick={() => setCurrentChat(convo)}
                    className="chatMenuEntryWrapper"
                  >
                    <Conversation
                      conversation={convo}
                      currentUser={user}
                      onlineUsers={onlineUsers}
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="emptyContainer">
                <h2 className="emptyText">You Have No Convos</h2>{" "}
                <img className="emptyImage" src={unhappy} />
              </div>
            </>
          )}
        </div>
        <div className="chatOnlineParent">
          <h2 id="title">Online Friends</h2>
          <div className="chatOnlineWrapper">
            <ChatOnline onlineUsers={onlineUsers} currentUserId={user.userId} />
          </div>
        </div>
      </div>
      <div
        className="chatBox"
        style={
          currentChat === null || Object.keys(currentChat).length === 0
            ? { display: "none" }
            : { display: "block" }
        }
      >
        <div className="chatBoxWrapper">
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
              placeholder="Message..."
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
            ></textarea>
            {newMessage && (
              <button
                className="chatSubmitButton"
                onClick={handleSubmitMessage}
              >
                <SendIcon />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messenger;
