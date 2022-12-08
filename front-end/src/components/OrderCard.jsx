import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function OrderCard({ id, status, saleDate, totalPrice }) {
  const DEZ = 10;
  const navigate = useNavigate();
  return (
    <button
      style={ {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '5px',
      } }
      type="button"
      onClick={ () => navigate(`/customer/orders/${id}`) }
    >
      <article
        style={ {
          display: 'flex',
          justifyContent: 'space-between',
          margin: '5px',
          padding: '5px',
          width: '350px',
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
          {new Date(saleDate).toLocaleString().slice(0, DEZ)}
        </div>
        <span
          data-testid={ `customer_orders__element-card-price-${id}` }
        >
          Total: R$
          {' '}
          {totalPrice.replace('.', ',')}
        </span>
      </article>
    </button>

  );
}

export default OrderCard;

OrderCard.propTypes = {
  id: PropTypes.string,
  status: PropTypes.string,
  saleDate: PropTypes.string,
  totalPrice: PropTypes.string,
}.isRequired;
