import PropTypes from 'prop-types';

export default function ItemPedido({ item, index }) {
  const { productId, quantity, unitPrice } = item;
  return (
    <div key={ index }>
      <p>{productId}</p>
      <p>{quantity}</p>
      <p>{unitPrice}</p>
    </div>
  );
}

ItemPedido.propTypes = {
  item: PropTypes.shape({
    productId: PropTypes.number,
    quantity: PropTypes.number,
    unitPrice: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
