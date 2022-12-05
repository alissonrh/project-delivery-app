import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductsContext from '../context/ProductsContext';

function SalesCount() {
  const navigate = useNavigate();
  const { sales } = useContext(ProductsContext);
  const [soma, setSoma] = useState(0);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const somaTotal = sales
      .reduce((acc, e) => acc + (e.quantity * e.unitPrice), 0);
    setSoma(somaTotal);
  }, [soma, sales]);

  useEffect(() => {
    if (soma === 0) {
      return setDisabled(true);
    }
    return setDisabled(false);
  }, [soma]);

  return (
    <button
      style={ {
        position: 'fixed',
        bottom: '5%',
        right: '5%',
        zIndex: 999,
        fontSize: '36px',
      } }
      type="button"
      data-testid="customer_products__button-cart"
      onClick={ () => navigate('/customer/checkout') }
      disabled={ disabled }
    >
      Total: R$
      {' '}
      <span data-testid="customer_products__checkout-bottom-value">
        {soma.toFixed(2).replace('.', ',')}
      </span>
    </button>
  );
}

export default SalesCount;
