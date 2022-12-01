import React from 'react';
import { useNavigate } from 'react-router-dom';
import ExitBtn from './ExitBtn';
/* import PropTypes from 'prop-types'; */

function NavBar() {
  const navigate = useNavigate();
  return (
    <header>
      <nav>
        <button
          type="button"
          onClick={ () => navigate('/teste') }
          data-testid="customer_products__element-navbar-link-products"
        >
          PRODUTOS

        </button>
        <button
          type="button"
          onClick={ () => navigate('/teste') }
          data-testid="customer_products__element-navbar-link-orders"
        >
          MEUS PEDIDOS

        </button>
        <p
          data-testid="customer_products__element-navbar-user-full-name"
        >
          NOME

        </p>
        <ExitBtn />
      </nav>
    </header>
  );
}

export default NavBar;
