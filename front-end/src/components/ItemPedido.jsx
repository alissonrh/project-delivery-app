import PropTypes from 'prop-types';

export default function ItemPedido({ item, index }) {
  const { quantity, unitPrice, name } = item;
  return (
    <>
      <p
        className="bg-[#2FC18C] rounded-l-md"
        key={ index }
        data-testid={ `customer_checkout__element-order-table-item-number-${index}` }
      >
        {index + 1}

      </p>
      <p
        className="col-span-2 bg-slate-200"
        data-testid={ `customer_checkout__element-order-table-name-${index}` }
      >
        {name}

      </p>
      <p
        className="bg-[#036B52] text-white"
        data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
      >
        {quantity}

      </p>
      <p
        className="bg-[#421981] text-white"
        data-testid={ `customer_checkout__element-order-table-unit-price-${index}` }
      >
        R$:
        {' '}
        {unitPrice.replace('.', ',')}
      </p>
      <p
        className="bg-[#056CF9] text-white"
        data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }
      >
        R$:
        {' '}
        {(Number(quantity) * Number(unitPrice)).toFixed(2).replace('.', ',')}
      </p>
    </>
  );
}

ItemPedido.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    productId: PropTypes.number,
    quantity: PropTypes.number,
    unitPrice: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
