import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExitBtn from './ExitBtn';
/* import PropTypes from 'prop-types'; */

function NavBar() {
  const navigate = useNavigate();
  const [name, setName] = useState();

  useEffect(() => {
    const objLocalStorage = localStorage.getItem('user');
    const stringToObj = JSON.parse(objLocalStorage);
    setName(stringToObj.name);
  }, []);

  return (
    <header style={ { backgroundColor: 'blue' } }>
      <nav>
        <button
          type="button"
          onClick={ () => navigate('/customer/products') }
          data-testid="customer_products__element-navbar-link-products"
        >
          PRODUTOS

        </button>
        <button
          type="button"
          onClick={ () => navigate('/customer/orders') }
          data-testid="customer_products__element-navbar-link-orders"
        >
          MEUS PEDIDOS

        </button>
        <p
          data-testid="customer_products__element-navbar-user-full-name"
        >
          {name}
        </p>
        <ExitBtn />
      </nav>
    </header>
  );
}

export default NavBar;
