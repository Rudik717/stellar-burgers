import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { isAuthSelector } from '../../slices/user-slice';

interface ProtectedRouteProps {
  isNotAuth?: boolean;
  children: React.ReactElement;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isNotAuth = false,
  children
}) => {
  const isAuthChecked = useSelector(isAuthSelector);
  const location = useLocation();

  const shouldRedirect =
    (!isNotAuth && !isAuthChecked) || (isNotAuth && isAuthChecked);

  if (shouldRedirect) {
    const redirectTo = isNotAuth ? location.state?.from || '/' : '/login';
    return <Navigate replace to={redirectTo} state={{ from: location }} />;
  }

  return children;
};
