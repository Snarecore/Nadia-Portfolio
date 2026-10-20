import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authService } from "../services/portfolioService";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  if (!authService.isAuthenticated()) {
    return <Navigate to="/page/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
