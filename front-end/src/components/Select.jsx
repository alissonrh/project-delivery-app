import PropTypes from 'prop-types';

export default function Select({ sellers, setSellerId }) {
  return (
    <select>
      {sellers.map((seller, index) => (
        <option
          onChange={ setSellerId(seller.id) }
          key={ index }
          value={ seller.id }
        >
          {seller.name}

        </option>
      ))}
    </select>
  );
}

Select.propTypes = {
  sellers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    role: PropTypes.string,
  }).isRequired),
}.isRequired;
