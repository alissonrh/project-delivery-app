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
    <label htmlFor="name">
      Nome
      <input
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
