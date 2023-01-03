import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Post, setToken } from '../../api/requests';
import EmailInput from '../../components/EmailInput';
import NameInput from '../../components/NameInput';
import PasswordInput from '../../components/PasswordInput';
import LoginContext from '../../context/LoginContext';

function Register() {
  const MIN_SENHA = 6;
  const MIN_NOME = 12;
  const { email, setEmail, password, setPassword } = useContext(LoginContext);
  const [name, setName] = useState('');
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

  const validate = () => name.length >= MIN_NOME && password.length >= MIN_SENHA && /\S+@\S+\.\S+/.test(email);

  return (
    <div
      className="flex h-screen
      justify-center items-center"
    >
      <form
        className="bg-white flex flex-col items-center gap-x-4
      shadow-2xl rounded-lg border
     border-verde-escuro px-8 pt-6 pb-8 mb-4"
      >
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
          className={
            `${validate()
              ? 'opacity-100'
              : 'opacity-40'}
              bg-verde-escuro text-white 
         font-bold py-2 px-4 rounded border m-1
          focus:outline-none w-full focus:shadow-outline`
          }
          type="submit"
          onClick={ (event) => createUser(event) }
          disabled={ !validate() }
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
      </form>

    </div>
  );
}

export default Register;
