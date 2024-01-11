import placeholder from "../assets/placeholder.jpg";
import { format } from "timeago.js";

function Message({ message, own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img className="messageImg" src={placeholder} alt="" />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.date)}</div>
    </div>
  );
}

export default Message;
