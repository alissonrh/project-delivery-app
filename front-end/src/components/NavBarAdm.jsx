import React, { useEffect, useState } from 'react';
import ExitBtn from './ExitBtn';

function NavBarAdm() {
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
      <nav
        className="grid grid-cols-3 h-full"
      >
        <p
          className="bg-[#2FC18C] flex items-center justify-center"
          data-testid="customer_products__element-navbar-link-orders"
        >
          GERENCIAR USUÁRIOS

        </p>
        <p
          className="flex items-center justify-center col-span-2 bg-[#421981] text-white"
          data-testid="customer_products__element-navbar-user-full-name"
        >
          {name}
        </p>
        <ExitBtn />
      </nav>
    </header>
  );
}

export default NavBarAdm;
