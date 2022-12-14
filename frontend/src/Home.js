import React, {useEffect} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Home = () => {
    
    const navigate = useNavigate();
    
    useEffect(() => {
        console.log("Bearer " + localStorage.getItem("livecoToken"));
        axios.get("http://localhost:5000/api/users", {
           headers : {
               "authorization" : "Bearer "+ localStorage.getItem("livecoToken"),
           }
        })
        
    }, [])
    
    return (
        <div>
            Page d'accueil
            <button onClick={() => {localStorage.clear(); navigate("/")}}>Deconnexion</button>
        </div>
    );
};

export default Home;