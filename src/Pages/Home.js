import { Link } from "react-router"

export const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center mb-16 ">
        <div className="mb-5 text-center ">
        <h1 className="text-xl text-gray-800 lg:text-5xl mb-5 font-bold">KanBan Workspace</h1>
        <p className="text-base text-gray-600 lg:text-2xl mb-5 ">Sign in here to access this web application</p>
        </div>

        <div className="flex">
        <Link to="/admin" className="bg-green-500 p-2 rounded-md shadow-md hover:bg-green-600 text-white mx-2 ">Admin Login</Link>
        <Link to= "/user" className="bg-green-500 p-2 rounded-md shadow-md hover:bg-green-600 text-white mx-2">User Login</Link>
        </div>

    </div>
  )
}
