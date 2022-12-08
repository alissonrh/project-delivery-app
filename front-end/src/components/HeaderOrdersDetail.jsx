import React from 'react';
import PropTypes from 'prop-types';

function HeaderOrdersDetail({ id, sellerName, saleDate, status }) {
  const DEZ = 10;
  return (
    <header>
      <div
        data-testid="customer_order_details__element-order-details-label-order-id"
      >
        Pedido Nº:
        {' '}
        {id}
      </div>
      <div
        data-testid="customer_order_details__element-order-details-label-seller-name"
      >
        {sellerName}
      </div>
      <div
        data-testid="customer_order_details__element-order-details-label-order-date"
      >
        {new Date(saleDate).toLocaleString().slice(0, DEZ)}

      </div>
      <div
        data-testid="customer_order_details__element-order-details-label-delivery-status"
      >
        {status}
      </div>
      <button
        disabled
        data-testid="customer_order_details__button-delivery-check"
        type="button"
      >
        MARCAR COMO ENTREGUE
      </button>
    </header>
  );
}

HeaderOrdersDetail.propTypes = {
  id: PropTypes.string,
  status: PropTypes.string,
  saleDate: PropTypes.string,
  sellerName: PropTypes.string,
}.isRequired;

export default HeaderOrdersDetail;
