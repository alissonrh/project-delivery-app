import PropTypes from 'prop-types';

export default function OrderDetailsItem({ item, index, rote }) {
  const { quantity, price, name } = item;
  return (
    <>
      <p
        className="bg-[#2FC18C] rounded-l-md"
        data-testid={ `${rote}_order_details__element-order-table-item-number-${index}` }
      >
        {index + 1}

      </p>
      <p
        className="col-span-2 bg-slate-200"
        data-testid={ `${rote}_order_details__element-order-table-name-${index}` }
      >
        {name}

      </p>
      <p
        className="bg-[#036B52] text-white"
        data-testid={ `${rote}_order_details__element-order-table-quantity-${index}` }
      >
        {quantity}

      </p>
      <p
        className="bg-[#421981] text-white"
        data-testid={ `${rote}_order_details__element-order-table-unit-price-${index}` }
      >
        R$:
        {' '}
        {price.replace('.', ',')}
      </p>
      <p
        className="bg-[#056CF9] text-white rounded-r-md"
        data-testid={ `${rote}_order_details__element-order-table-sub-total-${index}` }
      >
        R$:
        {' '}
        {(Number(quantity) * Number(price)).toFixed(2).replace('.', ',')}
      </p>
    </>
  );
}

OrderDetailsItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  rote: PropTypes.string.isRequired,
};
