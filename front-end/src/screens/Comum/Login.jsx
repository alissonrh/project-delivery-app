import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Post, setToken } from '../../api/requests';
import EmailInput from '../../components/EmailInput';
import PasswordInput from '../../components/PasswordInput';
import LoginContext from '../../context/LoginContext';

function Login() {
  const { email, setEmail, password, setPassword } = useContext(LoginContext);
  const [disabled, setDisabled] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const [failedTryLogin, setFailedTryLogin] = useState(false);
  const navigate = useNavigate();

  const doLogin = async (event) => {
    event.preventDefault();

    try {
      const { token } = await Post('/login', { email, password });

      setToken(token);

      localStorage.setItem('token', token);

      setIsLogged(true);
    } catch (error) {
      setFailedTryLogin(true);
      setIsLogged(false);
    }
  };

  const handelGoToRegister = () => {
    navigate('/register');
  };

  useEffect(() => {
    if (email && password) {
      return setDisabled(false);
    } setDisabled(true);
  }, [email, password]);

  if (isLogged) return <Navigate to="/customer/products" />;

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
