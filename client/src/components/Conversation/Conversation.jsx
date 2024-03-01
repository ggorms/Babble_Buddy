import "./Conversation.css";

function Conversation({ conversation, currentUser, onlineUsers }) {
  // Find the user in the conversation who is not the logged in user
  const friend = conversation.members.find(
    (member) => member.userId !== currentUser.userId
  );

  const onlineUserIds = onlineUsers.map((user) => user.userId);

  return (
    <div className="conversation">
      <div className="chatOnlineImgContainer">
        <img className="chatOnlineImg" src={friend?.avatar} alt="" />
        {onlineUserIds.includes(friend.userId) && (
          <div className="chatOnlineBadge"></div>
        )}
      </div>
      <span className="conversationName">
        {friend.fName} {friend.lName}
      </span>
    </div>
  );
}

export default Conversation;
