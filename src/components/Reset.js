import react, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { auth, sendPasswordReset } from './firebase'

function Reset() {
  const [email, setEmail] = useState('')
  const [user, loading, error] = useAuthState(auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (loading) return
    if (user) navigate('/dashboard')
  }, [user, loading])

  return (
    <div>
      <input
        type="text"
        className="reset_input"
        value={email}
        onChange={(e) => setEmail(e.tarrget.value)}
        placeholder="Email Address"
      />
      <button className="reset_btn" onClick={() => sendPasswordReset(email)}>
        Password reset button
      </button>
      <div>
        Don't have an account? <Link to="/register">Register</Link>
      </div>
    </div>
  )
}
export default Reset
