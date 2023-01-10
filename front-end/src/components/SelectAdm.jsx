import { useContext } from 'react';
import LoginContext from '../context/LoginContext';

export default function SelectAdm() {
  const { setRole } = useContext(LoginContext);
  return (
    <div
      className="block text-verde-escuro text-md font-bold w-full mb-2"
    >
      Tipo
      <select
        className="shadow-md border border-verde-escuro
      mt-1.5 rounded w-full py-2 px-3
 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
  focus:border focus:border-verde-claro"
        data-testid="admin_manage__select-role"
        onChange={ (e) => { setRole(e.target.value); } }
      >
        <option
          value="customer"
        >
          Cliente
        </option>
        <option
          value="seller"
        >
          Vendedor
        </option>
      </select>
    </div>

  );
}
