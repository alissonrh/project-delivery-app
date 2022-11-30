import React from 'react';
import PropTypes from 'prop-types';

const MIN_NOME = 12;

function NameInput({ setName, setValidName, dataTestid }) {
  const handleName = (value) => {
    if (value.length >= MIN_NOME) {
      setValidName(true);
      setName(value);
    }
  };

  return (
    <label htmlFor="Name">
      Nome
      <input
        data-testid={ dataTestid }
        type="Name"
        id="Name"
        className="Name"
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
