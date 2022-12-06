const pedidosId = {
  id: 1,
  userId: 3,
  sellerId: 2,
  totalPrice: '23.76',
  deliveryAddress: 'essa deu bom',
  deliveryNumber: '1000',
  saleDate: '2022-12-06T18:32:00.000Z',
  status: 'Pendente',
  products: [
    {
      id: 2,
      name: 'Heineken 600ml',
      price: '7.50',
      urlImage: 'http://localhost:3001/images/heineken_600ml.jpg',
      quantity: 2,
      subTotal: 15,
    },
    {
      id: 5,
      name: 'Skol 269ml',
      price: '2.19',
      urlImage: 'http://localhost:3001/images/skol_269ml.jpg',
      quantity: 4,
      subTotal: 8.76,
    },
  ],
  sellerName: 'Fulana Pereira',
};

export default pedidosId;
