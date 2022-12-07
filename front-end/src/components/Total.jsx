import PropTypes from 'prop-types';

export default function Total(props) {
  const { total } = props;
  return (
    <div>
      <p
        data-testid="customer_checkout__element-order-total-price"
      >
        Total:
        {' '}
        {total.toFixed(2).replace('.', ',')}
      </p>
    </div>
  );
}

Total.propTypes = {
  total: PropTypes.number,
}.isRequired;
