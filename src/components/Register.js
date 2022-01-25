import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, registerWithEmailAndPassword } from './firebase';
import {Link, useNavigate} from "react-router-dom";

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const [user, loading, error] = useAuthState(auth)
  const navigate = useNavigate()

  const register = () => {
    if (!name) alert('Please enter name')
    registerWithEmailAndPassword(name, email, password)
  }

  useEffect(() => {
    if (loading) return
    if (user) navigate('/dashboard')
  }, [user, loading])

  return (
    <div>
      <input
        type="text"
        className="register_txt"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full Name"
      />
      <input
        type="text"
        className="register_txt"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email Address"
      />
      <input
        type="password"
        className="register_txt"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
  
      <button className='register_btn' onClick={register}> Register</button>
     <div><Link to="/">Login</Link></div>
    </div>
  );
}

export default Register
