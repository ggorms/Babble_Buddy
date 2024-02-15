import phoneWithMessage from "../assets/aboutphoto1.png";
import twoPeopleChatting from "../assets/aboutphoto2.png";
import guyWithFloatingMessages from "../assets/aboutphoto3.jpg";

function AboutUs() {
  return (
    <div className="aboutWrapper">
      <div id="aboutSegment1">
        <p className="aboutText">
          At Babble Buddy, we&#39;re dedicated to providing a streamlined and
          efficient messaging experience that puts direct communication front
          and center. We understand the importance of simplicity and privacy in
          today&#39;s fast-paced digital world, which is why we&#39;ve crafted a
          platform that focuses solely on direct messaging.
        </p>
        <img src={twoPeopleChatting} className="aboutImg" />
      </div>
      <div id="aboutSegment2">
        <p className="aboutText">
          Gone are the distractions of group chats and cluttered timelines. With
          Babble Buddy, your conversations take center stage, allowing you to
          connect with friends, family, and colleagues with ease and clarity.
        </p>
        <img src={guyWithFloatingMessages} className="aboutImg" />
      </div>
      <div id="aboutSegment1">
        <p className="aboutText">
          Join us on a journey to simplify and elevate the way we communicate.
          Experience the power of direct messaging with Babble Buddy, where
          every message counts.
        </p>
        <img src={phoneWithMessage} className="aboutImg" />
      </div>
    </div>
  );
}

export default AboutUs;
