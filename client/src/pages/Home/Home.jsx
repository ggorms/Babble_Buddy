import "./Home.css";
import Instructions from "../../components/Instructions/Instructions";
import AboutUs from "../../components/AboutUs/AboutUs";
import chatImg from "../../assets/chat.jpg";

function Home() {
  return (
    <div>
      <div
        className="homeImageContainer"
        style={{ backgroundImage: `url(${chatImg})` }}
      ></div>
      <Instructions />
      <AboutUs />
    </div>
  );
}

export default Home;
