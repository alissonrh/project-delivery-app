import React from 'react';
import PropTypes from 'prop-types';

function NameInput({ setName, dataTestid, nameform }) {
  const handleName = (value) => {
    setName(value);
    /* if (value.length >= MIN_NOME) {
      setName(value);
    } else {
      setName(undefined);
    } */
  };

  return (
    <label
      className="block text-verde-escuro text-md font-bold w-full mb-2"
      htmlFor="name"
    >
      Nome
      <input
        className="shadow-md appearance-none border border-verde-escuro
        mt-1.5 rounded w-full py-2 px-3
   text-gray-700 leading-tight focus:outline-none focus:shadow-outline
    focus:border-2 focus:border-verde-claro"
        value={ nameform }
        data-testid={ dataTestid }
        type="text"
        id="name"
        placeholder="Min. 12 caracteres"
        onChange={ (e) => handleName(e.target.value) }
      />
    </label>
  );
}

export default NameInput;

NameInput.propTypes = {
  setName: PropTypes.func,
}.isRequired;
