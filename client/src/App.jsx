import "./App.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import Messenger from "./pages/Messenger";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/messenger" element={<Messenger />} />
    </Routes>
  );
}

export default App;
