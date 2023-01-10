import React from 'react';
import { useNavigate } from 'react-router-dom';

function ExitBtn() {
  const navigate = useNavigate();
  const logoff = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('sale');
    navigate('/login');
  };

  return (
    <button
      className="w-32 col-end-7 bg-[#056CF9] text-white"
      type="button"
      onClick={ logoff }
      data-testid="customer_products__element-navbar-link-logout"
    >
      SAIR
    </button>
  );
}

export default ExitBtn;
