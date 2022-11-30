import React from 'react';
import PropTypes from 'prop-types';

const MIN_NOME = 12;

function NameInput({ setName, dataTestid }) {
  const handleName = (value) => {
    if (value.length >= MIN_NOME) {
      setName(value);
    } else {
      setName(null);
    }
  };

  return (
    <label htmlFor="name">
      Nome
      <input
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
