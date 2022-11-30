import React from 'react';
import PropTypes from 'prop-types';

function EmailInput({ setEmail, setValidEmail, dataTestid }) {
  const handleEmail = (value) => {
    if (/\S+@\S+\.\S+/.test(value)) {
      setValidEmail(true);
      setEmail(value);
    }
  };

  return (
    <label htmlFor="email">
      Email
      <input
        data-testid={ dataTestid }
        type="email"
        id="email"
        className="email"
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
