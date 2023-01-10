import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function OrderCard({ id, status, saleDate, totalPrice, rote }) {
  const DEZ = 10;
  const navigate = useNavigate();

  const getStatusColour = (orderStatus) => {
    let statusColour = '';
    switch (orderStatus) {
    case 'Entregue':
      statusColour = 'bg-[#036B52]';
      break;
    case 'Em Trânsito':
      statusColour = 'bg-[#0d99ff]';
      break;
    case 'Preparando':
      statusColour = 'bg-[#87d53c]';
      break;
    default:
      statusColour = 'bg-[#d3c63c]';
    }
    return statusColour;
  };

  return (
    <button
      style={ {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '5px',
      } }
      type="button"
      onClick={ () => navigate(`/${rote}/orders/${id}`) }
    >
      <article
        className="border-2 text-xl p-3 rounded shadow-2xl bg-slate-200"
        style={ {
          display: 'flex',
          justifyContent: 'space-between',
          margin: '5px',
          padding: '5px',
          width: '450px',
        } }
        key={ id }
      >
        <span
          className="bg-white rounded-md flex w-28 items-center justify-center"
          data-testid={ `${rote}_orders__element-order-id-${id}` }
        >
          {`Pedido ${id}`}
        </span>
        <div
          className={ `${getStatusColour(status)}
           rounded-md flex w-28 items-center justify-center` }
          data-testid={ `${rote}_orders__element-delivery-status-${id}` }
        >
          {status}
        </div>
        <div>
          <div
            className="rounded bg-white p-1 m-1"
            data-testid={ `${rote}_orders__element-order-date-${id}` }
          >
            {new Date(saleDate).toLocaleDateString('pt-BR').slice(0, DEZ)}
          </div>
          <span
            className="rounded bg-white p-1 m-1"
            data-testid={ `${rote}_orders__element-card-price-${id}` }
          >
            Total: R$
            {' '}
            {totalPrice.replace('.', ',')}
          </span>
        </div>

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
  rote: PropTypes.string,
}.isRequired;
