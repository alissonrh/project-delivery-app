export default function ItemPedido(item, index) {
  const { description, quantity, unitValue, subTotal } = item;
  return (
    <>
      <p>{index + 1}</p>
      <p>{description}</p>
      <p>{quantity}</p>
      <p>{unitValue}</p>
      <p>{subTotal}</p>
    </>
  );
}
