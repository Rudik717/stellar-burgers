import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  loginUser,
  getErrorMessage,
  clearError
} from '../../slices/user-slice';

export const Login: FC = () => {
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);
  const localStorageEmail = localStorage.getItem('email') || '';
  const [email, setEmail] = useState(localStorageEmail);
  const errorMessage = useSelector(getErrorMessage);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    localStorage.setItem('email', email);
    dispatch(
      loginUser({
        email: email,
        password: password
      })
    );
  };

  return (
    <LoginUI
      errorText={errorMessage || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
