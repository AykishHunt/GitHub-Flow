import { Link, useNavigate } from "react-router-dom"

export default function Navbar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("session")
    navigate("/")}

  return (
    <nav className="h-14 bg-green-700 text-white shadow flex items-center justify-between px-6">
      <div className="w-24"></div>
      <Link  to="/"
        className="text-xl font-bold hover:text-gray-100 text-center flex-1" >
        Kanban Workspace </Link>

      <div className="w-24 flex justify-end">
        <button  onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white" >
          Logout  </button>
      </div>
    </nav>
  )
}
