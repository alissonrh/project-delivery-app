export default function ItemPedido(item, index) {
  const { description, quantity, unitPrice, subTotal } = item;
  return (
    <>
      <p>{index + 1}</p>
      <p>{description}</p>
      <p>{quantity}</p>
      <p>{unitPrice}</p>
      <p>{subTotal}</p>
    </>
  );
}
