import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Post, setToken } from '../../api/requests';
import EmailInput from '../../components/EmailInput';
import PasswordInput from '../../components/PasswordInput';
import LoginContext from '../../context/LoginContext';

function Login() {
  const MIN_SENHA = 6;
  const { email, setEmail, password, setPassword } = useContext(LoginContext);
  const [disabled, setDisabled] = useState(true);
  const [failedTryLogin, setFailedTryLogin] = useState(false);
  const isLogged = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const doLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await Post('/login', { email, password });
      setToken(user.token);
      setPassword('');
      setEmail('');
      localStorage.setItem('user', JSON.stringify(user));
      if (user.role === 'customer') return navigate('/customer/products');
      if (user.role === 'seller') return navigate('/seller/orders');
      if (user.role === 'administrator') return navigate('/admin/manage');
    } catch (error) {
      setFailedTryLogin(true);
    }
  };

  const handelGoToRegister = () => {
    navigate('/register');
  };

  const validate = () => password.length >= MIN_SENHA && /\S+@\S+\.\S+/.test(email);

  useEffect(() => {
    if (validate()) {
      return setDisabled(false);
    } setDisabled(true);
  }, [email, password]);

  if (isLogged) {
    if (isLogged.role === 'customer') return <Navigate to="/customer/products" />;
    if (isLogged.role === 'seller') return <Navigate to="/seller/orders" />;
    if (isLogged.role === 'administrator') return <Navigate to="/admin/manage" />;
  }

  if (isLogged) { return <Navigate to="/customer/products" />; }

  return (
    <form>
      <EmailInput
        setEmail={ setEmail }
        dataTestid="common_login__input-email"
      />
      <PasswordInput
        setPassword={ setPassword }
        dataTestid="common_login__input-password"
      />
      <button
        type="submit"
        onClick={ (event) => doLogin(event) }
        disabled={ disabled }
        data-testid="common_login__button-login"
      >
        LOGIN
      </button>
      {
        (failedTryLogin)
          ? (
            <p data-testid="common_login__element-invalid-email">
              {
                `O endereço de e-mail ou a senha não estão corretos.
                    Por favor, tente novamente.`
              }
            </p>
          )
          : null
      }
      <button
        type="button"
        data-testid="common_login__button-register"
        onClick={ handelGoToRegister }
      >
        Ainda Não Tenho conta
      </button>
    </form>
  );
}

export default Login;
