import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Dashboard, Login, Profile, Signup, Transaction } from "./pages";
import Chat from "./pages/Chat/Chat";
import Community from "./pages/Community/Community";
import SharedCommunityPost from "./pages/Shared Community Post/SharedCommunityPost";
import Calender from "./pages/Calender/Calender";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { login, logout, selectUser } from "./features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  // const user = useSelector((state) => state.user);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            email: auth.currentUser.email,
            uid: auth.currentUser.uid,
            displayName: auth.currentUser.displayName,
            photoURL: auth.currentUser.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  // console.log(user);
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/my-profile" element={<Profile />} />
      <Route path="/messages" element={<Chat />} />
      <Route path="/transactions" element={<Transaction />} />
      {/* <Route path="/community" element={<Community/>}>
      <Route path=":postId" element={<SharedCommunityPost />}></Route>
      </Route> */}
      <Route path="/calender" element={<Calender />}></Route>
    </Routes>
  );
}

export default App;
