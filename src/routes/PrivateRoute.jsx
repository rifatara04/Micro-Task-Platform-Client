import { Navigate, useLocation } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import LoadingSpinner from "../components/shared/LoadingSpinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <div className="h-screen flex items-center justify-center"><LoadingSpinner /></div>;
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
