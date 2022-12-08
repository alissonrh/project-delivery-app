import PropTypes from 'prop-types';

export default function OrderDetailsItem({ item, index }) {
  const { quantity, price, name } = item;
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
        data-testid={ `customer_order_details__element-order-table-item-number-${index}` }
      >
        {index + 1}

      </p>
      <p
        data-testid={ `customer_order_details__element-order-table-name-${index}` }
      >
        {name}

      </p>
      <p
        data-testid={ `customer_order_details__element-order-table-quantity-${index}` }
      >
        {quantity}

      </p>
      <p
        data-testid={ `customer_order_details__element-order-table-unit-price-${index}` }
      >
        R$:
        {' '}
        {price.replace('.', ',')}
      </p>
      <p
        data-testid={ `customer_order_details__element-order-table-sub-total-${index}` }
      >
        R$:
        {' '}
        {(Number(quantity) * Number(price)).toFixed(2).replace('.', ',')}
      </p>
    </div>
  );
}

OrderDetailsItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
