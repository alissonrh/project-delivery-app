import React from 'react';
import PropTypes from 'prop-types';

const MIN_SENHA = 6;

function PasswordInput({ setPassword, dataTestid }) {
  const handlePassword = (value) => {
    if (value.length >= MIN_SENHA) {
      setPassword(value);
    } else {
      setPassword(null);
    }
  };

  return (
    <label htmlFor="password">
      Senha
      <input
        data-testid={ dataTestid }
        type="password"
        id="password"
        placeholder="Min. 6 dígitos"
        onChange={ (e) => handlePassword(e.target.value) }
      />
    </label>
  );
}

export default PasswordInput;

PasswordInput.propTypes = {
  setPassword: PropTypes.func,
}.isRequired;
