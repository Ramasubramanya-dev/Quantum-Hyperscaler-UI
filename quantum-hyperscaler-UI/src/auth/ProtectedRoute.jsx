import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function ProtectedRoute({ children, redirectTo="/console" }) {
  const { user, loading } = useAuth();
  if (loading) return <div style={{padding:16}}>Loading…</div>;
  return user ? children : <Navigate to={redirectTo} replace />;
}
