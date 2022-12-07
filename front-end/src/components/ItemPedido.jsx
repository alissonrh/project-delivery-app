import PropTypes from 'prop-types';

export default function ItemPedido({ item, index }) {
  const { quantity, unitPrice, name } = item;
  return (
    <div
      style={ {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '5px',
        marginLeft: '25%',
        marginRight: '25%',
      } }
      key={ index }
    >
      <p
        data-testid={ `customer_checkout__element-order-table-item-number-${index}` }
      >
        {index + 1}

      </p>
      <p
        data-testid={ `customer_checkout__element-order-table-name-${index}` }
      >
        {name}

      </p>
      <p
        data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
      >
        {quantity}

      </p>
      <p
        data-testid={ `customer_checkout__element-order-table-unit-price-${index}` }
      >
        R$:
        {' '}
        {unitPrice.replace('.', ',')}
      </p>
      <p
        data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }
      >
        R$:
        {' '}
        {(Number(quantity) * Number(unitPrice)).toFixed(2).replace('.', ',')}
      </p>
    </div>
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
