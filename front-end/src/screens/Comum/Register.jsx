import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Post, setToken } from '../../api/requests';
import EmailInput from '../../components/EmailInput';
import NameInput from '../../components/NameInput';
import PasswordInput from '../../components/PasswordInput';
import LoginContext from '../../context/LoginContext';

function Register() {
  const { email, setEmail, password, setPassword } = useContext(LoginContext);
  const [name, setName] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const [failedTryLogin, setFailedTryLogin] = useState(false);

  const createUser = async (event) => {
    event.preventDefault();

    try {
      const { token } = await Post('/register', { email, password, name });

      setToken(token);

      localStorage.setItem('token', token);

      setIsLogged(true);
    } catch (error) {
      setFailedTryLogin(true);
      setIsLogged(false);
    }
  };

  useEffect(() => {
    if (email && password && name) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password, name]);

  if (isLogged) return <Navigate to="/customer/products" />;

  return (
    <>
      <NameInput
        setName={ setName }
        dataTestid="common_register__input-name"
      />
      <EmailInput
        setEmail={ setEmail }
        dataTestid="common_register__input-email"
      />
      <PasswordInput
        setPassword={ setPassword }
        dataTestid="common_register__input-password"
      />
      <button
        type="submit"
        onClick={ (event) => createUser(event) }
        disabled={ disabled }
        data-testid="common_register__button-register"
      >
        CADASTRAR
      </button>
      {
        (failedTryLogin)
          ? (
            <p data-testid="common_register__element-invalid_register">
              {
                `O endereço de e-mail já existe no banco de dados.
                    Por favor, tente novamente.`
              }
            </p>
          )
          : null
      }
    </>
  );
}

export default Register;