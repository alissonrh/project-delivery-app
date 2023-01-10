import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import StatusContext from '../context/StatusContext';

function HeaderOrdersDetail({ id, sellerName, saleDate }) {
  const DEZ = 10;
  const { status, setStatus } = useContext(StatusContext);
  return (
    <header
      className="grid grid-cols-6 text-center items-center justify-center
     text-lg h-16 bg-slate-200"
    >
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
        className="bg-[#2FC18C] rounded-md p-1.5"
        data-testid="customer_order_details__element-order-details-label-delivery-status"
      >
        {status}
      </div>
      <button
        className={ `
        ${(status !== 'Em Trânsito')
      ? 'opacity-40'
      : 'opacity-100'}
        my-3 mx-3 col-span-2 bg-[#036B52] text-white p-1.5 text-center rounded` }
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
