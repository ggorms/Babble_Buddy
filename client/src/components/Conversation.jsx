import placeholder from "../assets/placeholder.jpg";

function Conversation() {
  return (
    <div className="conversation">
      <img className="conversationImg" src={placeholder} alt="" />
      <span className="conversationName">John Doe</span>
    </div>
  );
}

export default Conversation;
