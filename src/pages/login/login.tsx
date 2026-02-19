import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { loginUser } from '../../slices/user-slice';

export const Login: FC = () => {
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const localStorageEmail = localStorage.getItem('email') || '';
  const [email, setEmail] = useState(localStorageEmail);

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
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
