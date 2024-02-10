import React, { useState, useEffect, } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue, set,  get, orderByChild, equalTo, query } from 'firebase/database';
import './loginf.css'; // Import the CSS file
import { remove } from 'firebase/database';
import { app } from '../Firebase/firebase';



const ActiveUsers = () => {
    const [users, setUsers] = useState([]);
    const [active,setactive] = useState(true);
    const deleteItem = (itemId) => {
          
        const updatedItems = users.filter(item => item.userId !== itemId);
        setUsers(updatedItems);
    };
    useEffect(() => {
        // Initialize Firebase
        const auth = getAuth(app);
        const db = getDatabase(app);

        const unsubscribe = onAuthStateChanged(auth, user => {
            
            const usersRef = ref(db, 'users');
            onValue(usersRef, (uservalue) => {
                const usersData = uservalue.val();
                if (usersData) {
                    const usersArray = Object.values(usersData);
                    setUsers(usersArray)
                } else {
                    console.log("No users found");
                }
            }, (error) => {
                console.error("Error retrieving users data:", error);
            });
          

        });

        return () => unsubscribe();
    }, [app]);

const markInactive = async (userId) => {
    setactive(!active)
let key =  await fetchUserKeyByUserId(userId);
console.log(key)
    const db = getDatabase(app);
    const userRef = ref(db, `users/${key}`);
      
    // Retrieve user data from Firebase
    get(userRef)
        .then((snapshot) => {
            const userData = snapshot.val();
            if (userData) {
                // Update the ActiveStatus property of the user
                userData.ActiveStatus = active;
                // Set the updated user data back to Firebase
                set(userRef, userData)
                    .then(() => {
                        console.log("User marked as inactive successfully!");
                    })
                    .catch(error => {
                        console.error("Error marking user as inactive:", error);
                    });
            } else {
                console.log("User not found");
            }
        })
        .catch(error => {
            console.error("Error retrieving user data:", error);
        });
};




const fetchUserKeyByUserId = async (userId) => {
    const db = getDatabase();
    const usersRef = ref(db, 'users');

    try {

        const userQuery = query(usersRef, orderByChild('userId'), equalTo(userId));

        const snapshot = await get(userQuery);

        if (snapshot.exists()) {
            // Get the key of the user
            const userKey = Object.keys(snapshot.val())[0];
            console.log("User Key:", userKey);
            return userKey;
        } else {
            console.log("User not found");
            return null;
        }
    } catch (error) {
        console.error("Error fetching user key:", error);
        return null;
    }
};




const deleteUser = async (userId) => {
    try {
        let key = await fetchUserKeyByUserId(userId);
        const db = getDatabase(app);
        const userRef = ref(db, `users/${key}`);
        
        // Remove the user from the database
        await remove(userRef);
        
        // Remove the user from the local state
        deleteItem(userId);
        
        console.log("User deleted successfully.");
    } catch (error) {
        console.error("Error deleting user:", error);
    }
};


    return (
        
        <>




            <h1 id='title'>Users Admin</h1>
            <table id='user'>
            <thead>
        <tr>
            <th>Email</th>
            <th>Uid</th>
            <th>Added Date</th>
            <th>Status</th>
            <th>Action</th>
        </tr>
    </thead>
                <tbody>
                   {
                     users.map((user) => {
                        return (
                            <tr key={user.email}>
                                <td><strong>{user.email}</strong></td>
                                <td><strong>{user.userId}</strong></td>
                                <td><strong>{`${new Date(user.addedDate).toLocaleTimeString()}`}</strong></td>
                                <td style={{color:`${user.ActiveStatus ? "green":"red"}`}}><strong>{user.ActiveStatus ?"Active":"Deactivate"}</strong></td>
                                <td className='operation'>
                                <button className='button' onClick={() => markInactive(user.userId)}>{!user.ActiveStatus ?"Mark Active":" Mark Deactivate"}</button>
                                 <button className='button' onClick={() => deleteUser(user.userId)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })
                   }
                </tbody>
            </table>
        </>
    





    );
};

export default ActiveUsers;


  