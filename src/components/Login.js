import React, { useEffect, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import {
  auth,
  logInWithEmailAndPassword,
  signInWithEmailAndPassword,
} from './firebase'

import { useAuthState } from 'react-firebase-hooks/auth'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, loading, error] = useAuthState(auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (loading) {
      return
    }

    if (user) navigate('/dashboard')
  }, [user, loading])

  return (
    <div>
      <input
        type="text"
        className="login_txt"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email Address"
      />
      <input
        type="password"
        className="login_txt"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button
        className="login_btn"
        onClick={() => logInWithEmailAndPassword(email, password)}
      >
        Login
      </button>
      <div>
        {' '}
        <Link to="/reset">Forgot Password</Link>
      </div>
      <div>
        <Link to="/register">Register </Link>
      </div>
    </div>
  )
}
export default Login
