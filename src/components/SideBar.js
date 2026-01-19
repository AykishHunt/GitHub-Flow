import { NavLink } from "react-router"
import { ThemeToggle } from "./ThemeToggle"
import { useBoard } from "../Context/BoardContext"

export default function Sidebar() {
  const { exportBoards, importBoards } = useBoard()

  const activeClass = "bg-green-500 dark:bg-gray-800 text-white font-semibold"
  const inactiveClass = "text-white font-medium hover:bg-green-500 dark:hover:bg-gray-800 transition-colors duration-200"

  return (
    <div className="w-64 bg-green-600 dark:bg-gray-900 text-white p-6 flex flex-col justify-between h-screen shadow-lg">
      
      
      <div>
        <div className="flex items-center justify-between mb-6">

          <h2 className="text-2xl font-bold tracking-wide">Boards</h2>

          <ThemeToggle />

        </div>


        <nav className="flex flex-col space-y-2">
          <NavLink to="/"
           className={({ isActive }) =>
              `pl-4 py-2 rounded-lg text-sm ${isActive ? activeClass : inactiveClass}`  }>Home</NavLink>

          <NavLink
            to="/boards"
            className={({ isActive }) =>
              `pl-4 py-2 rounded-lg text-sm ${isActive ? activeClass : inactiveClass}`  } >
            Boards </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `pl-4 py-2 rounded-lg text-sm ${isActive ? activeClass : inactiveClass}` }>
            Analytics  </NavLink>

        </nav>

        
      </div>

      <div className="mt-6 space-y-3">
        <button
          onClick={exportBoards}
           className="w-full py-2 px-4 rounded-lg bg-white text-green-700 font-semibold shadow hover:bg-green-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition-colors duration-200" >
          Export Boards </button>

        <label className="w-full block py-2 px-4 rounded-lg bg-white text-green-700 font-semibold text-center cursor-pointer shadow hover:bg-green-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition-colors duration-200">
          Import Board
         <input
            type="file"
            accept="application/json" onChange={(e) => importBoards(e.target.files[0])}
            className="hidden" />
        </label>
      </div>
    </div>
  )
}
