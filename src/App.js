import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Dashboard, Login, Profile, Signup, Transaction } from "./pages";
import Chat from "./pages/Chat/Chat";
import Community from "./pages/Community/Community";
import SharedCommunityPost from "./pages/Shared Community Post/SharedCommunityPost"
import Calender from "./pages/Calender/Calender";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/my-profile" element={<Profile />} />
      <Route path="/messages" element={<Chat/>}/>
      <Route path="/transactions" element={<Transaction />} />
      <Route path="/community" element={<Community/>}>
      <Route path=":postId" element={<SharedCommunityPost />}></Route>
      </Route>
      <Route path="/calender" element={<Calender/>}></Route>
    </Routes>
  );
}

export default App;
