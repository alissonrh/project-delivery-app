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
    <label
      className="block text-verde-escuro text-md font-bold w-full mb-2"
      htmlFor="password"
    >
      Senha
      <input
        className="shadow-md appearance-none border border-verde-escuro
        mt-1.5 rounded w-full py-2 px-3
   text-gray-700 leading-tight focus:outline-none focus:shadow-outline
    focus:border focus:border-verde-claro"
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
