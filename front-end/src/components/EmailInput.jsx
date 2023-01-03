import React from 'react';
import PropTypes from 'prop-types';

function EmailInput({ setEmail, dataTestid, emailform }) {
  const handleEmail = (value) => {
    setEmail(value);
    /* if (/\S+@\S+\.\S+/.test(value)) {
      setEmail(value);
    } else {
      setEmail(undefined);
    } */
  };

  return (
    <label
      className="block text-verde-escuro text-sm font-bold mb-2"
      htmlFor="email"
    >
      Email
      <input
        className="shadow-md appearance-none border border-verde-escuro
           mt-1.5 rounded w-full py-2 px-3
      text-gray-700 leading-tight focus:outline-none focus:shadow-outline
       focus:border-2 focus:border-verde-claro"
        value={ emailform }
        data-testid={ dataTestid }
        type="email"
        id="email"
        placeholder="exemplo@exemplo.com"
        onChange={ (e) => handleEmail(e.target.value) }
      />
    </label>
  );
}

export default EmailInput;

EmailInput.propTypes = {
  setEmail: PropTypes.func,
}.isRequired;
