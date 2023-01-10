import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExitBtn from './ExitBtn';

function NavBar() {
  const navigate = useNavigate();
  const [name, setName] = useState();

  useEffect(() => {
    const objLocalStorage = localStorage.getItem('user');
    const stringToObj = JSON.parse(objLocalStorage);
    setName(stringToObj.name);
  }, []);

  return (
    <header
      className="h-16"
    >
      <nav className="grid grid-cols-4 h-full">
        <button
          className="bg-[#2FC18C]"
          type="button"
          onClick={ () => navigate('/customer/products') }
          data-testid="customer_products__element-navbar-link-products"
        >
          PRODUTOS

        </button>
        <button
          className="bg-[#036B52] text-white"
          type="button"
          onClick={ () => navigate('/customer/orders') }
          data-testid="customer_products__element-navbar-link-orders"
        >
          MEUS PEDIDOS

        </button>
        <p
          className="flex items-center justify-center col-span-2 bg-[#421981] text-white"
        >
          {name}
        </p>
        <ExitBtn />
      </nav>
    </header>
  );
}

export default NavBar;
