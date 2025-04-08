import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './index.css'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()

  const submitForm = async event => {
    event.preventDefault()

    const userDetails = {
      username,
      password,
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    }

    try {
      const response = await fetch('https://fakestoreapi.com/auth/login', options)
      const data = await response.json()

      if (response.ok) {
        console.log('Login successful:', data)
        navigate('/') // Redirect to Home page
      } else {
        setErrorMsg(data.message || 'Login failed. Try again.')
      }
    } catch (error) {
      setErrorMsg('Something went wrong. Please try again later.')
      console.error('Fetch error:', error)
    }
  }

  return (
    <div className="login-form-container">
      <form onSubmit={submitForm} className="form">
        <h1 className="form-title">Login</h1>

        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          placeholder="Enter your username"
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          placeholder="Enter your password"
        />

        {errorMsg && <p className="error-msg">{errorMsg}</p>}

        <button type="submit" className="submit-button">
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
