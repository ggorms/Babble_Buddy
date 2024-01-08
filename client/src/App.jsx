import "./App.css";
import Home from "./pages/Home";

import { Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import Messenger from "./pages/Messenger";
// import ChatHub from "./pages/ChatHub";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/chat" element={<ChatHub />} /> */}
      <Route path="/auth" element={<Auth />} />
      <Route path="/messenger" element={<Messenger />} />
    </Routes>
  );
}

export default App;
