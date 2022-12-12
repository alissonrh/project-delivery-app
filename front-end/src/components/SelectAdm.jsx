import { useContext } from 'react';
import LoginContext from '../context/LoginContext';

export default function SelectAdm() {
  const { setRole } = useContext(LoginContext);
  return (
    <select
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
  );
}
