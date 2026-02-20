import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { isAuthSelector } from '../../slices/user-slice';
import { Preloader } from '../ui/preloader/preloader';

interface ProtectedRouteProps {
  isNotAuth?: boolean;
  children: React.ReactElement;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isNotAuth = false,
  children
}) => {
  const { isAuth, isAuthChecked } = useSelector((state) => state.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  const shouldRedirect = (!isNotAuth && !isAuth) || (isNotAuth && isAuth);

  if (shouldRedirect) {
    return (
      <Navigate
        replace
        to={isNotAuth ? location.state?.from || '/' : '/login'}
        state={{ from: location }}
      />
    );
  }

  return children;
};
