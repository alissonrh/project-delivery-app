import React from 'react';
import PropTypes from 'prop-types';

function User({ user, index, handleDelete }) {
  const { id, name, email, role } = user;
  return (
    <>
      <p
        className="bg-[#2FC18C] rounded-l-md"
        data-testid={ `admin_manage__element-user-table-item-number-${index}` }
      >
        {index + 1}

      </p>
      <p
        className="bg-slate-200 col-span-2"
        data-testid={ `admin_manage__element-user-table-name-${index}` }
      >
        {name}

      </p>
      <p
        className="bg-[#036B52] col-span-2 text-white"
        data-testid={ `admin_manage__element-user-table-email-${index}` }
      >
        {email}

      </p>
      <p
        className="bg-[#421981] text-white"
        data-testid={ `admin_manage__element-user-table-role-${index}` }
      >
        {role === 'customer' ? 'Cliente' : 'Vendedor'}

      </p>
      <button
        className="bg-[#056CF9] text-white rounded-r-md"
        data-testid={ `admin_manage__element-user-table-remove-${index}` }
        type="button"
        onClick={ () => handleDelete(id) }
      >
        Excluir
      </button>
    </>
  );
}
User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    email: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default User;
