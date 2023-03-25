import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Dashboard, Login, Profile, Signup } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/my-profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
