import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginContext from '../context/LoginContext';

function ExitBtn() {
  const { setIsLogged } = useContext(LoginContext);
  const navigate = useNavigate();
  const logoff = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('sale');
    setIsLogged(false);
    navigate('/login');
  };

  return (
    <button
      type="button"
      onClick={ logoff }
      data-testid="customer_products__element-navbar-link-logout"
    >
      SAIR
    </button>
  );
}

export default ExitBtn;
