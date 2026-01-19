import { useState } from "react"
import { useNavigate } from "react-router"
export const AdminLogin = () => {
    const [name, setName] = useState()
    const [pass, setPass] = useState()
    const [error, setError] = useState()
    const username = "Admin"
    const password = "147"
    const navigate = useNavigate()
    const submitHandler =(e)=>{
            e.preventDefault()
        if(name !== username || pass !== password) {
            setError("username or password is not correct")
            setTimeout(() => {   setError("") }, 3000)
          return  
        }
        else{
            setError("");  localStorage.setItem(
              "session", JSON.stringify({ role: "admin", username: name }))
            navigate("/dashboard/admin")} }
    
  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-sm bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center"> Admin Login </h2>
        <input  type="text" value={name} placeholder="Admin Username" onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black" />
        <input type="password" value={pass} placeholder="Password" onChange={(e) => setPass(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black" />
        {error && ( <p className="mb-4 text-sm text-red-600 text-center"> {error} </p> )}
        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition">
          Login as Admin </button> </form> </div>
    </>
  )
}
