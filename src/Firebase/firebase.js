
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAJZgZ8VZFSJysh8YHk6WInOQceV5Yxlwc",
  authDomain: "quickwheather-b7595.firebaseapp.com",
  projectId: "quickwheather-b7595",
  storageBucket: "quickwheather-b7595.appspot.com",
  messagingSenderId: "484222617260",
  appId: "1:484222617260:web:8a0ca7e3ea6a4019508109"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const analytics = getAnalytics(app);
const database = getDatabase(app);
export default firebaseConfig
export {app, database}