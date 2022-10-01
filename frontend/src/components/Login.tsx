import { useEffect, useState } from "react";
import "./Globalstyles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

export default function Login() {
  useEffect(() => {
    async function fp() {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      console.log(result.visitorId);
      setVisitorId(result.visitorId)
      const obj = {visitorToken: result.visitorId}
      const res = await axios.post('http://localhost:5000/checkVisited',obj)
      
      if(res.status==200){
        navigate("/dashboard", { state: { id: res.data } });
      }
      if(res.status==400){
        return;
      }
    }
    fp();
    
  },[]);

  const navigate = useNavigate();
  const [Page, setPageState] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState('');
  const [visitorId,setVisitorId] = useState('');

  const signUpOpenHandler = () => {
    setEmail("");
    setPassword("");
    setName("");
    setError('')
    setPageState("Signup");
  };
  const LoginOpenHandler = () => {
    setEmail("");
    setPassword("");
    setName("");
    setError('')
    setPageState("Login");
  };

  const LoginHandler = async () => {
    let obj = {
      email: email,
      password: password,
      visitorId:visitorId
    };
    try{
        const response = await axios.post("http://localhost:5000/login", obj);
        const data = response.data;
        console.log(data);
        navigate("/dashboard", { state: { id: data } });
    }catch(e){
        setError('Could Not Login')
    }
    
  };
  const SignUpHandler = async () => {
    let obj = {
      name: name,
      email: email,
      password: password,
      visitorId: visitorId
    };
    
    const response = await axios.post("http://localhost:5000/signup", obj);
    const data = response.data;
    console.log(data);
    if (data.message == "User already exists") {
      setError('User already exists');
      return;
    }
    navigate("/dashboard", { state: { id: data.user } });
  };

  return (
    <>
      {Page === "Login" && (
        <>
        
          <div className="form">
            <h1>Login</h1>
            <input
              type="email"
              placeholder="Enter email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              required
            />
            <input
              type="password"
              placeholder="Enter Password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              required
            />
            <button onClick={LoginHandler}>Login</button>
            {error && <p style={{color:"red"}}> {error}</p>}
            <p style={{color:"blue",textDecoration:"underline",cursor:"pointer"}} onClick={signUpOpenHandler}>Signup</p>
          </div>
        </>
      )}
      {Page === "Signup" && (
        <>
          <div className="form">
            <h1>Signup</h1>
            
            <input
              type="text"
              placeholder="Enter your Name"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              required
            />
            <input
              type="email"
              placeholder="Enter email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              required
            />
            <input
              type="password"
              placeholder="Enter Password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              required
            />
            <button onClick={SignUpHandler}>Signup</button>
            {error && <p style={{color:"red"}}>Email id already in use. Please Log In instead.</p>}
            <p style={{color:"blue",textDecoration:"underline",cursor:"pointer"}} onClick={LoginOpenHandler}>Login</p>
          </div>
        </>
      )}
    </>
  );
}
