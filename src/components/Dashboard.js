import React from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router";
import {auth, db} from "./firebase"
import { Link } from "react-router-dom";
import { logout } from "./firebase";



const Dashboard = ()=> {

    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const fetchUserName = async () => {
        try{
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();

            setName(data.name);
        }catch(err){
            console.error(err);
            alert("error occurred while fetching data")
        }
    }

    useEffect(() => {
        if(loading) return;
        if(!user) return navigate("/");
    
    fetchUserName();
}, [user, loading]);
return(
    <div>
        <div>{name}</div>
        <div>{user?.email}</div>
        <button onClick={logout}>Logout</button>
        <Link to="/chatroom">Chatroom</Link>
    </div>
)


} 

export default Dashboard;