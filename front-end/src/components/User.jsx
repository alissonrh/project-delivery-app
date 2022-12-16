import React from 'react';
import PropTypes from 'prop-types';

function User({ user, index, handleDelete }) {
  const { id, name, email, role } = user;
  return (
    <div
      style={ {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '5px',
        marginLeft: '25%',
        marginRight: '25%',
      } }
      key={ index }
    >
      <p
        data-testid={ `admin_manage__element-user-table-item-number-${index}` }
      >
        {index + 1}

      </p>
      <p
        data-testid={ `admin_manage__element-user-table-name-${index}` }
      >
        {name}

      </p>
      <p
        data-testid={ `admin_manage__element-user-table-email-${index}` }
      >
        {email}

      </p>
      <p
        data-testid={ `admin_manage__element-user-table-role-${index}` }
      >
        {role === 'customer' ? 'Cliente' : 'Vendedor'}

      </p>
      <button
        data-testid={ `admin_manage__element-user-table-remove-${index}` }
        type="button"
        onClick={ () => handleDelete(id) }
      >
        Excluir
      </button>
    </div>
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
