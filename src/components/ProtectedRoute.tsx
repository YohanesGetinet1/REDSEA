// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const location = useLocation();

  if (authLoading) {
    // You can render a global loading spinner here, or a minimal layout
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading authentication status...</p>
      </div>
    );
  }

  if (!user) {
    // User is not authenticated, redirect to login page
    // Pass the current location so we can redirect back after login
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // User is authenticated, render the children components
  return <>{children}</>;
};

export default ProtectedRoute;