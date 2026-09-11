import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";
import { toast } from "sonner";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      toast.error("Please sign in to access the dashboard");
    }
  }, [loading, user]);

  if (loading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
