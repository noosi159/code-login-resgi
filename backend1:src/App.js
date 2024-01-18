import React, { useEffect, useState } from "react";
import Axios from 'axios';
import './App.css';
function App() {
const [usernameReg, setUernameReg] = useState("");
const [passwordReg, setPasswordReg] = useState ("");
const [username, setUername] = useState("");
const [password, setPassword] = useState ("");
const [loginStatus, setLoginStatus] = useState("");
const register = () => {
   Axios.post("http://api.backend2.com:4040/register", {
     username: usernameReg,
     password: passwordReg,
   }).then((response) => {
     console.log(response);


     if (!response.data.err) {
        setLoginStatus("'"+usernameReg + "' was inserted.");
     } else {
        setLoginStatus(response.data.err.sqlMessage);
     }


   });
};
const login = () => {
  Axios.post("http://api.backend2.com:4040/login", {
    username: username,
    password: password,
  }).then((response) => {
    console.log(response);
    //console.log("response.data.message: "+response.data[0].message);


    if (!response.data.message) {
       setLoginStatus("'"+response.data[0].username + "' was logged in.");
    } else {
       setLoginStatus(response.data.message);
    }
 
 });
};


return (
   <div className="App">
      <div className="registration">
         <h1>Registration</h1>
         <label>Username</label>
         <input
            type="text"
            onChange={(e) => {
               setUernameReg(e.target.value);
            }}
         /><br/>
         <label>password</label>
         <input
           type="text"
           onChange={(e) =>{
              setPasswordReg(e.target.value);
           }}
         /> <br />
         <button onClick={register} > Register</button>
      </div>
      <div className="login">
          <h1>Login</h1>
          <input
             type="text"
             placeholder="Username…"
             onChange = { (e) => {
                setUername (e.target.value);
             }}
             /> <br/>
          <input
             type="password"
             placeholder="Password…"
             onChange = { (e) => {
                setPassword (e.target.value);
             }}
          />
          <button onClick={login}>Login</button>
      </div>
      <h1> {loginStatus}</h1>
   </div>
);
}


export default App;