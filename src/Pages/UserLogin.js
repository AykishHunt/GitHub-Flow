import { useState } from "react"
import { useNavigate } from "react-router"
import { users } from "../Data/Data"
export const UserLogin = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
   const navigate = useNavigate()
  const handleLogin = (e) => {
      e.preventDefault()
    const user = users.find(
      (u) => u.username === username && u.password === password)
    if (!user) {
      setError("Invalid username or password")
      return}

    localStorage.setItem(
      "session",
      JSON.stringify({ role: "user", id: user.id, username: user.username })
    )
   
    navigate(`/dashboard/${user.id}`)
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin}
        className="w-full max-w-sm bg-white p-6 rounded-xl shadow-lg" >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center"> User Login</h2>
        <input type="text"  placeholder="Username"  value={username} onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"  />
        <input type="password"  placeholder="Password"  value={password} onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"/>
      {error && (
          <p className="mb-4 text-sm text-red-600 text-center">{error}</p> )}
        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition">
          Login</button>
      </form>
    </div>
  )
}
