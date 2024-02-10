import { createSlice } from "@reduxjs/toolkit";
import { get, getDatabase, onValue, push, ref, } from "firebase/database";
import { app } from "../Firebase/firebase";
const LoginLogut = createSlice({
    name: "user",
    initialState: {
        User: null
    },
    reducers: {
        adduser(state, action) {
          state.User = action.payload;
        }, storeDatabase(state, action) {
            const db = getDatabase();
    const usersRef = ref(db, 'users');

    // Check if the user with the same userId already exists in the database
    onValue(usersRef, (snapshot) => {
        const usersData = snapshot.val();
        if (usersData) {
            const userExists = Object.values(usersData).some(user => user.userId === action.payload.userId);
            if (userExists) {
                console.log("User with the same userId already exists in the database.");
                return; // Exit the function if user exists
            }
        }
            push(usersRef, action.payload)
            .then((newUserRef) => {
                console.log("User added successfully with key:", newUserRef.key);
            })
            .catch((error) => {
                console.error("Error adding user:", error);
            });
        

       
    }, (error) => {
        console.error("Error retrieving users data:", error);
    });
        }
        ,



        logout(state, action) {
            state.User = null;
        }
    }




})
export default LoginLogut.reducer;
export const { adduser, logout, storeDatabase } = LoginLogut.actions;
export const selectUser = (state) => state.user.User;