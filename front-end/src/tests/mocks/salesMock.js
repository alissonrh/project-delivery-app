export const saleByIdMock = {
  id: 1,
  userId: 3,
  sellerId: 2,
  totalPrice: '23.76',
  deliveryAddress: 'any_address',
  deliveryNumber: 1000,
  saleDate: '2022-12-15T00:01:41.000Z',
  status: 'Pendente',
  products: [
    {
      id: 2,
      name: 'Heineken 600ml',
      price: '7.50',
      urlImage: '',
      quantity: 2,
      subTotal: 15,
    },
    {
      id: 5,
      name: 'Skol 269ml',
      price: '2.19',
      urlImage: '',
      quantity: 4,
      subTotal: '8.76',
    },
  ],
  sellerName: 'Fulana Pereira',
};

export const salesBySellerIdMock = [
  {
    id: 1,
    userId: 3,
    sellerId: 2,
    totalPrice: '23.76',
    deliveryAddress: 'any_address',
    deliveryNumber: 1000,
    saleDate: '2022-12-15T00:01:41.000Z',
    status: 'Pendente',
  },
];

export const localStorageSaleMock = [
  {
    productId: 1,
    name: 'any_product1',
    quantity: 2,
    unitPrice: '7.50',
    urlImage: '',
  },
];
