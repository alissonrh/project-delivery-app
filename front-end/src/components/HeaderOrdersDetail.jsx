import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import StatusContext from '../context/StatusContext';

function HeaderOrdersDetail({ id, sellerName, saleDate }) {
  const DEZ = 10;
  const { status, setStatus } = useContext(StatusContext);
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
        {new Date(saleDate).toLocaleDateString('pt-BR').slice(0, DEZ)}

      </div>
      <div
        data-testid="customer_order_details__element-order-details-label-delivery-status"
      >
        {status}
      </div>
      <button
        disabled={ (status !== 'Em Trânsito') }
        onClick={ () => setStatus('Entregue') }
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
