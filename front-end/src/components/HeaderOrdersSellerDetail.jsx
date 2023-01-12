import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import StatusContext from '../context/StatusContext';
import getStatusColour from '../utils/getStatusColour';

function HeaderOrdersSellerDetail({ id, saleDate }) {
  const DEZ = 10;
  const TRANSITO = 'Em Trânsito';
  const { status, setStatus } = useContext(StatusContext);
  return (
    <header
      className="grid grid-cols-5 text-center items-center justify-center
     text-lg h-16 bg-slate-200"
    >
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
        {new Date(saleDate).toLocaleDateString('pt-BR').slice(0, DEZ)}

      </div>
      <div
        className={ `${getStatusColour(status)}
        rounded-md p-1.5` }
        data-testid="seller_order_details__element-order-details-label-delivery-status"
      >
        {status}
      </div>
      <button
        className={ `
       ${(status === 'Preparando' || status === TRANSITO
       || status === 'Entregue')
      ? 'opacity-40'
      : 'opacity-100'}
       my-3 mx-3 bg-[#036B52] text-white p-1.5 text-center rounded` }
        disabled={ status === 'Preparando' || status === TRANSITO
        || status === 'Entregue' }
        onClick={ () => setStatus('Preparando') }
        data-testid="seller_order_details__button-preparing-check"
        type="button"
      >
        PREPARAR PEDIDO
      </button>
      <button
        className={ `
      ${(status !== 'Preparando')
      ? 'opacity-40'
      : 'opacity-100'}
      my-3 mr-3 bg-[#036B52] text-white p-1.5 text-center rounded` }
        disabled={ (status !== 'Preparando') }
        onClick={ () => setStatus(TRANSITO) }
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
