const pedidosId = {
  id: 3,
  userId: 4,
  sellerId: 2,
  totalPrice: '37.70',
  deliveryAddress: 'essa deu bom',
  deliveryNumber: '1000',
  saleDate: '2022-12-07T14:53:58.000Z',
  status: 'Pendente',
  products: [
    {
      id: 5,
      name: 'Skol 269ml',
      price: '2.19',
      urlImage: 'http://localhost:3001/images/skol_269ml.jpg',
      quantity: 4,
      subTotal: 8.76,
    },
    {
      id: 6,
      name: 'Skol Beats Senses 313ml',
      price: '4.49',
      urlImage: 'http://localhost:3001/images/skol_beats_senses_313ml.jpg',
      quantity: 2,
      subTotal: 8.98,
    },
    {
      id: 7,
      name: 'Becks 330ml',
      price: '4.99',
      urlImage: 'http://localhost:3001/images/becks_330ml.jpg',
      quantity: 4,
      subTotal: 19.96,
    },
  ],
  sellerName: 'Fulana Pereira',
};

export default pedidosId;
