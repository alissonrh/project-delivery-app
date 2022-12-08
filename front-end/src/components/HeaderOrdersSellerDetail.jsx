import React from 'react';
import PropTypes from 'prop-types';

function HeaderOrdersSellerDetail({ id, saleDate, status }) {
  const DEZ = 10;
  return (
    <header>
      <div
        data-testid="seller_order_details__element-order-details-label-order-id"
      >
        Pedido Nº:
        {' '}
        {id}
      </div>
      <div
        data-testid="seller_order_details__element-order-details-label-order-date"
      >
        {new Date(saleDate).toLocaleString().slice(0, DEZ)}

      </div>
      <div
        data-testid="seller_order_details__element-order-details-label-delivery-status"
      >
        {status}
      </div>
      <button
        data-testid="seller_order_details__button-preparing-check"
        type="button"
      >
        PREPARAR PEDIDO
      </button>
      <button
        disabled
        data-testid="seller_order_details__button-dispatch-check"
        type="button"
      >
        SAIU PARA ENTREGA
      </button>
    </header>
  );
}

HeaderOrdersSellerDetail.propTypes = {
  id: PropTypes.string,
  status: PropTypes.string,
  saleDate: PropTypes.string,
  sellerName: PropTypes.string,
}.isRequired;

export default HeaderOrdersSellerDetail;
