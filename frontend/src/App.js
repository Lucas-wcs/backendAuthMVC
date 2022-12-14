import {useState} from "react";
import axios from "axios";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";


function App() {
    
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [modal, setModal] = useState(true);
    
    const [response, setResponse] = useState("");
    
    const [modalRequete, setModalRequete] = useState(false);
    
    const navigate = useNavigate();
    
    
    const handleLogin = (e) => {
        e.preventDefault()
        console.log(login, password)
        axios.post("http://localhost:5000/api/users/login", {login, password})
            .then((res) => {
                if(res.data === "No user found") {
                    return alert("No user Found");
                }
                
                localStorage.setItem("livecoToken", res.data);
                navigate("/accueil");
            })
            .catch((err) => {
                console.log(err);
            })
    }
    
    const handleSignIn = (e) => {
        e.preventDefault();
        console.log(login, password);
        axios.post("http://localhost:5000/api/users/register", {login, password})
            .then((res) => {
                setResponse(res.data);
                setModalRequete(true);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    
    
    useEffect(() => {
        const token = localStorage.getItem("livecoToken");
        if(token) {
            navigate("/accueil");
        }
    }, []);
    
    return (
        <>
            <div className="App">
        <button onClick={() => setModal(true)}>Connexion</button>
        <button onClick={() => setModal(false)}>Inscription</button>
        {modal ?
            <form onSubmit={handleLogin}>
                <input type="text" placeholder={"login"} value={login} onChange={(e) => setLogin(e.target.value)}/>
                <input type="text" placeholder={"mot de passe"} value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type={"submit"}>Connexion</button>
            </form>
            :
            <form onSubmit={handleSignIn}>
                <input type="text" placeholder={"login"} value={login} onChange={(e) => setLogin(e.target.value)}/>
                <input type="text" placeholder={"mot de passe"} value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type={"submit"}>Inscription</button>
            </form>}
    
        {modalRequete &&
            <div style={{position : "absolute", top : "50%", left : "50%", width : "300px", height : "300px", backgroundColor : "red"}}>
                <p>{response}</p>
                <button onClick={() => setModalRequete(false)}>Close</button>
            </div>
        }
    </div>
        
            </>
        
    );
}

export default App;
