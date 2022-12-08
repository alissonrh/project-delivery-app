import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import StatusContext from '../context/StatusContext';

function HeaderOrdersSellerDetail({ id, saleDate, statusDb }) {
  const DEZ = 10;
  const { status, setStatus } = useContext(StatusContext);
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
        {statusDb}
      </div>
      <button
        disabled={ status === 'Preparando' || status === 'Em Trânsito' }
        onClick={ () => setStatus('Preparando') }
        data-testid="seller_order_details__button-preparing-check"
        type="button"
      >
        PREPARAR PEDIDO
      </button>
      <button
        disabled={ (status !== 'Preparando') }
        onClick={ () => setStatus('Em Trânsito') }
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
