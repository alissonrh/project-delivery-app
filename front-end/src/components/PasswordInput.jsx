import React from 'react';
import PropTypes from 'prop-types';

function PasswordInput({ setPassword, dataTestid, passwordform }) {
  const handlePassword = (value) => {
    setPassword(value);
    /*  if (value.length >= MIN_SENHA) {
      setPassword(value);
    } */ /* else {
      setPassword(undefined);
    } */
  };

  return (
    <label htmlFor="password">
      Senha
      <input
        value={ passwordform }
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
