import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Post, setToken } from '../../api/requests';
import EmailInput from '../../components/EmailInput';
import LoginContext from '../../context/LoginContext';
import logo from '../../images/DELIVERY.png';

function Login() {
  const MIN_SENHA = 6;
  const { email, setEmail, password, setPassword } = useContext(LoginContext);
  const [failedTryLogin, setFailedTryLogin] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRedirect = ({ role }) => {
    if (role === 'customer') return navigate('/customer/products');
    if (role === 'seller') return navigate('/seller/orders');
    if (role === 'administrator') return navigate('/admin/manage');
  };

  const handleVisibiliteChange = () => setshowPassword(!showPassword);
  const handlePassword = (value) => setPassword(value);

  const doLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await Post('/login', { email, password });
      setToken(user.token);
      setPassword('');
      setEmail('');
      localStorage.setItem('user', JSON.stringify(user));
      handleRedirect(user);
    } catch (error) {
      setFailedTryLogin(true);
    }
  };

  const handelGoToRegister = () => {
    navigate('/register');
  };

  const validate = () => password.length >= MIN_SENHA && /\S+@\S+\.\S+/.test(email);
  console.log(validate());
  useEffect(() => {
    const isLogged = JSON.parse(localStorage.getItem('user'));
    if (isLogged) {
      handleRedirect(isLogged);
    }
  }, []);

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
        <img src={ logo } alt="logo" width="200" height="200" />
        <EmailInput
          setEmail={ setEmail }
          dataTestid="common_login__input-email"
        />
        <label
          className="block text-verde-escuro text-md font-bold w-full mb-2"
          htmlFor="password"
        >
          Senha
          <div className="relative w-full">
            <input
              className="shadow-md appearance-none border border-verde-escuro
              rounded w-full py-2 px-3
              text-gray-700 mt-1.5 mb-3 leading-tight
              focus:outline-none focus:shadow-outline
              focus:border-2 focus:border-verde-claro"
              id="password"
              type={ showPassword ? 'text' : 'password' }
              placeholder="******"
              name="password"
              value={ password }
              onChange={ (e) => handlePassword(e.target.value) }
            />
            <button
              type="button"
              className="absolute top-0 bottom-0 right-0 px-3 py-1 focus:outline-none"
              onClick={ handleVisibiliteChange }
            >
              {showPassword ? '🔓' : '🔒'}
            </button>
          </div>
        </label>
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
          onClick={ (event) => doLogin(event) }
          disabled={ !validate() }
          data-testid="common_login__button-login"
        >
          LOGIN
        </button>
        {
          (failedTryLogin)
            ? (
              <p
                className="box-content"
                data-testid="common_login__element-invalid-email"
              >
                {
                  `O endereço de e-mail ou a senha não estão corretos.
                    Por favor, tente novamente.`
                }
              </p>
            )
            : null
        }
        <button
          className="bg-white text-verde-escuro m-1
       font-bold py-2 px-4 rounded border border-verde-escuro
        focus:outline-none w-full focus:shadow-outline"
          type="button"
          data-testid="common_login__button-register"
          onClick={ handelGoToRegister }
        >
          Ainda Não Tenho conta
        </button>
      </form>
    </div>
  );
}

export default Login;
