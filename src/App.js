import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from "react-router-dom"
import { ThemeProvider } from "./Context/ThemeContext"
import { BoardProvider } from "./Context/BoardContext"
import BoardsPage from "./Pages/BoardsPage"
import Board from "./components/Board/Board"
import { Home } from "./Pages/Home"
import { AdminLogin } from "./Pages/AdminLogin"
import { UserLogin } from "./Pages/UserLogin"
import AdminDashboard from "./Pages/AdminDashboard"
import UserDashboard from "./Pages/UserDasboard"
import Navbar from "./components/NavBar"

const ProtectedRoute = ({ children, role }) => {
  const session = JSON.parse(localStorage.getItem("session"))
  if (!session) return <Navigate to="/" replace />
  if (role && session.role !== role) return <Navigate to="/" replace />
  return children}

function AppContent() {
  return (
    <div className="min-h-screen flex flex-col">
       <Navbar />
      <div className="flex-1 bg-gray-50 dark:bg-green-900 overflow-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/user" element={<UserLogin />} />
          <Route
            path="/dashboard/admin"  element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute> } />
          <Route
            path="/dashboard/:userId" element={
              <ProtectedRoute role="user">
                <UserDashboard />
              </ProtectedRoute> } />
          <Route path="/board" element={<Navigate to="/boards" />} />
          <Route path="/boards" element={<BoardsPage />} />
          <Route
            path="/boards/:boardId" element={
              <ProtectedRoute role="user">
                <BoardWrapper />
              </ProtectedRoute> } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  )
}
function BoardWrapper() {
  const { boardId } = useParams();
  return <Board boardId={boardId} />;
}

export default function App() {
  return (
    <ThemeProvider>
      <BoardProvider>
        <Router>
          <AppContent />
        </Router>
      </BoardProvider>
    </ThemeProvider>
  );
}
