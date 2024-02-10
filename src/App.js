
import sty from "./wheather/style.css";
import Wheather from './wheather/Wheather';
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import SignUp from "./LoginPage/signUp";
import { useDispatch, useSelector } from "react-redux";
import { adduser, logout, selectUser, storeDatabase } from "./app/LoginLogout";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { app } from "./Firebase/firebase";
import { serverTimestamp } from "firebase/database";
function App() {
  const User = useSelector(selectUser);
  const dispatch = useDispatch()
const auth = getAuth(app)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      
      if (user) {
        //.log("user")
        dispatch(adduser({
          userId: user.uid,
          email: user.email,
          addedDate: serverTimestamp(),
          ActiveStatus:true,
        }))
dispatch( storeDatabase({
  userId: user.uid,
  email: user.email,
  addedDate: serverTimestamp(),
  ActiveStatus:true,
}))
        
      } else {
dispatch(logout())
      }
    });
  }, [])
  return (
     
    <BrowserRouter>
            <Routes>  
              <Route path="/" element={User ? <Wheather/>:<SignUp/>}/>
              <Route path="/signup" element={<SignUp/>}/>
            </Routes>
        </BrowserRouter>
  );
}

export default App;
// https://quickwheather-b7595.web.app/