import { format } from "timeago.js";
import "./Message.css";

function Message({ message, own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img className="messageImg" src={message.sender.avatar} alt="" />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.date)}</div>
    </div>
  );
}

export default Message;
