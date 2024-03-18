import ChatOnline from "../../components/ChatOnline/ChatOnline";
import Conversation from "../../components/Conversation/Conversation";
import Message from "../../components/Message/Message";
import { useState, useEffect, useRef } from "react";
import { userConversationsThunk } from "../../store/conversation";
import { useDispatch, useSelector } from "react-redux";
import {
  conversationMessagesThunk,
  newMessageThunk,
} from "../../store/message";
import { io } from "socket.io-client";
import EmptyState from "../../components/EmptyState/EmptyState";
import SendIcon from "@mui/icons-material/Send";
import ChatUserSearch from "../../components/ChatUserSearch/ChatUserSearch";
import "./Messenger.css";

function Messenger({
  loggedInUserFollowingList,
  activeChatSearch,
  setActiveChatSearch,
}) {
  const dispatch = useDispatch();
  const scrollRef = useRef();
  const socket = useRef();
  const [currentChat, setCurrentChat] = useState({});
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState({});
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingIndicator, setTypingIndicator] = useState({
    convoId: null,
    isTyping: false,
    activeIndicator: false,
  });

  const currentChatRef = useRef(currentChat);

  const setCurrentChatRef = (data) => {
    currentChatRef.current = data;
    setCurrentChat(data);
  };

  // Conversation between logged in user and another specific user
  const userAndFriendConversation = useSelector(
    (state) => state.conversation.userAndFriendConversation
  );

  // User's most recent new conversation, if one exists
  const newConversation = useSelector(
    (state) => state.conversation.newConversation
  );

  // All of the logged in user's conversations
  const conversations = useSelector(
    (state) => state.conversation.userConversations
  );

  // All messages for the conversation that is selected for "currentChat"
  const messages = useSelector((state) => state.message.conversationMessages);

  // Logged In User
  const user = window.sessionStorage.getItem("userInfo")
    ? JSON.parse(window.sessionStorage.getItem("userInfo"))
    : "";

  // Get all of a user's conversations
  useEffect(() => {
    dispatch(userConversationsThunk(user.userId));
  }, [user.userId, dispatch, newConversation?.id]);

  // Refetch messages whenever the currentChat changes
  useEffect(() => {
    if (currentChat?.id) {
      dispatch(conversationMessagesThunk(currentChat?.id));
    }
    setNewMessage("");
  }, [currentChat?.id, dispatch]);

  // Ensure socket is the same and handle receiving messages
  useEffect(() => {
    if (!socket.current) {
      socket.current = io("ws://localhost:8080");
    }
    socket.current.on("getMessage", (data) => {
      setTypingIndicator(false);
      setArrivalMessage((prev) => ({
        ...prev,
        text: data.text,
        senderId: data.senderId,
      }));
      // If a message is sent for a new conversation, refetch the user's conversations to display the new one
      const conversationExists = conversations.some((convo) =>
        convo.members.some((member) => member.userId === data.senderId)
      );
      if (!conversationExists) {
        dispatch(userConversationsThunk(user.userId));
      }
    });
  }, []);

  // Handle scrolling to most recent message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  // Hanlde setting an active typing indicator based on the current chat
  useEffect(() => {
    if (
      currentChat?.id === typingIndicator.convoId &&
      typingIndicator.isTyping
    ) {
      setTypingIndicator({ ...typingIndicator, activeIndicator: true });
    } else if (currentChat?.id !== typingIndicator.convoId) {
      setTypingIndicator({ ...typingIndicator, activeIndicator: false });
    }
  }, [currentChat?.id, typingIndicator.isTyping]);

  // Handle receiving a typing indicator
  useEffect(() => {
    socket.current.on("typingIndicator", (data) => {
      if (data.message !== "") {
        setTypingIndicator({
          ...typingIndicator,
          convoId: data.conversationId,
          isTyping: true,
        });
      } else {
        setTypingIndicator({
          ...typingIndicator,
          convoId: data.conversationId,
          isTyping: false,
        });
      }
      // }
    });
  }, []);

  // Handle setting a typing indicator
  const handleTyping = (e) => {
    const receiverId = currentChat?.members.find(
      (member) => member.userId !== user.userId
    );
    socket.current.emit("userTyping", {
      senderId: user.userId,
      receiverId: receiverId.userId,
      conversationId: currentChat?.id,
      message: e.target.value,
    });
  };

  // When a new user logs on to the messenger page, add them to online users
  useEffect(() => {
    socket.current.emit("addUser", user.userId);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
  }, [user.userId]);

  // Refetch messages if a new message has been received, only if it belongs to the currentChat
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

  // When a conversation is fetched in OnlineFriends or chatMenuSearch, set currentChat to that conversation
  useEffect(() => {
    setCurrentChat(userAndFriendConversation);
  }, [userAndFriendConversation?.id]);

  // When a new conversation is dispatched, set currentChat to that conversation
  useEffect(() => {
    setCurrentChat(newConversation);
  }, [newConversation?.id]);

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
                    onClick={() => setCurrentChatRef(convo)}
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
            <EmptyState />
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
          <div className="chatBoxMiddle">
            {typingIndicator.activeIndicator && (
              <div className="typingIndicator">
                <span className="typingIndicatorDot"></span>
                <span className="typingIndicatorDot"></span>
                <span className="typingIndicatorDot"></span>
              </div>
            )}
          </div>
          <div className="chatBoxBottom">
            <textarea
              className="chatMessageInput"
              placeholder="Message..."
              onChange={(e) => {
                setNewMessage(e.target.value);
                handleTyping(e);
              }}
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
