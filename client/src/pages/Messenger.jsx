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
import ChatUserSearch from "../components/ChatUserSearch";

function Messenger({
  loggedInUserFollowingList,
  activeChatSearch,
  setActiveChatSearch,
}) {
  const userAndFriendConversation = useSelector(
    (state) => state.conversation.userAndFriendConversation
  );

  const newConversation = useSelector(
    (state) => state.conversation.newConversation
  );

  const [currentChat, setCurrentChat] = useState(
    // userAndFriendConversation || newConversation
    {}
  );

  // console.log("currChat", currentChat);
  // console.log("uandf", userAndFriendConversation);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState({});
  const [onlineUsers, setOnlineUsers] = useState([]);

  const dispatch = useDispatch();
  const scrollRef = useRef();
  const socket = useRef();

  const user = window.sessionStorage.getItem("userInfo")
    ? JSON.parse(window.sessionStorage.getItem("userInfo"))
    : "";
  const conversations = useSelector(
    (state) => state.conversation.userConversations
  );
  const messages = useSelector((state) => state.message.conversationMessages);

  // Ensure socket is the same and handle receiving messages
  useEffect(() => {
    if (!socket.current) {
      socket.current = io("ws://localhost:8081");
    }
    socket.current.on("getMessage", (data) => {
      // console.log("MESSAGE RECEIVED", data);
      // setCurrentChat({id: data.conversationId})
      // dispatch(conversationMessagesThunk(data.conversationId));
      setArrivalMessage((prev) => ({
        ...prev,
        text: data.text,
        senderId: data.senderId,
      }));
      const conversationExists = conversations.some((convo) =>
        convo.members.some((member) => member.userId === data.senderId)
      );
      if (!conversationExists) {
        dispatch(userConversationsThunk(user.userId));
      }
    });
  }, []);

  // console.log("arrivalMessage", arrivalMessage);
  // Handle scrolling to end of div
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  // When a new user logs on add them to online users
  useEffect(() => {
    socket.current.emit("addUser", user.userId);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
  }, [user.userId]);

  useEffect(() => {
    if (
      arrivalMessage &&
      currentChat?.members?.some(
        (member) => member.userId === arrivalMessage.senderId
      )
    ) {
      dispatch(conversationMessagesThunk(currentChat?.id));
    }
  }, [arrivalMessage, currentChat, dispatch]);

  // Get all of a user's conversations
  useEffect(() => {
    dispatch(userConversationsThunk(user.userId));
  }, [user.userId, dispatch, newConversation?.id]);

  const handleSubmitMessage = (e) => {
    e.preventDefault();

    const receiverId = currentChat?.members.find(
      (member) => member.userId !== user.userId
    );

    const message = {
      text: newMessage,
      senderId: user.userId,
      conversationId: currentChat?.id,
    };
    console.log("newMessage", message);
    dispatch(newMessageThunk(message))
      .then(() => {
        dispatch(conversationMessagesThunk(currentChat?.id));
      })
      .then(() => {
        socket.current.emit("sendMessage", {
          senderId: user.userId,
          receiverId: receiverId.userId,
          text: newMessage,
          conversationId: currentChat?.id,
        });
      });
    setNewMessage("");
  };

  useEffect(() => {
    dispatch(conversationMessagesThunk(currentChat?.id));
  }, [currentChat?.id, dispatch]);

  useEffect(() => {
    setCurrentChat(userAndFriendConversation);
    console.log("userFriendConvoHit");
  }, [userAndFriendConversation]);

  useEffect(() => {
    setCurrentChat(newConversation);
    console.log("newConvoHit");
  }, [newConversation, newConversation.id]);

  // useEffect(() => {
  //   if (Object.keys(newConversation).length !== 0) {
  //     // dispatch(conversationMessagesThunk(newConversation?.id));
  //     setCurrentChat(newConversation);
  //     console.log("newConvoHit");
  //   } else if (
  //     userAndFriendConversation !== null &&
  //     Object.keys(userAndFriendConversation).length !== 0
  //   ) {
  //     // dispatch(conversationMessagesThunk(userAndFriendConversation?.id));
  //     setCurrentChat(userAndFriendConversation);
  //     console.log("userFriendConvoHit");
  //   }
  // }, [userAndFriendConversation?.id, newConversation?.id]);

  // console.log(conversations);

  console.log("currChat", currentChat);

  // const filteredConvos = conversations.filter(
  //   (convo) =>
  //     convo.members[1].fName
  //       .toLowerCase()
  //       .startsWith(convoSearchValue.toLocaleLowerCase()) ||
  //     convo.members[1].lName
  //       .toLowerCase()
  //       .startsWith(convoSearchValue.toLocaleLowerCase())
  // );
  // console.log("filtered", filteredConvos);
  // console.log("conversations", conversations);

  // const focusedChat = conversation.id === currentChat.id;
  return (
    <div className="messenger">
      <div className="convoAndOnlineCluster">
        <div className="chatMenu">
          <h2 id="title">Conversations ({conversations.length})</h2>
          <ChatUserSearch
            setActiveChatSearch={setActiveChatSearch}
            activeChatSearch={activeChatSearch}
            loggedInUser={user}
            conversations={conversations}
          />
          {conversations.length > 0 ? (
            <>
              <div className="chatMenuWrapper">
                {conversations.map((convo) => (
                  <div
                    key={convo.id}
                    onClick={() => setCurrentChat(convo)}
                    className={
                      convo.id === currentChat.id
                        ? "chatMenuEntryWrapper focused"
                        : "chatMenuEntryWrapper"
                    }
                  >
                    <Conversation
                      conversation={convo}
                      currentUser={user}
                      onlineUsers={onlineUsers}
                      currentChat={currentChat}
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
            <ChatOnline
              onlineUsers={onlineUsers}
              currentUserId={user.userId}
              loggedInUserFollowingList={loggedInUserFollowingList}
              conversations={conversations}
            />
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
