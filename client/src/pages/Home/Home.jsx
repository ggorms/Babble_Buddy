import "./Home.css";
import Instructions from "../../components/Instructions/Instructions";
import AboutUs from "../../components/AboutUs/AboutUs";

function Home() {
  return (
    <div>
      <div className="homeImageContainer"></div>
      <Instructions />
      <AboutUs />
    </div>
  );
}

export default Home;
