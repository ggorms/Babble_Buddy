import Chat from "./components/Chat";
import "./App.css";
import Home from "./pages/Home";

import { Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}

export default App;
