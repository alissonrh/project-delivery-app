import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Post, setToken } from '../../api/requests';
import EmailInput from '../../components/EmailInput';
import NameInput from '../../components/NameInput';
import PasswordInput from '../../components/PasswordInput';
import LoginContext from '../../context/LoginContext';

function Register() {
  const { email, setEmail, password, setPassword } = useContext(LoginContext);
  const [name, setName] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [failedTryLogin, setFailedTryLogin] = useState(false);
  const navigate = useNavigate();

  const createUser = async (event) => {
    event.preventDefault();

    try {
      const user = await Post('/register', { email, password, name });

      setToken(user.token);

      localStorage.setItem('user', JSON.stringify(user));
      navigate('/customer/products');
    } catch (error) {
      setFailedTryLogin(true);
    }
  };

  useEffect(() => {
    if (email && password && name) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password, name]);

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
