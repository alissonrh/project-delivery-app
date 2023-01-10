import PropTypes from 'prop-types';

export default function Total(props) {
  const { total } = props;
  return (
    <div className="flex flex-row-reverse">
      <div
        className="text-3xl my-3 bg-[#036B52] text-white p-1.5 text-center rounded"
        data-testid="customer_checkout__element-order-total-price"
      >
        Total R$:
        {' '}
        {total.toFixed(2).replace('.', ',')}
      </div>
    </div>
  );
}

Total.propTypes = {
  total: PropTypes.number,
}.isRequired;
