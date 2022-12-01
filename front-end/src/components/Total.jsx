import PropTypes from 'prop-types';

export default function Total(props) {
  const { total } = props;
  return (
    <div>
      <p>
        Total:
        {' '}
        {total}
      </p>
    </div>
  );
}

Total.propTypes = {
  total: PropTypes.number,
}.isRequired;
