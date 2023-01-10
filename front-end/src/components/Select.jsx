import PropTypes from 'prop-types';

export default function Select({ sellers, setSellerId }) {
  return (
    <select
      className="shadow-md border border-verde-escuro
              rounded w-full py-2 px-3
              text-gray-700 mt-1.5 mb-3 leading-tight
              focus:outline-none focus:shadow-outline
              focus:border focus:border-verde-claro"
      data-testid="customer_checkout__select-seller"
      onChange={ (e) => {
        setSellerId(e.target.value);
      } }
    >
      {sellers.map((seller, index) => (
        <option
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
