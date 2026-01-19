import { Navigate } from "react-router-dom";
import { getSession } from "../utils/session";

const ProtectedRoute = ({ children, role }) => {
  const session = getSession();
    if (!session) {
        return <Navigate to="/" replace />;}
    if (role && session.role !== role) {
        return <Navigate to="/" replace />;}

  return children;
};

export default ProtectedRoute;