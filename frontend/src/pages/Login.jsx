import React, { useState } from "react"
import "./Login.css"

const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    const url = isLogin ? "http://localhost:5000/api/user/login" : "http://localhost:5000/api/user/register"

    const bodyData = isLogin ? { email, password } : { name, email, password }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyData)
      })

      const data = await response.json()

      if (data.success) {
        
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user))

        alert(isLogin ? "Login Successful " : "Account Created ")
        window.location.href = "/"
      } else {
        alert(data.message)
      }

    } catch (error) {
      console.log(error)
      alert("Server Error")
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h2 className="auth-title">
          {isLogin ? "Login" : "Create Account"}
        </h2>

        <form onSubmit={handleSubmit}>

          {!isLogin && (
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="auth-input"
              required
            />
          )}

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
            required
          />

          <button type="submit" className="auth-btn">
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        <p className="auth-toggle">
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Create Account" : " Login"}
          </span>
        </p>

      </div>
    </div>
  )
}

export default Login;