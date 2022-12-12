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
    <label htmlFor="email">
      Email
      <input
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
