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
    <header style={ { backgroundColor: 'yellow' } }>
      <nav>
        <p
          data-testid="customer_products__element-navbar-link-orders"
        >
          GERENCIAR USUÁRIOS

        </p>
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

export default NavBarAdm;
