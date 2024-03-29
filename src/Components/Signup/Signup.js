import React, { useContext, useState } from 'react';
import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../Store/Context';
import './Signup.css';
import { useNavigate } from "react-router-dom";


export default function Signup() {

  const {Firebase} = useContext(FirebaseContext);
  const navigate = useNavigate()
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassWord] = useState('');
  const [phone, setPhone] = useState('');
  const handleSubmit =(e)=>{
    e.preventDefault()
    console.log(Firebase)
    Firebase.auth().createUserWithEmailAndPassword(email, password).then((result) =>{
      result.user.updateProfile({displayName:userName}).then(()=>{
        Firebase.firestore().collection("users").add({
          id:result.user.uid,
          username:userName,
          phone:phone
        }).then(()=>{
          navigate('/login')
        })
      })
    })
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit} >
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="username"
            value={userName}
            onChange={(e)=>setUserName(e.target.value)}
            name="name"
            defaultValue="your name"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="emailname"
            name="email"
            defaultValue="email"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="phonename"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="passname"
            value={password}
            onChange={(e)=>setPassWord(e.target.value)}
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
