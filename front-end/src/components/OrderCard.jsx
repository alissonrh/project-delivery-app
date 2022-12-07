import React from 'react';
import PropTypes from 'prop-types';

function OrderCard({ id, status, saleDate, totalPrice }) {
  return (
    <article
      style={ {
        display: 'flex',
        border: '2px',
      } }
      key={ id }
    >
      <span
        data-testid={ `customer_orders__element-order-id-${id}` }
      >
        {`Pedido ${id}`}
      </span>
      <div
        data-testid={ `customer_orders__element-delivery-status-${id}` }
      >
        {status}
      </div>
      <div
        data-testid={ `customer_orders__element-order-date-${id}` }
      >
        {saleDate}
      </div>
      <span
        data-testid={ `customer_orders__element-card-price-${id}` }
      >
        Total: R$
        {' '}
        {totalPrice.replace('.', ',')}
      </span>
    </article>
  );
}

export default OrderCard;

OrderCard.propTypes = {
  id: PropTypes.string,
  status: PropTypes.string,
  saleDate: PropTypes.string,
  totalPrice: PropTypes.string,
}.isRequired;
