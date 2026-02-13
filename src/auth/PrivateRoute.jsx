import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function PrivateRoute({ children }) {
  const { isAuthed, booting } = useAuth();

  if (booting) return null; 
  if (!isAuthed) return <Navigate to="/" replace />; 

  return children;
}
